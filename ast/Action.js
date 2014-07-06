/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
var __ = function (args, statements) {

    this.args = args;
    this.statements = statements;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An action maps onto a JS function that takes a message.
 */
__.prototype.toJavaScript = function (context) {

    return "function (" + args + ") {" + "}";
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {

    return {
        "action": this.args,
        "statements": this.statements
    };
};

module.exports = __;