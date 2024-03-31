class Uptime {

    //
    name  = `uptime`;
    help  = `Get the current uptime`;
    usage = `uptime`;

    //
    execute(terminal) {
        const diff = new Date((new Date()).getTime() - (new Date(1986, 0, 20, 16, 50, 0)).getTime());
        terminal.echo(`Current Uptime: ${(diff.getUTCFullYear() - 1970)} years, ${diff.getUTCMonth()} months, ${(diff.getUTCDate() - 1)} days, ${diff.getHours()} hours and ${diff.getMinutes()} minutes.`);
    }

};

export default (new Uptime());