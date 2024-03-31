class Help {

    //
    name  = `help`;
    help  = `List all available commands, or get help on a specific command.`;
    usage = `help [command]`;

    //
    execute(terminal, [command]) {
        if (command !== undefined && terminal.commands.hasOwnProperty(command)) {
            terminal.echo(`Usage: ${terminal.commands[command].usage}`);
            terminal.echo(`help: ${terminal.commands[command].help || `no help topics match <u>${command}</u>`}`);
        } else {
            terminal.echo(`Provides help on all the currently defined <u>commands</u>.`);
            terminal.echo(`Type <u>help</u> for see the list or type <u>help [name]</u> to find out more about the specific <u>command</u>.`);
            terminal.echo(Object.keys(terminal.commands).join(', '));
        }
    }

};

export default (new Help());