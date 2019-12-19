const fs = require("mz/fs");
const nearley = require("nearley");
const grammar = require("./jsonr");
const util = require("util");
const { parse } = require("./parse");

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("Please provide a file name.");
        return;
    }
    console.log("Reading file " + filename);
    const contents = (await fs.readFile(filename)).toString();
    const result = parse(contents);
    console.log(util.inspect(result, { depth: 10 }));
}

main().catch((e) => console.log(e.stack));
