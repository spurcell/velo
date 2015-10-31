"use strict";

var parser = require('./../parser/Parser');
var Compiler = require('./../codegen/Compiler');
var Request = require('./../runtime/Request');
var Q = require('q');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param source
 * @param loader
 * @private
 */
var __ = function (source, loader) {

    this.source = source;
    this.loader = loader;

    // will be called from within exa, which means with args of (recur, args) and object context of a request

    this.acquire = function (recur, args) {

        console.log('schmoopy');
        this.reply();
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {*}
 */
__.prototype.parse = function () {

    if (this.ast === undefined) {
        this.ast = parser.parse(this.source);
    }

    return this.ast;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {String}
 */
__.prototype.getJs = function () {

    if (this.js === undefined) {

        try {
            this.js = Compiler.compile(this.parse()).render();
        }
        catch (e) {
            console.error(e);
        }
    }

    return this.js;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loads the compiled code to be executed - NOT as a closure. This doesn't leak the local scope, but doesn't hide
 * globals, either. But name wrapping should make the globals unaddressable - unlless there's one that starts with $_.
 *
 * @return {Function}
 */
__.prototype.load = function () {

    if (this.procedure === undefined) {

        // enable strict mode and wrap the compiled result so we can use it with the Function constructor,
        // but keep the same sig as what we're wrapping

        // todo - how do we want to interface between our internal procedure style and JS?

        var body =
            '"use strict";\n\n' +
            'var root = ' + this.getJs() + ';\n\n' +
            'root.call(this, root, rootArgs);\n';

        // prepare a function with the same signature as a standard procedure so it can be returned from acquire

        this.procedure = new Function('ignored, rootArgs', body);
    }

    return this.procedure;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Runs the program, passing in the arguments we're given, returning a promise for the result.
 * Note that this is only called on the 'main' module for a program! All other modules are called
 * from this module, directly or indirectly.
 *
 * @param args  arguments array to pass into the procedure
 * @return {promise}
 */
__.prototype.run = function (args) {

    if (this.procedure === undefined) {
        this.load();
    }

    var d = Q.defer();

    Request.sendRootRequest(this.procedure, args, d.resolve.bind(d), d.reject.bind(d));

    return d.promise;
};

module.exports = __;