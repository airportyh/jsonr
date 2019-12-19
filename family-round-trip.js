const { stringify, parse } = require("./jsonr");
const fs = require("mz/fs");

async function main() {
    const toby = {
        name: "Toby"
    };

    const marty = {
        name: "Marty"
    };

    const linus = {
        name: "Linus"
    };

    const weilai = {
        name: "Weilai"
    };

    const emma = {
        name: "Emma"
    };

    const children = [
        marty, linus, emma
    ];
    toby.children = children;

    weilai.children = children;

    toby.spouse = weilai;
    weilai.spouse = toby;
    for (let child of toby.children) {
        child.father = toby;
        child.mother = weilai;
    }

    marty.siblings = [linus, emma];
    linus.siblings = [marty, emma];
    emma.siblings = [linus, marty];

    const family = {
        toby, marty, linus, weilai, emma
    };
    const version1 = stringify(family, "  ");
    await fs.writeFile("family.json", version1);
    console.log("Wrote family.json");
    const version2 = parse(version1);
    await fs.writeFile("family2.json", stringify(version2, "  "));
    console.log("Wrote family2.json");
}

main().catch((e) => console.log(e.message));
