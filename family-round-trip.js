const { stringify, parse } = require("./jsonr");
const fs = require("mz/fs");

async function main() {
    const dad = { name: "Toby" };
    const mom = { name: "Wendy" };
    dad.spouse = mom;
    mom.spouse = dad;

    const marty = { name: "Marty" };
    const linus = { name: "Linus" };
    const emma = { name: "Emma" };

    const children = [
        marty, linus, emma
    ];

    dad.children = children;
    mom.children = children;

    for (let child of children) {
        child.father = dad;
        child.mother = mom;
    }

    marty.siblings = [linus, emma];
    linus.siblings = [marty, emma];
    emma.siblings = [linus, marty];

    const family = {
        mom, dad, marty, linus, emma
    };
    const version1 = stringify(family, "  ");
    await fs.writeFile("family.json", version1);
    console.log("Wrote family.json");
    const version2 = parse(version1);
    await fs.writeFile("family2.json", stringify(version2, "  "));
    console.log("Wrote family2.json");
}

main().catch((e) => console.log(e.message));
