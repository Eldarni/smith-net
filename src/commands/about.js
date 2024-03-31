class About {

    //
    name  = `about`;
    help  = `Display information about the site owner`;
    usage = `about`;

    //
    execute(terminal) {
        terminal.echo('Hi, my name is \e[94mRichard Smith\e[0m and I am a \e[94mWeb Application Developer\e[0m based in Northwest England.');
        terminal.echo('When I am not coding (at work or at home) I enjoy playing video games, board games and reading.');
        terminal.echo('Some of my favourite games are Rocket League (currently a Gold 2 scrub), Pokemon GO, Subnautica, Rimworld and Minecraft.');
        terminal.echo('I tend to read Science fiction and fantasy. Some of my favourite book series are To Sleep in a Sea of Stars, The Mistborn Trilogy and Lord of the Rings.');
    }

};

export default (new About());