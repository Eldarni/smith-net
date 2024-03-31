class Roll {

    //
    name  = `roll`;
    help  = `Rolls one or more dice, uses standard dice notation - e.g. 3d6`;
    usage = `roll <d1> [d2] ... [dn]`;

    //
    execute(terminal, parameters) {
        parameters.forEach(roll => {
            const match = roll.match(/(\d+)d(\d+)/);
            let total = 0;
            for (var i = 0; i < parseInt(match[1], 10); i++) {
                total += Math.floor(Math.random() * parseInt(match[2], 10)) + 1;
            }
            terminal.echo(`I rolled \e[94m${match[0]}\e[0m and got: \e[94m${total}\e[0m`);
        });
    }

};

export default (new Roll());