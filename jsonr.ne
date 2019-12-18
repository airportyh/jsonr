// Original grammar stolen from json.org

json -> element

value
    -> object
    |  array
    |  string
    |  number
    |  "true"
    |  "false"
    |  "null"

object
    -> "{" ws "}"
    |  "{" members "}"

members
    -> member
    |  member "," members

member
    -> ws string ws ":" element

array
    -> "[" ws "]"
    |  "[" elements "]"

elements
    -> element
    |  element "," elements

element
    -> ws value ws

string
    -> "\"" characters "\""

characters
    -> null
    |  character characters

character
    -> [^\\\"]
    |  "\\" escape

escape
    -> "\""
    |  "\\"
    |  "/"
    |  "b"
    |  "f"
    |  "n"
    |  "r"
    |  "t"
    |  "u" hex hex hex hex

hex
    -> digit
    |  [A-Fa-f]

number
    -> integer fraction exponent

integer
    -> digit
    |  onenine digits
    |  "-" digit
    |  "-" onenine digits

digits
    -> digit
    |  digit digits

digit
    -> "0"
    |  onenine

onenine
    -> [1-9]

fraction
    -> null
    |  "." digits

exponent
    -> null
    |  "E" sign digits
    |  "e" sign digits

sign
    -> null
    |  "+"
    |  "-"

ws
    -> null
    |  "\u0020" ws
    |  "\u000A" ws
    |  "\u000D" ws
    |  "\u0009" ws
