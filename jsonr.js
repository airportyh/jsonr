// Generated automatically by nearley, version 2.19.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "json", "symbols": ["element"]},
    {"name": "value", "symbols": ["object"]},
    {"name": "value", "symbols": ["array"]},
    {"name": "value", "symbols": ["string"]},
    {"name": "value", "symbols": ["number"]},
    {"name": "value$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value", "symbols": ["value$string$1"]},
    {"name": "value$string$2", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value", "symbols": ["value$string$2"]},
    {"name": "value$string$3", "symbols": [{"literal":"n"}, {"literal":"u"}, {"literal":"l"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "value", "symbols": ["value$string$3"]},
    {"name": "object", "symbols": [{"literal":"{"}, "ws", {"literal":"}"}]},
    {"name": "object", "symbols": [{"literal":"{"}, "members", {"literal":"}"}]},
    {"name": "members", "symbols": ["member"]},
    {"name": "members", "symbols": ["member", {"literal":","}, "members"]},
    {"name": "member", "symbols": ["ws", "string", "ws", {"literal":":"}, "element"]},
    {"name": "array", "symbols": [{"literal":"["}, "ws", {"literal":"]"}]},
    {"name": "array", "symbols": [{"literal":"["}, "elements", {"literal":"]"}]},
    {"name": "elements", "symbols": ["element"]},
    {"name": "elements", "symbols": ["element", {"literal":","}, "elements"]},
    {"name": "element", "symbols": ["ws", "value", "ws"]},
    {"name": "string", "symbols": [{"literal":"\""}, "characters", {"literal":"\""}]},
    {"name": "characters", "symbols": []},
    {"name": "characters", "symbols": ["character", "characters"]},
    {"name": "character", "symbols": [/[^\\\"]/]},
    {"name": "character", "symbols": [{"literal":"\\"}, "escape"]},
    {"name": "escape", "symbols": [{"literal":"\""}]},
    {"name": "escape", "symbols": [{"literal":"\\"}]},
    {"name": "escape", "symbols": [{"literal":"/"}]},
    {"name": "escape", "symbols": [{"literal":"b"}]},
    {"name": "escape", "symbols": [{"literal":"f"}]},
    {"name": "escape", "symbols": [{"literal":"n"}]},
    {"name": "escape", "symbols": [{"literal":"r"}]},
    {"name": "escape", "symbols": [{"literal":"t"}]},
    {"name": "escape", "symbols": [{"literal":"u"}, "hex", "hex", "hex", "hex"]},
    {"name": "hex", "symbols": ["digit"]},
    {"name": "hex", "symbols": [/[A-Fa-f]/]},
    {"name": "number", "symbols": ["integer", "fraction", "exponent"]},
    {"name": "integer", "symbols": ["digit"]},
    {"name": "integer", "symbols": ["onenine", "digits"]},
    {"name": "integer", "symbols": [{"literal":"-"}, "digit"]},
    {"name": "integer", "symbols": [{"literal":"-"}, "onenine", "digits"]},
    {"name": "digits", "symbols": ["digit"]},
    {"name": "digits", "symbols": ["digit", "digits"]},
    {"name": "digit", "symbols": [{"literal":"0"}]},
    {"name": "digit", "symbols": ["onenine"]},
    {"name": "onenine", "symbols": [/[1-9]/]},
    {"name": "fraction", "symbols": []},
    {"name": "fraction", "symbols": [{"literal":"."}, "digits"]},
    {"name": "exponent", "symbols": []},
    {"name": "exponent", "symbols": [{"literal":"E"}, "sign", "digits"]},
    {"name": "exponent", "symbols": [{"literal":"e"}, "sign", "digits"]},
    {"name": "sign", "symbols": []},
    {"name": "sign", "symbols": [{"literal":"+"}]},
    {"name": "sign", "symbols": [{"literal":"-"}]},
    {"name": "ws", "symbols": []},
    {"name": "ws", "symbols": [{"literal":" "}, "ws"]},
    {"name": "ws", "symbols": [{"literal":"\n"}, "ws"]},
    {"name": "ws", "symbols": [{"literal":"\r"}, "ws"]},
    {"name": "ws", "symbols": [{"literal":"\t"}, "ws"]}
]
  , ParserStart: "json"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
