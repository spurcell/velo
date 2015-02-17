/**
 * A JS primary expression (literal | identifier) wrapper
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

/**
 *
 * @param expr
 * @param ready
 * @private
 */
var __ = function (expr, ready) {

    this.expr = expr;
    this.ready = ready;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this expression is "ready" (not a promise), false otherwise.
 *
 * @return {boolean}
 */
__.prototype.isReady = function () {
    return this.ready;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the expression in context of the given statement.
 *
 * @param stmt
 * @return {String}
 */
__.prototype.renderExpr = function (stmt) {

    if (stmt === undefined) {
        throw new Error("missing statement context");
    }

    if (typeof this.expr === 'function') {
        return this.expr(stmt);
    }

    return this.expr;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the expression as a standalone statement.
 *
 * @return {String}
 */
__.prototype.renderStmt = function () {

    var self = this;

    var stmt = new JsStmt(function (stmtContext) {
        return self.renderExpr(stmtContext) + ';';
    });

    return stmt.renderStmt();
};

module.exports = __;

var JsStmt = require('./JsStmt');