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

* implement ref feature to parser
* add serializer
* add data deserialization to parser (done)
