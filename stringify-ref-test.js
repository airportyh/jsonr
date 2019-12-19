const { stringify } = require("./stringify");

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
console.log(stringify(family, "  "));
// const tally = new Map();
// tallyRefs(family, tally);
// // for (let [obj, count] of tally) {
// //     console.log(obj, ": ", count);
// // }
// const refsMap = new Map();
// assignRefs(tally, refsMap);
// console.log(refsMap);
