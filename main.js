
//
import VanillaTerminal from './src/terminal/terminal.js';

//
import './reset.css';
import './style.css';

//
import about from './src/commands/about.js';
import blog from './src/commands/blog.js';
import clear from './src/commands/clear.js';
import help from './src/commands/help.js';
import morse from './src/commands/morse.js';
import projects from './src/commands/projects.js';
import roll from './src/commands/roll.js';
import time from './src/commands/time.js';
import uptime from './src/commands/uptime.js';
import wipe from './src/commands/wipe.js';

//
const terminal = new VanillaTerminal({
    motd: `Welcome to smith-net (v0.37.%%BUILDDATE%%) - Local time is \e[94;1;4m${(new Date()).toString()}\e[0m`,
    prompt: 'guest@smith-net.org.uk ~',
});

//
terminal.attach('#terminal');

//
terminal.addCommand(about);
terminal.addCommand(blog);
terminal.addCommand(clear);
terminal.addCommand(help);
terminal.addCommand(morse);
terminal.addCommand(projects);
terminal.addCommand(roll);
terminal.addCommand(time);
terminal.addCommand(uptime);
terminal.addCommand(wipe);

//enable cheat mode
let lastKeyPresses = [];
window.addEventListener('keyup', (event) => {
    lastKeyPresses = [ ...lastKeyPresses.slice(-9), event.key ];
    if (JSON.stringify(lastKeyPresses) == '["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"]') {
        terminal.echo('\e[91;1m==== Cheat mode enabled! ====\e[0m');
        terminal.resetCommand();
    }
});
