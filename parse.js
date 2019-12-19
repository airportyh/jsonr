const nearley = require("nearley");
const grammar = require("./jsonr");

exports.parse = parse;
function parse(jsonr) {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(jsonr);
    if (parser.results.length > 1) {
        const error = new Error("Parse tree is ambigous! See error.parser.results for more details.");
        error.parser = parser;
        throw error;
    }
    return parser.results[0];
}
