/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const Identifier = require('./Identifier');


/**
 * An assignment statement.
 *
 * @param op
 * @param left      expr
 * @param right     expr
 */
var __ = function (op, left, right) {

    this.op = op;
    this.left = left;
    this.right = right;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: this.op,
        left: this.left.getAst(),
        right: this.right.getAst()
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    var left = this.left.compile(context);
    var right = this.right.compile(context);

    // todo probably want to add some runtime checks

    if (this.op == 'push-front') {
        return JS.exprStmt(JS.fnCall(JS.select(right, 'unshift'), [left]));
    }
    else {
        return JS.exprStmt(JS.fnCall(JS.select(left, 'push'), [right]));
    }
};

module.exports = __;