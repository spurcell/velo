/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const JsStmt = require('../codegen/JsStmt');
const Request = require('../codegen/Request');
const Identifier = require('./Identifier');


/**
 * A "function call" (request) expression
 *
 * @param address
 * @param args
 * @param async
 */
var __ = function (address, args, async) {

    this.address = address;
    this.args = args;
    this.async = async || false;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: this.async ? 'future' : 'application',
        address: this.address.getAst(),
        args: this.args.map(arg => arg.getAst())
    };
};

/**
 * Compiles this node to JS in the given context.
 * The context needs to be a statement context in this case.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    var target = this.address.compile(context);

    var args = this.args.map(arg => {
        return arg.compile(context);
    });

    // get a placeholder
    // we push a request into the context whether sync or async
    return context.pushBlockingCall(new Request(target, args, null, null, this.async));
};

module.exports = __;