
//stores the current styling state of the output as this will be persisted over calls to print
const style = { 'weight' : null, 'italic' : null, 'underline' : null, 'colour' : null, 'background' : null };

//setup the flags used for styling
const SGRFlags = {

    //global reset
    '0' : () => {
        style.weight     = null;
        style.italic     = null;
        style.underline  = null;
        style.colour     = null;
        style.background = null;
    },

    //resets
    '22'  : () => style.weight     = null,
    '23'  : () => style.italic     = null,
    '24'  : () => style.underline  = null,
    '39'  : () => style.colour     = null,
    '49'  : () => style.background = null,

    //text effects
    '1'   : () => style.weight     = 'bold',
    '2'   : () => style.weight     = 'light',
    '3'   : () => style.italic     = 'italic',
    '4'   : () => style.underline  = 'underline',

    //text colours
    '30'  : () => style.colour     = 'black',
    '31'  : () => style.colour     = 'red',
    '32'  : () => style.colour     = 'green',
    '33'  : () => style.colour     = 'yellow',
    '34'  : () => style.colour     = 'blue',
    '35'  : () => style.colour     = 'magenta',
    '36'  : () => style.colour     = 'cyan',
    '37'  : () => style.colour     = 'white',
    '90'  : () => style.colour     = 'bright-black',
    '91'  : () => style.colour     = 'bright-red',
    '92'  : () => style.colour     = 'bright-green',
    '93'  : () => style.colour     = 'bright-yellow',
    '94'  : () => style.colour     = 'bright-blue',
    '95'  : () => style.colour     = 'bright-magenta',
    '96'  : () => style.colour     = 'bright-cyan',
    '97'  : () => style.colour     = 'bright-white',

    //background colours
    '40'  : () => style.background = 'black',
    '41'  : () => style.background = 'red',
    '42'  : () => style.background = 'green',
    '43'  : () => style.background = 'yellow',
    '44'  : () => style.background = 'blue',
    '45'  : () => style.background = 'magenta',
    '46'  : () => style.background = 'cyan',
    '47'  : () => style.background = 'white',
    '100' : () => style.background = 'bright-black',
    '101' : () => style.background = 'bright-red',
    '102' : () => style.background = 'bright-green',
    '103' : () => style.background = 'bright-yellow',
    '104' : () => style.background = 'bright-blue',
    '105' : () => style.background = 'bright-magenta',
    '106' : () => style.background = 'bright-cyan',
    '107' : () => style.background = 'bright-white',

};

//
const format = (message) => {

    //
    const createSpanTag = () => {
        return `<span${Object.entries(style).reduce((props, [property, value]) => {
            return ((value === null) ? props : `${props} data-style-${property}="${value}"`);
        }, '') || ''}>`;
    }

    //
    message = createSpanTag() + message + '</span>';

    //parse any flags set up in the message
    return message.replace(/\e\[(\d+)(?:;(\d+))*m/g, (match) => {

        //extract the flags
        const flags = match.match(/\e\[(\d+)(?:;(\d+))*m/).slice(1);

        //apply the flags
        flags.forEach(flag => {
            if (SGRFlags.hasOwnProperty(flag)) {
                SGRFlags[flag].call(this);
            }
        });

        //apply the style
        return `</span>${createSpanTag()}`;

    });

}

//
export default format;
