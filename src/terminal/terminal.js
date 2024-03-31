
//
import css from './terminal.css?inline'

//
import format from './format';

//
class Terminal {

    //prepare for some references to the dom
    dom = {
        'container' : null,
        'output'    : null,
        'command'   : null,
        'input'     : null,
        'prompt'    : null,
    };

    //
    promptActive   = false;
    promptCallback = () => {};

    //store all the commands that have been added
    commands = {};

    //store the command history
    history = [];
    historyCursor = 0;

    /**
     * Initializes a new terminal
     * @param {object} options - The options for initializing the terminal.
     * @param {string} options.motd - The message of the day. Defaults to 'Hello World!'.
     * @param {string} options.prompt - The prompt for the shell. Defaults to '~'.
     * @param {string} options.separator - The separator for the shell. Defaults to ' '.
     */
    constructor({ motd = 'Hello World!', prompt = '~', separator = ' ' }) {

        //
        this.history = window.localStorage['terminal-history'] ? JSON.parse(window.localStorage['terminal-history']) : [];
        this.historyCursor = this.history.length;

        //
        this.motd = motd;

        //
        this.shell = { prompt, separator };

    }

    /**
     * Add a command to the terminal
     * @param {object} command
     * @returns {void}
     */
    addCommand = (command) => {
        if (this.commands.hasOwnProperty(command.name)) {
            throw Error(`Command ${command.name} already exists.`);
        }
        this.commands[command.name] = command;
    }

    /**
     * Attach the terminal to a element defined by the selector
     * @param {string} selector
     * @returns {void}
     */
    attach = (selector) => {

        //
        const element = document.querySelector(selector);

        //
        if (element == null) {
            throw Error(`Your target element of "${selector}" does not exist.`);
        }

        //prepare the css so it can be injected into the shadow dom
        const terminalStyleSheet = new CSSStyleSheet();
        terminalStyleSheet.replaceSync(css);

        //prepare the shadow dom
        const shadowRoot = element.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="container">
                <output class="output"></output>
                <div class="command">
                    <div class="prompt">${this.shell.prompt}${this.shell.separator}</div>
                    <input class="input" spellcheck="false" autofocus />
                </div>
            </div>
        `

        //inject the css into the shadow dom
        shadowRoot.adoptedStyleSheets = [terminalStyleSheet];

        //
        const container = shadowRoot.querySelector('.container');

        //track some elements in the dom (for easy access)
        this.dom.container = container,
        this.dom.output    = container.querySelector('.output');
        this.dom.command   = container.querySelector('.command');
        this.dom.input     = container.querySelector('.command .input');
        this.dom.prompt    = container.querySelector('.command .prompt');

        //
        window.addEventListener('click', () => this.dom.input.focus(), false);

        //
        this.dom.output.addEventListener('click', event => event.stopPropagation(), false);

        //
        this.dom.input.addEventListener('keydown', (event) => {

            //clear the input
            if (event.key === 'Escape') {
                this.dom.input.value = '';
            }

            //handle history navigation
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {

                //
                event.key === 'ArrowUp' && this.historyCursor > 0 && this.historyCursor--;
                event.key === 'ArrowDown' && this.historyCursor < this.history.length && this.historyCursor++;

                //
                if (this.history[this.historyCursor]) {
                    this.dom.input.value = this.history[this.historyCursor];
                    setTimeout(() => { this.dom.input.selectionStart = this.dom.input.selectionEnd = 10000; }, 0);
                } else {
                    this.dom.input.value = '';
                }

                //
                return;

            }

            //handle enter key while prompt is not active (e.g. running a command)
            if (event.key === 'Enter' && this.promptActive === false) {
                const [command, ...parameters] = this.dom.input.value.trim().split(' ');
                this.runCommand(command, parameters);
                return;
            }

            //handle enter key while prompt is active
            if (event.key === 'Enter' && this.promptActive === true) {
                this.resolvePrompt(this.dom.input.value.trim());
                return;
            }

        });

        //send the motd
        if (this.motd) {
            this.echo(this.motd);
        }

        //
        this.dom.output.focus();

    }

    /**
     * Updates the command history
     * @param {string} command
     * @param {array} parameters
     * @returns {void}
     */
    updateHistory = (command, parameters) => {

        //
        this.history.push(`${command} ${parameters.join(' ')}`);

        //
        window.localStorage['terminal-history'] = JSON.stringify(this.history);

        //
        this.historyCursor = this.history.length;

    }

    /**
     * Runs a command
     * @param {string} command
     * @param {array} parameters
     * @returns {void}
     */
    runCommand = async (command, parameters) => {

        //clone command as a new output line (and remove the input element)
        const previousCommand = this.dom.command.cloneNode(true);
        previousCommand.querySelector('input').replaceWith(`${command} ${parameters.join(' ')}`);
        this.dom.output.appendChild(previousCommand);

        //save command line in history
        if (command !== '') {
            this.updateHistory(command, parameters);
        }

        //if the command doesn't exist, do nothing
        if (Object.keys(this.commands).includes(command)) {
            await this.commands[command].execute(this, parameters)
        } else {
            if (command !== '') {
                this.echo(`Unknown command: ${command}`);
            }
        }

    }

    /**
     * Prints the message to the output
     * @param {*} html
     */
    echo(message) {
        this.dom.output.insertAdjacentHTML('beforeEnd', `<span>${format(message)}</span>`);
        this.resetCommand();
    }

    /**
     * Clears the output element and resets the command.
     * @return {void}
     */
    clear() {
        this.dom.output.innerHTML = '';
        this.resetCommand();
    }

    /**
     * Clears the command history from local storage and resets the terminal history.
     * @returns {void}
     */
    wipe() {

        //clear local storage
        window.localStorage.removeItem('terminal-history');

        //reset the history
        this.history = [];
        this.historyCursor = 0;

    }

    /**
     * Enables the prompt - ask for input and execute a callback.
     * @param {string} prompt
     * @param {function} callback
     * @returns {void}
     */
    prompt(prompt, callback = () => {}) {

        //enable the prompt
        this.promptActive = true;

        //store the callback for when the prompt is fulfilled
        this.promptCallback = callback;

        //update the prompt and clear the input
        this.dom.prompt.innerHTML = `${prompt}:`;
        this.dom.input.value = '';

        //change the styling of the prompt
        this.dom.command.classList.add('input');

    }

    /**
     * Resolves the prompt
     * @param {string} response
     * @returns {void}
     */
    resolvePrompt(response) {

        //
        this.promptActive = false;

        //return the response back to the command, and reset the terminal prompt
        this.promptCallback(response);
        this.resetCommand();

    }

    /**
     * Resets the command and prompt back to their default state
     * @returns {void}
     */
    resetCommand = () => {

        //reset the prompt
        this.dom.prompt.innerHTML = `${this.shell.prompt}${this.shell.separator}`;

        //clear the input
        this.dom.input.value = '';

        //reset the styling of the prompt back to default
        this.dom.command.classList.remove('input');

        //scroll the input into view
        if (this.dom.input.scrollIntoView) {
            this.dom.input.scrollIntoView();
        }

    }

    /**
     * Updates the prompt
     * @param {string} prompt
     * @param {string} separator
     * @returns {void}
     */
    setPrompt(prompt, separator = ' ') {
        this.shell = { prompt, separator };
        this.dom.prompt.innerHTML = `${prompt}${separator}`;
    }

}

//
export default Terminal;
