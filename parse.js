const fs = require("mz/fs");
const nearley = require("nearley");
const grammar = require("./jsonr");
const util = require("util");

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("Please provide a file name.");
        return;
    }
    console.log("Reading file " + filename);
    const contents = (await fs.readFile(filename)).toString();
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(contents);
    if (parser.results.length > 1) {
        console.error("Parse tree is ambigous!");
        process.exit(1);
    }
    const result = parser.results[0];
    console.log(util.inspect(result, { depth: 10 }));
    console.log(result.martin.friend === result.anton);
}

main().catch((e) => console.log(e.stack));
