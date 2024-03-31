class Clear {

    //
    name  = `clear`;
    help  = `Clears the terminal screen`;
    usage = `clear`;

    //
    execute(terminal) {
        terminal.clear();
    }

};

export default (new Clear());