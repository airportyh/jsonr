const moo = require('moo');

let lexer = moo.compile({
  WS:  /[ \t]+/,
  number:  /[-+]?(?:0|[1-9])[0-9]*(?:.[0-9]+)?(?:[eE][0-9]+)?/,
  string:  /"(?:\\["\\]|[^\n"\\])*"/,
  lbrace: "{",
  rbrace: "}",
  lbracket: "[",
  rbracket: "]",
  comma: ",",
  colon: ":",
  keyword: ["true", "false", "null"],
  star: "*",
  and: "&",
  NL: { match: "\n", lineBreaks: true }
});

module.exports = lexer;