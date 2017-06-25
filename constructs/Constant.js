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
const ModuleRef = require('./ModuleRef');

/**
 * A constant definition
 */
var __ = function (name, value) {

    this.name = name;
    this.value = value;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'constant',
        name: this.name,
        value: this.value.getAst()
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'def',
        this.name,
        this.value.getTree()
    ];
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    var value = this.value.compile(context);

    if (this.value instanceof ModuleRef) {

        console.log('defining', this.name);

        context.define(this.name, value, true);
        return JS.NOOP;
    }

    // register with the symbol table
    context.define(this.name, value);

    return JS.constDecl('$' + this.name, value);
};

module.exports = __;