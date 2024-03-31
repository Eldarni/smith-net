
//
import StringReplace from 'vite-plugin-string-replace'

//
const buildDate = new Date();

//
export default {
    plugins: [
        StringReplace([{
            search: '%%BUILDDATE%%',
            replace: `${buildDate.getUTCFullYear()}${String(buildDate.getUTCMonth()+1).padStart(2, '0')}${String(buildDate.getUTCDate()).padStart(2, '0')}`
        }])
    ]
}
