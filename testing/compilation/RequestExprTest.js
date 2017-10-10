/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
const LoContext = require('../../codegen/LoContext');
const JsContext = require('../../codegen/JsContext');
const util = require('util');

module.exports["blocking calls"] = {

    "expr args": function (test) {

        var node = new Lo.response('reply', [new Lo.binaryOpExpr(
            '*',
            new Lo.identifier('num'),
            new Lo.requestExpr(
                new Lo.identifier('main'), [
                    new Lo.binaryOpExpr('-', new Lo.identifier('num'), new Lo.number('1'))
                ],
                true))]);

        // compile with a nice service context
        var result = new Lo.stmtList(node).compile2(new LoContext().createInner(true), new JsContext());

        test.deepEqual(result.renderTree(),
            [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                    [ [ 'id', '$main' ],
                        [ 'arrayLiteral',
                            [ [ 'sub', [ 'id', '$num' ], [ 'num', '1' ] ] ] ],
                        [ 'function',
                            null,
                            [ 'res0' ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'call',
                                        [ 'select', [ 'id', 'task' ], 'succ' ],
                                        [
                                            [ 'arrayLiteral', [ [ 'mul', [
                                                "id",
                                                "$num"
                                            ], [ "subscript", [ "id", "res0" ], [ "num", "0" ] ] ] ] ] ] ] ] ] ],
                            [ 'null' ] ] ] ] ]);

        test.done();
    },

    "no args": function (test) {

        var node = new Lo.assign(
            new Lo.identifier('baz'),
            new Lo.requestExpr(
                new Lo.identifier('foo'), [], true
            )
        );

        test.deepEqual(new Lo.stmtList(node).compile2(new LoContext(), new JsContext()).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                        [ [ 'id', '$foo' ],
                            [ 'arrayLiteral', [] ],
                            [ 'function',
                                null,
                                [ 'res0' ],
                                [ 'stmtList',
                                    [ 'expr-stmt',
                                        [ 'assign',
                                            [ 'id', '$baz' ],
                                            [ 'subscript', [ 'id', 'res0' ], [ 'num', '0' ] ] ] ] ] ],
                            [ 'null' ] ] ] ] ]);

        test.done();
    },

    "one arg": function (test) {

        var node = new Lo.assign(
            new Lo.identifier('baz'),
            new Lo.requestExpr(
                new Lo.identifier('foo'), [new Lo.number('42')], true
            )
        );

        test.deepEqual(new Lo.stmtList(node).compile2(new LoContext(), new JsContext()).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                        [ [ 'id', '$foo' ],
                            [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                            [ 'function',
                                null,
                                [ 'res0' ],
                                [ 'stmtList',
                                    [ 'expr-stmt',
                                        [ 'assign',
                                            [ 'id', '$baz' ],
                                            [ 'subscript', [ 'id', 'res0' ], [ 'num', '0' ] ] ] ] ] ],
                            [ 'null' ] ] ] ] ]);
        test.done();
    },

    "two args": function (test) {

        var node = new Lo.assign(
            new Lo.identifier('baz'),
            new Lo.requestExpr(
                new Lo.identifier('foo'), [
                    new Lo.number('42'),
                    new Lo.string('hi there')
                ], true
            )
        );

        test.deepEqual(new Lo.stmtList(node).compile2(new LoContext(), new JsContext()).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                        [ [ 'id', '$foo' ],
                            [ 'arrayLiteral',
                                [ [ 'num', '42' ], [ 'string', 'hi there' ] ] ],
                            [ 'function',
                                null,
                                [ 'res0' ],
                                [ 'stmtList',
                                    [ 'expr-stmt',
                                        [ 'assign',
                                            [ 'id', '$baz' ],
                                            [ 'subscript', [ 'id', 'res0' ], [ 'num', '0' ] ] ] ] ] ],
                            [ 'null' ] ] ] ] ]);
        test.done();
    },

    "with nested requests": function (test) {

        var node = new Lo.assign(
            new Lo.identifier('baz'),
            new Lo.requestExpr(
                new Lo.identifier('baz'), [
                    new Lo.requestExpr(
                        new Lo.identifier('foo'), [], true
                    ),
                    new Lo.requestExpr(
                        new Lo.identifier('bar'), [], true
                    )
                ], true
            )
        );

        var swaps = [
            ['res0',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                        [ [ 'id', '$foo' ],
                            [ 'arrayLiteral', [ ] ], [ 'null' ] ] ] ] ],
            ['res1',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                        [ [ 'id', '$bar' ], [ 'arrayLiteral', [] ], [ 'null' ] ] ] ] ],
            ['res2',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                        [ [ 'id', '$baz' ],
                            [ 'arrayLiteral', [ [ 'id', 'res0' ], [ 'id', 'res1' ] ] ], [ 'null' ] ] ] ] ],
        ];

        test.deepEqual(new Lo.stmtList(node).compile2(new LoContext(), new JsContext()).renderTree(),
            [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'res0' ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'call',
                                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                                        [ [ 'id', '$bar' ],
                                            [ 'arrayLiteral', [] ],
                                            [ 'function',
                                                null,
                                                [ 'res1' ],
                                                [ 'stmtList', [ 'expr-stmt', ["call",
                                                    [ "select", [ "id", "task" ], "sendAndBlock" ],
                                                    [ [ "id", "$baz" ],
                                                        [ "arrayLiteral", [
                                                                [ "subscript", [ "id", "res0" ], [ "num", "0" ] ],
                                                                [ "subscript", [ "id", "res1" ], [ "num", "0" ] ] ]
                                                        ],
                                                        [
                                                            "function",
                                                            null,
                                                            [ "res2" ],
                                                            [ "stmtList", [ "expr-stmt", [ "assign", [ "id", "$baz" ], [ "subscript", [ "id", "res2" ], [ "num", "0" ] ] ] ] ]
                                                        ], [ "null" ] ] ] ] ] ],
                                            [ 'null' ] ] ] ] ] ],
                        [ 'null' ] ] ] ] ]);
        test.done();
    }
};


