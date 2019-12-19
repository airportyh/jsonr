# Original grammar stolen from json.org, then modified.

@{%
const { Ref, resolveRefs } = require("./refs");
const refDict = {};
%}

jsonr -> element
    {%
        data => {
            return resolveRefs(data[0], refDict, new Set())
        }
    %}

value
    -> object                {% id %}
    |  array                 {% id %}
    |  string                {% id %}
    |  number                {% id %}
    |  "true"                {% () => true %}
    |  "false"               {% () => false %}
    |  "null"                {% () => null %}
    |  ref                   {% id %}
    |  ref_object_definition {% id %}
    |  ref_array_definition  {% id %}

ref_object_definition
    -> ref_definition ws object
        {%
            data => {
                return refDict[data[0]] = data[2]
            }
        %}

ref_array_definition
    -> ref_definition ws array
        {%
            data => {
                return refDict[data[0]] = data[2]
            }
        %}

ref -> "*" digits
    {%
        data => new Ref(data[1])
    %}

ref_definition
    ->  "&" digits
    {%
        data => data[1]
    %}

object
    ->  "{" ws "}"
        {%
            data => data[1]
        %}
    |  "{" members "}"
        {%
            data => data[1]
        %}

members
    -> member   {% id %}
    |  member "," members
        {%
            data => {
                return {
                    ...data[2],
                    ...data[0]
                }
            }
        %}

member
    -> ws string ws ":" element
        {%
            data => {
                return {
                    [data[1]]: data[4]
                }
            }
        %}

array
    ->  "[" ws "]"
        {%
            () => []
        %}
    |  "[" elements "]"
        {%
            data => data[1]
        %}

elements
    -> element   {% data => [data[0]] %}
    |  element "," elements
        {%
            data => {
                return [data[0], ...data[2]]
            }
        %}

element
    -> ws value ws
        {% data => data[1] %}

string
    -> "\"" characters "\""
        {% data => data[1] %}

characters
    -> null    {% () => "" %}
    |  character characters
        {% data => data[0] + data[1] %}

character
    -> [^\\\"] {% id %}
    |  "\\" escape
        {% data => data[1] %}

escape
    -> "\""    {% () => '"'  %}
    |  "\\"    {% () => "\\" %}
    |  "/"     {% () => "/"  %}
    |  "b"     {% () => "\b" %}
    |  "f"     {% () => "\f" %}
    |  "n"     {% () => "\n" %}
    |  "r"     {% () => "\r" %}
    |  "t"     {% () => "\t" %}
    |  "u" hex hex hex hex
        {%
            data =>
                String
                .fromCharCode(
                    ((((data[1] * 16) + data[2]) * 16) + data[3]) * 16 + data[4])
        %}

hex
    -> digit    {% id %}
    |  [Aa]     {% () => 10 %}
    |  [Bb]     {% () => 11 %}
    |  [Cc]     {% () => 12 %}
    |  [Dd]     {% () => 13 %}
    |  [Ee]     {% () => 14 %}
    |  [Ff]     {% () => 15 %}

number
    -> integer fraction exponent
        {%
            data => {
                const numberString = data[0] + data[1] + data[2]
                return Number(numberString)
            }
        %}

integer
    -> digit    {% id %}
    |  onenine digits
        {%
            data => data[0] + data[1]
        %}
    |  "-" digit
        {%
            data => "-" + data[1]
        %}
    |  "-" onenine digits
        {%
            data => "-" + data[1] + data[2]
        %}

digits
    -> digit   {% id %}
    |  digit digits
        {% data => data[0] + data[1] %}

digit
    -> "0"      {% id %}
    |  onenine  {% id %}

onenine
    -> [1-9]    {% id %}

fraction
    -> null     {% () => "" %}
    |  "." digits
        {% data => "." + data[1] %}

exponent
    -> null     {% () => "" %}
    |  [Ee] sign digits
        {%
            data => "e" + data[1] + data[2]
        %}

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
