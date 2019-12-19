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

const jsonr = require("./jsonr");
console.log(jsonr.stringify(family, "  "));
// This would given error: JSON.stringify(family)
