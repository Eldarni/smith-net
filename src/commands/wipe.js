class Wipe {

    //
    name  = `wipe`;
    help  = `Clears the terminal history`;
    usage = `wipe`;

    //
    execute(terminal) {
        terminal.prompt('Are you sure clear the terminal history? y/N', (value) => {
            if (value.trim().toUpperCase() === 'Y') {
                terminal.wipe();
                terminal.echo('History of commands wiped.');
            }
        });
    }

};

export default (new Wipe());