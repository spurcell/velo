/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Combines a context and a construct.
 *
 * Created by seth on 12/25/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const Context = require('./Context');
const Connector = require('./Connector');


var __ = function (parent, connector) {

    Context.call(this, parent);

    this.connector = connector || new Connector();
};

// inheritance
__.prototype = Object.create(Context.prototype);
__.prototype.constructor = Context;


/**
 * Connects the control flow in this context to the parent context.
 */
__.prototype.connect = function (call) {

    if (call) {
        this.connector.setCall(call);
    }
    else {

        var contRef = this.parent.wrapFollowing();
        this.connector.setCall(JS.stmtList(JS.exprStmt(JS.fnCall(contRef, []))));
    }
};


module.exports = __;