/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 6/24/17.
 */

"use strict";

const BlockingReq = require('../../compiler/BlockingReq');
const JS = require('../../codegen/JsPrimitives');
const CFNode = require('../../compiler/CFNode');

module.exports = {

    "with no handlers": function (test) {

        var req = new BlockingReq(JS.ID('foo'), []);

        test.deepEqual(req.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                    [ [ 'id', 'foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'null' ],
                        [ 'null' ] ] ] ] ]);

        test.done();
    },

    "with one handler": function (test) {

        // what the hell is a handler? a CFNode??
        // a blocking req has two points of attachment: its handlers
        // a handler is a fn expression, either a def or a ref

        var req = new BlockingReq(JS.ID('foo'), [], JS.fnDef(['args'], new CFNode()));

        // let's say the next stmt is a fn call with no args -- we could optimize by detecting that

        test.deepEqual(req.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                    [ [ 'id', 'foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'null' ],
                        [ 'null' ] ] ] ] ]);

        test.done();
    }
};

