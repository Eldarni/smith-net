class Blog {

    //
    name  = `blog`;
    help  = `Display information about the site owner's blog`;
    usage = `blog`;

    //
    execute(terminal) {
        terminal.echo('I have a blog that has (at time of this writing) not been updated in a while, but can be accessed at <a href="https://eldarni.me">https://eldarni.me</a>.');
    }

};

export default (new Blog());