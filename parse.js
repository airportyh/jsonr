const fs = require("mz/fs");
const nearley = require("nearley");
const grammar = require("./jsonr");

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
    console.log(parser.results[0]);
}

main().catch((e) => console.log(e.stack));
