# Original grammar stolen from json.org, then modified.

@{%
const lexer = require("./lexer");
const { Ref, resolveRefs } = require("./refs");
const refDict = {};
%}

@lexer lexer

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
            data => ({})
        %}
    |  "{" members "}"
        {%
            data => data[1]
        %}

members
    -> member   {% id %}
    |  members "," member
        {%
            data => {
                return {
                    ...data[0],
                    ...data[2]
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
    |  elements "," element
        {%
            data => {
                return [...data[0], data[2]]
            }
        %}

element
    -> ws value ws
        {% data => data[1] %}

string
    -> %string
        {%
            (data) => {
                return JSON.stringify(data[0].value);
            }
        %}

number
    -> %number
        {%
            data => {
                return Number(data[0].value);
            }
        %}

ws  -> %WS:*
