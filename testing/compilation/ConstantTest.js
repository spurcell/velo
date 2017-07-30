/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const util = require('util');
const rootContext = new Context();

module.exports["root constants"] = {

    "numeric": function (test) {

        var node = new Lo.constant('port', new Lo.number('443'));

        var context = new Context();

        test.equal(context.has('port'), false);
        test.equal(context.isConstant('port'), false);

        test.equal(node.compile(context).renderJs(), 'const $port = 443;');

        test.equal(context.has('port'), true);
        test.ok(context.isConstant('port'));

        test.done();
    },

    "string": function (test) {

        var node = new Lo.constant('album', new Lo.string("Mellon Collie"));

        var context = new Context();

        test.equal(context.has('album'), false);
        test.equal(context.isConstant('album'), false);

        test.equal(node.compile(context).renderJs(), "const $album = 'Mellon Collie';");

        test.equal(context.has('album'), true);
        test.ok(context.isConstant('album'));
        // test.deepEqual(context.resolve('album').renderTree(), JS.string('Melon Collie').renderTree());

        test.done();
    }

};

module.exports["non-root constants"] = {

    "numeric": function (test) {

        var node = new Lo.constant('port', new Lo.number('443'));

        var context = new Context(rootContext);

        test.equal(context.has('port'), false);
        test.equal(context.isConstant('port'), false);

        test.equal(node.compile(context).renderJs(), 'const $port = 443;');

        test.equal(context.has('port'), true);
        test.ok(context.isConstant('port'));

        test.done();
    },

    "string": function (test) {

        var node = new Lo.constant('album', new Lo.string("Mellon Collie"));

        var context = new Context(rootContext);

        test.equal(context.has('album'), false);
        test.equal(context.isConstant('album'), false);

        test.equal(node.compile(context).renderJs(), "const $album = 'Mellon Collie';");

        test.equal(context.has('album'), true);
        test.ok(context.isConstant('album'));
        // test.deepEqual(context.resolve('album').renderTree(), JS.string('Melon Collie').renderTree());

        test.done();
    },

    "service": function (test) {

        var node = new Lo.constant('main',
            new Lo.procedure(
                ['next'],
                new Lo.stmtList(
                    new Lo.assign(
                        new Lo.identifier('result'),
                        new Lo.number('10')
                    )
                ),
                true
            ));

        var context = new Context(rootContext);
        context.id = 47;

        test.equal(context.has('main'), false);
        test.equal(context.isConstant('main'), false);

        test.deepEqual(node.compile(context).renderTree(),
            [ 'const',
                '$main',
                [ 'function',
                    null,
                    [ 'args', 'succ', 'fail' ],
                    [ 'stmtList',
                        [ 'var',
                            'task',
                            [ 'new', 'Task', [ [ 'id', 'succ' ], [ 'id', 'fail' ] ] ] ],
                        [ 'stmtList',
                            [ 'var', [ '$next', '$result' ] ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'assign',
                                        [ 'id', '$next' ],
                                        [ 'subscript', [ 'id', 'args' ], [ 'num', '0' ] ] ] ],
                                [ 'stmtList',
                                    [ 'expr-stmt',
                                        [ 'assign', [ 'id', '$result' ], [ 'num', '10' ] ] ],
                                    [ 'stmtList',
                                        [ 'expr-stmt',
                                            [ 'call', [ 'select', [ 'id', 'task' ], 'deactivate' ], [] ] ] ] ] ] ] ] ] ]);

        test.equal(context.has('main'), true);
        test.ok(context.isConstant('main'));

        test.done();
    },

    "avoids JS collisions": function (test) {

        var node = new Lo.constant('constructor', new Lo.string("Melon Collie"));

        var context = new Context(rootContext);

        test.equal(context.has('constructor'), false);
        test.equal(context.isConstant('constructor'), false);

        test.equal(node.compile(context).renderJs(), "const $constructor = 'Melon Collie';");

        test.equal(context.has('constructor'), true);
        test.ok(context.isConstant('constructor'));
        // test.deepEqual(context.resolve('constructor').renderTree(), JS.string('Melon Collie').renderTree());

        test.done();
    }
};
