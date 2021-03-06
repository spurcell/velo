/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Packages up an IR procedure, but isn't a control flow node.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./../codegen/JsPrimitives');


class Proc {

    /**
     *
     * @param args
     * @param body
     */
    constructor(args, body) {

        this.args = args;
        this.body = body;
    }

    /**
     */
    getJs (writer) {

        return JS.fnDef(this.args, writer.generateJs(this.body));
    }
}

module.exports = Proc;

