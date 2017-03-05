/**
 * Created by: spurcell
 * 12/30/14
 */

"use strict";

const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');


module.exports["basics"] = {

    "no unnecessary continuation defs": function (test) {

        var node = new Lo.requestStmt(
            new Lo.identifier('foo'),
            [],
            new Lo.procedure(
                [],
                new Lo.stmtList(
                    new Lo.requestStmt(
                        new Lo.identifier('bar'),
                        [],
                        null,
                        null,
                        true
                    )
                )
            ),
            null,
            true
        );

        var result = node.compile(new Context());

        test.deepEqual(result.renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'call',
                                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                        [ [ 'id', '$bar' ],
                                            [ 'arrayLiteral', [] ],
                                            [ 'null' ],
                                            [ 'null' ] ] ] ],
                            ] ],
                        [ 'null' ] ] ] ]);

        test.done();
    },

    "no unnecessary return stmts": function (test) {

        var node = new Lo.response('reply');

        test.deepEqual(node.compile(new Context().createInner(true)).renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'respond' ],
                    [ [ 'string', 'reply' ], [ 'arrayLiteral', [] ] ] ] ]);
        test.done();
    },

    "conts that only call a cont are collapsed": function (test) {

        var node = new Lo.stmtList(new Lo.conditional(
            new Lo.identifier('valid'),
            new Lo.stmtList(
                new Lo.conditional(
                    new Lo.identifier('x'),
                    new Lo.stmtList(
                        new Lo.assignment('+=',
                        new Lo.identifier('found'),
                        new Lo.requestExpr(
                            new Lo.identifier('explore'),
                            [],
                            true
                        ))
                    )
                )
            )
        ),
            new Lo.stmtList(
            new Lo.incrDecr('increment', new Lo.identifier('point'))
        ));

        var result = node.compile(new Context());

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'if',
                [ 'id', '$valid' ],
                [ 'stmtList',
                    [ 'if',
                        [ 'id', '$x' ],
                        [ 'stmtList',
                            [ 'expr-stmt',
                                [ 'call',
                                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                    [ [ 'id', '$explore' ],
                                        [ 'arrayLiteral', [] ],
                                        [ 'function',
                                            null,
                                            [ 'res0' ],
                                            [ 'stmtList',
                                                [ 'expr-stmt', ["assign",
                                                    [ "id", "$found" ], [ "subscript", [ "id", "res0" ], [ "num", "0" ] ], "+=" ] ],
                                                [ 'stmtList', [ "expr-stmt",
                                                    [ "call", [ "id", "c0" ], [] ] ] ] ] ],
                                        [ 'null' ] ] ] ] ],
                        [ 'stmtList', [ 'expr-stmt', [ 'call', [ 'id', 'c0' ], [] ] ] ] ] ],
                [ 'stmtList', [ 'expr-stmt', [ 'call', [ 'id', 'c0' ], [] ] ] ] ],
            [ 'stmtList',
                [ 'function',
                    'c0',
                    [],
                    [ 'stmtList', [ 'expr-stmt', [ 'inc', [ 'id', '$point' ] ] ] ] ] ] ]);

        test.done();
    },

    "no stmts following returns": function (test) {

        var node = new Lo.stmtList(
            new Lo.requestStmt(
            new Lo.identifier('findWords'),
            [],
            new Lo.procedure(
                ['rest'],
                new Lo.stmtList(
                    new Lo.response('reply', [new Lo.identifier('word')])
                ),
                false
            ),
            null,
            true
        ),
        new Lo.stmtList(
            new Lo.incrDecr('increment', new Lo.identifier('i'))
        ));

        var result = node.compile(new Context().createInner(true));

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$findWords' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$rest' ],
                                [ 'stmtList',
                                    [ 'expr-stmt',
                                        [ 'assign',
                                            [ 'id', '$rest' ],
                                            [ 'subscript', [ 'id', 'args' ], [ 'num', '0' ] ] ] ],
                                    [ 'stmtList',
                                        [ 'expr-stmt',
                                            [ 'call',
                                                [ 'select', [ "id", "task" ], 'respond' ],
                                                [ [ "string", "reply" ], [ "arrayLiteral", [ [ "id", "$word" ] ] ] ] ] ],
                                        [ 'stmtList',
                                            [ 'return' ] ] ] ] ] ],
                        [ 'id', 'c0' ] ] ] ],
            [ 'stmtList',
                [ 'function',
                    'c0',
                    [],
                    [ 'stmtList', [ 'expr-stmt', [ 'inc', [ 'id', '$i' ] ] ] ] ] ] ]);

        test.done();
    },

    // "no unnecessary returns take 2": function (test) {
    //
    //     // if the following statement is a connector...
    //     /*
    //
    //     findWords() -> (rest) {
    //         reply word;
    //     }
    //
    //     i++;
    //
    //     */
    //
    //     var node = new Lo.stmtList(
    //         new Lo.requestStmt(
    //             new Lo.identifier('findWords'),
    //             [],
    //             new Lo.procedure(
    //                 ['rest'],
    //                 new Lo.stmtList(
    //                     new Lo.response('reply', [new Lo.identifier('word')])
    //                 ),
    //                 false
    //             ),
    //             null,
    //             true
    //         ),
    //         new Lo.stmtList(
    //             new Lo.incrDecr('increment', new Lo.identifier('i'))
    //         ));
    //
    //     console.log('here');
    //
    //     var result = node.compile(new Context().createInner(true));
    //
    //     test.deepEqual(result.renderTree(), [ 'stmtList',
    //         [ 'expr-stmt',
    //             [ 'call',
    //                 [ 'select', [ 'id', 'task' ], 'sendMessage' ],
    //                 [ [ 'id', '$findWords' ],
    //                     [ 'arrayLiteral', [] ],
    //                     [ 'function',
    //                         null,
    //                         [ 'args' ],
    //                         [ 'stmtList',
    //                             [ 'var', '$rest' ],
    //                             [ 'stmtList',
    //                                 [ 'expr-stmt',
    //                                     [ 'assign',
    //                                         [ 'id', '$rest' ],
    //                                         [ 'subscript', [ 'id', 'args' ], [ 'num', '0' ] ] ] ],
    //                                 [ 'stmtList',
    //                                     [ 'expr-stmt',
    //                                         [ 'call',
    //                                             [ 'select', [ "id", "task" ], 'respond' ],
    //                                             [ [ "string", "reply" ], [ "arrayLiteral", [ [ "id", "$word" ] ] ] ] ] ],
    //                                      ] ] ] ],
    //                     [ 'id', 'c0' ] ] ] ],
    //         [ 'stmtList',
    //             [ 'function',
    //                 'c0',
    //                 [],
    //                 [ 'stmtList', [ 'expr-stmt', [ 'inc', [ 'id', '$i' ] ] ] ] ] ] ]);
    //
    //     test.done();
    // },


    "no unnecessary cont": function (test) {

        // low-priority cleanup -
        // this creates an unnecessary cont (in reqstmt compile)
        // it could just put an anonymous callback in the fail branch

        /*

         findWords() -> (rest) {
         reply word;
         }

         i++;

         */

        test.done();
    }
};