@{%
    const Lo = require('../constructs');
    const moo = require('moo');

    let lexer = moo.states({
        main: {
          comment:      { match: /\/\*[^]*?\*\//, lineBreaks: true },
          ws:           { match: /[ \t\r\n]+/, lineBreaks: true },
          bcpl_comment: /\/\/.*?$/,
          number:       /0|-?[1-9][0-9]*(?:\.[0-9]+)?/,

          string_start: { match: '"', push: "in_string" },
          interp_end:   { match: '`', pop: true },

          lparen:       '(',
          rparen:       ')',
          lbracket:     '[',
          rbracket:     ']',
          comma:        ',',
          pound:        '#',
          range:        '..',
          dot:          '.',
          bool:         /true|false/,
          left_arrow:   '<-',
          right_arrow:  '->',
          tilde_arrow:  '~>',
          concat:       '><',
          yields:       '=>',
          push_front:   '+>',
          push_back:    '<+',
          equality:     /==|!=/,
          relational:   /<=|>=|<|>/,
          assign:       /=|\+=|-=|\*=|\/=|%=/,
          incDec:       /\+\+|--/,
          lbrace:       '{',
          rbrace:       '}',
          atsymbol:     '@',
          colons:       '::',
          colon:        ':',
          semi:         ';',
          add:          '+',
          sub:          '-',
          mul:          '*',
          div:          '/',
          mod:          '%',
          cond:         '?',
          ID:           { match: /[a-zA-Z_][a-zA-Z_0-9]*/, keywords: {
                          KW: ['as', 'is', 'are', 'if', 'else', 'while', 'scan', 'reply', 'fail', 'substitute', 'async',
                                'module', 'exists', 'defined', 'undefined', 'using'],
                        }},
          NL:           { match: /\n/, lineBreaks: true },
        },
        in_string: {

          string:       { match: /(?:\\[btnr"\\]|[^\n"`\\])*?"/, value: text => text.slice(0, -1), pop: true },
          interp_begin: { match: /(?:\\[btnr"\\]|[^\n"`\\])*?`/, value: text => text.slice(0, -1), push: "main" }
        }
    });

    let origNext = lexer.next;

    // wraps the lexer function to strip whitespace and comments :-/
    lexer.next = function () {

        var tok = origNext.call(this);

        if (tok) {

            switch (tok.type) {

                case 'ws':
                case 'comment':
                case 'bcpl_comment':
                case 'string_start':
                    return lexer.next();
            }

            return tok;
        }

        return undefined;
    };
%}


# Pass your lexer object using the @lexer option:
@lexer lexer

module -> using:* definition:+                                      {% function (d) { return new Lo.module(d[1], d[0]); } %}

using -> "using" dep ";"                                            {% function (d) { return d[1]; } %}

dep
    ->  %ID                                                         {% function (d) {
                                                                        return new Lo.constant(d[0].value,
                                                                            new Lo.moduleRef(null, d[0].value));
                                                                    } %}
    |   locator "as" %ID                                            {% function (d) {
                                                                        return new Lo.constant(d[2].value, d[0]);
                                                                    } %}

# only supports a single-step namespace for now
locator
    ->  %string                                                     {% function (d) { return new Lo.moduleRef(null, d[0].value); } %}
    |   (%ID "::"):? %ID                                            {% function (d) {
                                                    return new Lo.moduleRef(d[0] ? d[0][0].value : null, d[1].value); } %}

statementList
    ->  statement                                                   {% function (d) { return new Lo.stmtList(d[0]); } %}
    |   statement statementList                                     {% function (d) { return new Lo.stmtList(d[0], d[1]); } %}

statement
    ->  definition                                                  {% id %}
    |   response                                                    {% id %}
    |   expr %assign expr ";"       				                {% function (d) {
                                                                        return new Lo.assign(d[0], d[1].value == '=' ? d[2] :
                                                                            new Lo.binaryOpExpr(
                                                                                {'+=': '+', '-=': '-', '*=': '*', '/=': '/', '%=': '%'}[d[1].value],
                                                                                d[0], d[2])); } %}
    |   destructure %assign expr ";"       				            {% function (d) {
                                                                        return new Lo.assign(d[0], d[1].value == '=' ? d[2] :
                                                                            new Lo.binaryOpExpr(
                                                                                {'+=': '+', '-=': '-', '*=': '*', '/=': '/', '%=': '%'}[d[1].value],
                                                                                d[0], d[2])); } %}
    |   expr %incDec ";"                                            {% function (d) {
                                                                        return new Lo.assign(d[0],
                                                                            d[1] == '++' ?
                                                                            new Lo.binaryOpExpr('+', d[0], new Lo.number('1')) :
                                                                            new Lo.binaryOpExpr('-', d[0], new Lo.number('1')));
                                                                    } %}
    |   conditional                                                 {% id %}
    |   expr ("+>"|"<+") expr ";"                                   {% function (d) {
                                                                        return new Lo.arrayPush(
                                                                            d[1][0].value == '<+' ? 'push-back' : 'push-front', d[0], d[2]);
                                                                    } %}
    |   async:? expr "<-" exprList:? handlers                       {% function (d) {
                                                                        return new Lo.requestStmt(d[1], d[3] ? d[3] : [],
                                                                            d[4][0], d[4][1], d[0] == null);
                                                                    } %}
    #|   async:? expr exprList:? handlers                            {% function (d) {
    #                                                                    return new Lo.requestStmt(d[1], d[2] || [],
    #                                                                        d[3][0], d[3][1], d[0] == null);
    #                                                                } %}
    |   "while" expr block                                          {% function (d) {return new Lo.while(d[1], d[2]);} %}
    |   "scan" expr "->" proc                                       {% function (d) {return new Lo.scan(d[1], d[3]);} %}

response -> ("reply" | "fail" | "substitute") exprList:? ";"        {% function (d) {
                                                                        return new Lo.response(d[0][0].value, d[1] || []);
                                                                    } %}

async -> "async" | "@"

destructure
    ->   "(" %ID ("," %ID):+ ")"                                    {% function (d) {return new Lo.destructure([d[1].value].
                                                                        concat(d[2].map(function (id) { return id[1].value; }))); } %}

definition -> %ID ("is"|"are") expr ";"                             {% function (d) {return new Lo.constant(d[0].value, d[2]);} %}

# there's got to be a better way to describe this
handlers
    ->  ";"                                     {% function (d) { return [null, null]; } %}
    |   assignHandler ";"                       {% function (d) { return [d[0], null]; } %}
    |   assignHandler failHandler
    |   replyHandler                            {% function (d) { return [d[0], null]; } %}
    |   failHandler                             {% function (d) { return [null, d[0]]; } %}
    |   replyHandler failHandler

assignHandler
    ->  "=>" %ID                                {% function (d) { return new Lo.yields(new Lo.identifier(d[1].value)); } %}

replyHandler
    ->  "->" proc                               {% function (d) { return d[1]; } %}

failHandler
    ->  "~>" proc                               {% function (d) { return d[1]; } %}

conditional
	->  "if" expr block                         {% function (d) { return new Lo.conditional(d[1], d[2]); } %}
    |   "if" expr block "else" block         	{% function (d) { return new Lo.conditional(d[1], d[2], d[4]); } %}
    |   "if" expr block "else" conditional    	{% function (d) { return new Lo.conditional(d[1], d[2], d[4]); } %}


# expression grammar, mostly courtesy of Jeff Lee's 1985 C grammar

primary_expr
    ->   %ID                                            {% function (d) {return new Lo.identifier(d[0].value); } %}
    |   literal                                         {% id %}
    |   "(" expr ")"                                    {% function (d) {return d[1]; } %}
    |   "`" expr "`"                                    {% function (d) {return new Lo.coercion(d[1]); } %}

postfix_expr
    ->  primary_expr                                    {% id %}
    |   postfix_expr "[" expr "]"                       {% function (d) {return new Lo.subscript(d[0], d[2]); } %}
    |   postfix_expr "[" expr ".." expr:? "]"           {% function (d) {return new Lo.slice(d[0], d[2], d[4]); } %}
    |   async:? postfix_expr "(" exprList:? ")"         {% function (d) { return d[0] ?
                                                            new Lo.requestExpr(d[1], d[3] ? d[3] : [], false) :
                                                            new Lo.requestExpr(d[1], d[3] ? d[3] : [], true); } %}
    |   postfix_expr "." %ID                            {% function (d) {return new Lo.select(d[0], d[2].value); } %}

has_expr
    ->  postfix_expr                                    {% id %}
    |   expr ("has"|"contains") postfix_expr            {% function (d) {return new Lo.membership(d[0], d[2]); } %}
    |   expr ("exists"|"defined"|"undefined")           {% function (d) {return new Lo.existence(d[0], d[1][0].value == 'undefined'); } %}

unary_expr
    ->  has_expr                                        {% id %}
    |   "#" mult_expr                                   {% function (d) { return new Lo.unaryOpExpr('cardinality', d[1]); } %}
    |   "not" mult_expr                                 {% function (d) {return new Lo.unaryOpExpr('not', d[1]); } %}

mult_expr
    ->  unary_expr                                      {% id %}
    |   mult_expr ("*"|"/"|"%") unary_expr              {% function (d) {return new Lo.binaryOpExpr(d[1][0].value, d[0], d[2]); } %}

add_expr
    ->  mult_expr                                       {% id %}
    |   add_expr ("+"|"-") mult_expr                    {% function (d) {return new Lo.binaryOpExpr(d[1][0].value, d[0], d[2]); } %}

relational_expr
    ->  add_expr                                        {% id %}
    |   relational_expr %relational add_expr            {% function (d) {return new Lo.binaryOpExpr(d[1].value, d[0], d[2]); } %}

equality_expr
    ->  relational_expr                                 {% id %}
    |   equality_expr %equality relational_expr         {% function (d) {return new Lo.binaryOpExpr(d[1].value, d[0], d[2]); } %}

logical_and_expr
    ->  equality_expr                                   {% id %}
    |   logical_and_expr "and" equality_expr            {% function (d) {return new Lo.binaryOpExpr(d[1].value, d[0], d[2]); } %}

logical_or_expr
    ->  logical_and_expr                                {% id %}
    |   logical_or_expr "or" logical_and_expr           {% function (d) {return new Lo.binaryOpExpr(d[1].value, d[0], d[2]); } %}

cond_expr
    ->  logical_or_expr                                 {% id %}
    |   logical_or_expr "?" expr ":" cond_expr          {% function (d) {return new Lo.condExpr(d[0], d[2], d[4]); } %}

expr
    ->  cond_expr                                       {% id %}
    |   expr "><" cond_expr                             {% function (d) {return new Lo.concat(d[0], d[2]); } %}

exprList -> expr ("," expr):*                           {% function (d) {
                                                            return [d[0]].concat(d[1].map(function (item) {return item[1];}));
                                                        } %}

literal
    ->  %bool                                       {% function (d) { return new Lo.boolean(d[0].value === 'true'); } %}
    |   %number                                     {% function (d) { return new Lo.number(d[0].value); } %}
    |   interp_string                               {% id %}
    |   "[" (expr ",":?):* "]"                      {% function (d) { return new Lo.array(d[1].map(function (elem) {return elem[0];})); } %}
    |   "(" (field ",":?):+ ")"                     {% function (d) { return new Lo.compound(d[1].map(function (field) {return field[0];})); } %}
    |   "{" "=>" "}"                                {% function (d) { return new Lo.mapLiteral([]); } %}
    |   "{" (pair ",":?):+ "}"                      {% function (d) { return new Lo.mapLiteral(d[1].map(function (pair) {return pair[0];})); } %}
    |   "{" (expr ",":?):* "}"                      {% function (d) { return new Lo.setLiteral(d[1].map(function (elem) {return elem[0];})); } %}
    |   proc                                        {% function (d) { d[0].isService = true; return d[0]; } %}

interp_string
    ->  %string                                     {% function (d) { return new Lo.string(d[0].value); } %}
    |   %interp_begin expr %interp_end interp_string    {%

    function (d) {

        return new Lo.concat(
            new Lo.concat(new Lo.string(d[0].value), new Lo.coercion(d[1])),
            d[3]);
    } %}

field   -> %ID ":" expr                             {% function (d) { return new Lo.field(d[0].value, d[2]); } %}
pair    -> expr "=>" expr                           {% function (d) { return new Lo.pair(d[0], d[2]); } %}

proc -> "(" paramList:? ")" block                   {% function (d) { return new Lo.procedure(d[1] ? d[1] : [], d[3]); } %}

block -> "{" statementList:? "}"                    {% function (d) { return d[1] ? d[1] : new Lo.stmtList(); } %}

paramList
	-> %ID ("," %ID):*                              {% function (d) { return [d[0].value].concat(d[1].map(function (id) {return id[1].value;})); } %}