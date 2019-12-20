# JSONR - JSON with Refs

JSONR is the JSON serialization language plus refs.

*"What is refs?" You might ask.*

A ref allows the same object to be referenced multiple
times within a file, so that referential equality will be preserved by the serialization.
The syntax of refs follow the refs feature in YAML.

## Install

```
npm install airportyh/jsonr
```

## Example

Let's say you want to model a family of people and the relationships between them.

```js
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
```

You shall note that if you traverse the object graph starting at the variable `family`,
you will encounter the same objects multiple times. For example, `marty` can be reached
by any of the following: `family.marty`, `family.dad.children[0]`, `family.linus.siblings[0]`.

If we try to serialize this object graph using `JSON.stringify(family)`, you'll get a

```
TypeError: Converting circular structure to JSON
```

But if you do it with JSONR:

```js
const jsonr = require("airportyh/jsonr");
console.log(jsonr.stringify(family, "  "));
```
You get (output):

```
{
  "mom": &1 {
    "name": "Wendy",
    "spouse": &2 {
      "name": "Toby",
      "spouse": *1,
      "children": &3 [
        &4 {
          "name": "Marty",
          "father": *2,
          "mother": *1,
          "siblings": [
            &5 {
              "name": "Linus",
              "father": *2,
              "mother": *1,
              "siblings": [
                *4,
                &6 {
                  "name": "Emma",
                  "father": *2,
                  "mother": *1,
                  "siblings": [
                    *5,
                    *4
                  ]
                }
              ]
            },
            *6
          ]
        },
        *5,
        *6
      ]
    },
    "children": *3
  },
  "dad": *2,
  "marty": *4,
  "linus": *5,
  "emma": *6
}
```

The `&<NUMBER>` tag (ex. `&1`) defines the ref ID of an object or array which follows that tag.
The `*<NUMBER>` syntax (ex. `*1`) refers the the object that was defined with the given ref ID.
with the ID `1`.

In this JSONR output, `dad` was given the ref ID of 2, `mom` was given 1, `marty` was given 4,
`linus` 5, and `emma` 6. The `children` array which was shared by mom and dad was given the ref ID of 3.

## Todo

* publish to npm
* load tests
* add refs for strings?
* maybe rewrite `_stringify`
* clean up code (done)
* add data deserialization to parser (done)
* Investigate weird performance bug (done)
* implement ref feature to parser (done)
* add serializer(done)
* fix bug with family round trip (done)
* top level jsonr.js file (done)
* documentation (done)
* use family as example (done)
* fix the family round trip props getting re-ordered (done)
