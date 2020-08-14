
exports.Def = Def;
function Def(id, object) {
    this.id = id;
    this.object = object;
}

exports.Ref = Ref;
function Ref(id) {
    this.id = id;
}

exports.resolveRefs = resolveRefs;
function resolveRefs(value, refDict, visited) {
    if (value instanceof Ref) {
        value = refDict[value.id];
    }

    if (visited.has(value)) {
        return value;
    }

    visited.add(value);

    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            value[i] = resolveRefs(value[i], refDict, visited);
        }
    } else if (typeof value === "object") {
        for (let key in value) {
            value[key] = resolveRefs(value[key], refDict, visited);
        }
    }
    return value;
}
