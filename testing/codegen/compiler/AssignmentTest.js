/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Compiler = require('../../../codegen/Compiler');
const Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
const JsStmt = require('../../../codegen/JsStmt');
const util = require('util');

module.exports["assignment"] = {

    "assign literal to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'number', val: '57'}
        };

        var context = new Context().createInner();

        test.equal(context.has('foo'), false);

        test.deepEqual(context.compile(node).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ] ]);
        test.equal(context.has('foo'), true);
        test.done();
    },

    "assign literal to lvalue expression": function (test) {

        var node = {
            type: 'assign',
            op: '*=',
            left: {type: 'subscript', list: {type: 'id', name: 'foo'}, index: {type: 'id', name: 'bar'}},
            right: {type: 'number', val: '57'}
        };

        var context = new Context().createInner();

        test.deepEqual(context.compile(node).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'assign',
                        [ 'subscript', [ 'id', '$foo' ], [ 'id', '$bar' ] ],
                        [ 'num', '57' ], '*=' ] ] ]);
        test.done();
    },

    "assign id to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        var context = new Context().createInner();

        test.equal(context.has('foo'), false);
        test.deepEqual(context.compile(node).renderTree(),
            [ 'stmtList',
            [ 'expr-stmt',
                [ 'assign', [ 'id', '$foo' ], [ 'id', '$bar' ] ] ] ]);
        test.equal(context.has('foo'), true);
        test.done();
    },

    "assign application to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'application', address: {type: 'id', name: 'bar'}, args: []}
        };

        var context = new Context().createInner();

        test.equal(context.has('foo'), false);
        test.deepEqual(context.compileStmt(node).renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$bar' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'P0' ],
                            [ 'stmtList',
                                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'id', 'P0' ] ] ] ] ] ] ] ] ]);
        test.equal(context.has('foo'), true);

        test.done();
    },

    "doesn't declare if in parent context": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'number', val: '57'}
        };

        var parent = new Context().createInner();

        parent.declare('foo');

        var context = parent.createInner();

        test.equal(context.has('foo'), true);

        test.deepEqual(context.compile(node).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ] ]);
        test.deepEqual(context.getJsVars(), []);
        test.done();
    },

    "throws if assigning to constant": function (test) {

        test.done();
    }
};
