exports.stringify = stringify;

function stringify(value, indent) {
    const tally = new Map();
    tallyRefCounts(value, tally);
    const refIds = new Map();
    assignRefIds(tally, refIds);
    const visited = new Set();
    return _stringify(value, refIds, visited, indent, 0);
}

exports.assignRefIds = assignRefIds;
function assignRefIds(tally, refsMap) {
    let nextId = 1;
    for (let [value, count] of tally) {
        if (count > 1) {
            refsMap.set(value, nextId);
            nextId++;
        }
    }
}

exports.tallyRefCounts = tallyRefCounts;
function tallyRefCounts(value, tally) {
    if (Array.isArray(value)) {
        const count = tally.get(value) || 0;
        tally.set(value, count + 1);
        if (count === 0) {
            for (let i = 0; i < value.length; i++) {
                tallyRefCounts(value[i], tally);
            }
        }
    } else if (isObject(value)) {
        const count = tally.get(value) || 0;
        tally.set(value, count + 1);
        if (count === 0) {
            for (let key in value) {
                tallyRefCounts(value[key], tally);
            }
        }
    }
}

function isObject(value) {
    return (typeof value === "object") && (value !== null);
}

function _stringify(value, refIds, visited, indent, level) {
    const baseIndent = Array(level + 1).join(indent);
    if (Array.isArray(value)) {
        if (visited.has(value)) {
            return "*" + refIds.get(value);
        }
        visited.add(value);
        const refId = refIds.get(value);
        let arrayString = "";
        if (refId) {
            arrayString += "&" + refId + " ";
        }
        arrayString += "[";
        for (let i = 0; i < value.length; i++) {
            if (indent) {
                arrayString += "\n" + baseIndent + indent;
            }
            arrayString += _stringify(value[i], refIds, visited, indent, level + 1);
            if (i < value.length - 1) {
                arrayString += ","
            }
        }
        if (indent) {
            arrayString += "\n" + baseIndent;
        }
        arrayString += "]";
        return arrayString;
    } else if (isObject(value)) {
        if (visited.has(value)) {
            return "*" + refIds.get(value);
        }
        visited.add(value);
        const refId = refIds.get(value);
        let objectString = "";
        if (refId) {
            objectString += "&" + refId + " ";
        }
        objectString += "{"
        let keys = Object.keys(value);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (indent) {
                objectString += "\n" + baseIndent + indent;
            }
            objectString += quote(key) + ": " + _stringify(value[key], refIds, visited, indent, level + 1);
            if (i < keys.length - 1) {
                objectString += ",";
            }
        }
        if (indent) {
            objectString += "\n" + baseIndent;
        }
        objectString += "}";
        return objectString;
    } else if (typeof value === "string") {
        return quote(value);
    } else {
        return String(value);
    }
}

function quote(str) {
    return '"' + str.replace(/\"/g, "\\\"") + '"';
}
