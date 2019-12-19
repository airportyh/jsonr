const { stringify } = require("./stringify");
const { parse } = require("./parse");
const fs = require("mz/fs");

async function main() {
    const content = (await fs.readFile("family.json")).toString();
    const result = parse(content);
    console.log(result.emma.name);
    const output = stringify(result, "  ");

    // console.log(output);
}

main().catch((e) => console.log(e.message));
