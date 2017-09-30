/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');


/**
 * A scan statement. Scan is different from something like "for every X in Y" because
 * a) there's no item referent in the same scope as scan, if it's named, it's in a subscope
 * b) it's more like an emitter of a sequence (a msg source) than a control structure like while
 *
 * @param over
 * @param into
 */
var __ = function (over, into) {

    this.over = over;
    this.into = into;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'scan',
        over: this.over.getAst(),
        into: this.into.getAst()
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'scan',
        this.over.getTree(),
        this.into.getTree()
    ];
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    return JS.exprStmt(JS.utilCall('scan', [this.over.compile(context), this.into.compile(context)]));
};



/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile2 = function (sourceCtx, targetCtx) {

    return JS.exprStmt(JS.utilCall('scan', [
        this.over.compile2(sourceCtx, targetCtx),
        this.into.compile2(sourceCtx, targetCtx)
    ]));
};

module.exports = __;