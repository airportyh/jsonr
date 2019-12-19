# JSONR - JSON with Refs

This project intends to bring refs to JSON, or at least
have a version of JSON that supports refs. By refs, we mean
one value within a JSON file can be shared within the file
by:

1. defining the value the first time it is seen and defining its ref ID
2. referring to the ref ID the next time it is seen rather than defining the value again

The syntax will follow the refs feature in YAML. For example:

```
[
    &1 {
        "name": "Anton",
        "friend": *2
    },
    &2 {
        "name": "Martin",
        "friend": *1
    }
]
```

The `&1` tag defines the ref ID of the object that comes after
next as `1`. The `*1` syntax used later refers the the object
with the ID `1`. Thus, Anton's friend is Martin, and vice versa.

## Todo

* use family as example
* fix the family round trip props getting re-ordered
* documentation
* load tests
* maybe rewrite `_stringify`
* clean up code (done)
* add data deserialization to parser (done)
* Investigate weird performance bug (done)
* implement ref feature to parser (done)
* add serializer(done)
* fix bug with family round trip (done)
* top level jsonr.js file (done)
