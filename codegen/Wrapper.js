/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * A special kind of statement list that wraps its following statements in a
 * callback.
 *
 * Created by seth on 12/17/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');


var __ = function (req, tail) {

    this.req = req;
    this.tail = tail;
};


__.prototype._render = function () {

    // renders to a stmtlist of a single statement

    return JS.stmtList(
        JS.exprStmt(
            JS.runtimeCall('sendMessage', [
                this.req.target, JS.arrayLiteral(this.req.args),
                JS.fnDef([this.req.paramName], this.tail),
                JS.NULL
            ])),
        null);
};


/**
 *
 */
__.prototype.renderTree = function () {

    return this._render().renderTree();
};


/**
 *
 */
__.prototype.renderJs = function () {

    return this._render().renderJs();
};


/**
 * Appends the given statement list to the end of this statement list
 * (if it's not terminated). This is a mutating call.
 *
 * @param stmtList
 */
__.prototype.append = function (stmtList) {

    if (this.tail) {
        this.tail.append(stmtList);
        return;
    }

    this.tail = stmtList;
};

module.exports = __;