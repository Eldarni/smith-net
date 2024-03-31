class Time {

    //
    name  = `time`;
    help  = `Display the current time`;
    usage = `time`;

    //
    execute(terminal) {
        terminal.echo(`The current time is ${(new Date()).toString()}`);
    }

};

export default (new Time());