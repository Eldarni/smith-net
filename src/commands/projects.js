class Projects {

    //
    name  = `projects`;
    help  = `Display information about the site owner's projects`;
    usage = `projects`;

    //
    execute(terminal) {
        terminal.echo('Some of my public projects are:');
        terminal.echo('\e[94;1mDexxie\e[0m - <a href="https://dexxie.app">https://dexxie.app</a> - This is a work in progress "pokedex" app - This will allow people to track which pokemon they have caught and other stats such as perfect stats or shiny status etc, the idea is that what you track is all fully customisable.');
        terminal.echo('\e[94;1meldarni.me\e[0m - <a href="https://eldarni.me">https://eldarni.me</a> - This is my personal blog, this is built using Eleventy.');
        terminal.echo('\e[94;1msmith-net.org.uk\e[0m - <a href="https://smith-net.org.uk">https://smith-net.org.uk</a> - This is a simple landing page for my website, this is written in javascript and has a simple terminal emulator - your here right now.');
        terminal.echo('\e[94;1mdefenestration.org.uk\e[0m - <a href="https://defenestration.org.uk">https://defenestration.org.uk</a> - This is a playful site dedicated to my favourite word.');
        terminal.echo('Other projects I have worked on can be found on my GitHub: <a href="https://github.com/eldarni">https://github.com/eldarni</a>.');
    }

};

export default (new Projects());