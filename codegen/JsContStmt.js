/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Don't dream it -- be it. (RHPS)
 *
 =============================================================================*/

/**
 * A node in the JS control flow.
 * Models control flow in the target language as a digraph.
 * Basic flow is supported as a doubly-linked list.
 * Branching statements are captured as child nodes.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./JsPrimitives');

/**
 *
 * @param name
 */
var __ = function (name) {

    this.prev = null;   // previous statement node
    this.next = null;   // next stmt node

    this.name = name;
};


/**
 * Returns true if this statement list is intact (not interrupted by an async call).
 */
__.prototype.isIntact = function () {
    return false;
};


/**
 * Sets the next statement node to the given node.
 *
 * @param next  ControlFlowNode to follow this one
 */
__.prototype.setNext = function (next) {

    this.next = next;
    next.prev = this;

    return next;
};


/**
 * Adds a terminal statement.
 *
 * @param stmt
 */
__.prototype.append = function (stmt) {

    // todo enforce we can't add to a terminal

    if (this.next) {
        return this.next.append(stmt);
    }

    this.next = stmt;
};


/**
 */
__.prototype._getStmt = function () {

    return JS.stmtList(JS.exprStmt(JS.fnCall(JS.fnDef([], this.next, this.name), [])));
};


/**
 */
__.prototype.renderTree = function () {

    return this._getStmt().renderTree();
};


/**
 */
__.prototype.renderJs = function () {

    return this._getStmt().renderJs();
};


// without inheritance, we can't call pushrequest in here? how's it working, then?
// we're always calling pushreq on the wrapped stmt, dummy!


module.exports = __;
