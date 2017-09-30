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
 * An set literal
 *
 * @param elements
 */
var __ = function (elements) {

    this.elements = elements;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'set',
        elements: this.elements.map(elem => elem.getAst())
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return ['set-literal'].concat(
        this.elements.map(elem => elem.getTree()));
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    var elements = this.elements.map(item => {
        return [item.compile(context), JS.bool(true)];
    });

    // tag this object as a Lo set
    // we can get away with this because Object.defineProperty returns the object we give it :-)

    return JS.fnCall(
        JS.select(JS.ID('Object'), 'defineProperty'), [
        JS.objLiteral(elements),
        JS.string("__LO_SET"),
        JS.objLiteral([
            [JS.ID('value'), JS.bool("true")]
        ])
    ]);
};



/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile2 = function (sourceCtx, targetCtx) {

    var elements = this.elements.map(item => {
        return [item.compile2(sourceCtx, targetCtx), JS.bool(true)];
    });

    // tag this object as a Lo set
    // we can get away with this because Object.defineProperty returns the object we give it :-)

    return JS.fnCall(
        JS.select(JS.ID('Object'), 'defineProperty'), [
            JS.objLiteral(elements),
            JS.string("__LO_SET"),
            JS.objLiteral([
                [JS.ID('value'), JS.bool("true")]
            ])
        ]);
};

module.exports = __;