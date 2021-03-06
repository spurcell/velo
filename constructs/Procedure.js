/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * To be a man is to be responsible: to be ashamed of miseries you did not cause;
 * to be proud of your comrades' victories; to be aware, when setting one stone,
 * that you are building a world.
 =============================================================================*/

"use strict";

const JS            = require('../codegen/JsPrimitives');
const Proc          = require('../compiler/Proc');
const CFNode        = require('../compiler/CFNode');
const TerminalNode  = require('../compiler/TerminalNode');
const ServiceType   = require('../compiler/ServiceType');
const Response      = require('../constructs/Response');
const JsWriter      = require('../codegen/JsWriter');
const Connector     = require('../codegen/Connector');
const LoConstruct   = require('./LoConstruct');


class Procedure extends LoConstruct {

    /**
     * A procedure definition
     *
     * @param params
     * @param {CFNode} body
     * @param isService
     */
    constructor(params, body, isService) {

        super();
        this.params = params;
        this.body = body;
        this.isService = isService || false; // nice hack! thanks!

        // hmmm, i don't think we'll know the service type until we analyze the service
        this.type = new ServiceType('foo', 'null', 'null');
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'procedure',
            params: this.params,
            body: this.body ? this.body.getAst() : null,
            isService: this.isService
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'procedure',
            this.params,
            this.body ? this.body.getTree() : null,
            this.isService
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     */
    compile(sourceCtx) {

        // push a new context onto the scope stack
        var localCtx = sourceCtx.createInner(this.isService);

        // load params into its symbol table
        this.params.forEach(name => localCtx.declare(name));

        // define the task object: var task = new Task();
        var firstStmt = this.isService ?
            new CFNode(JS.varDecl('task', JS.new('Task', [JS.ID('succ'), JS.ID('fail')]))) :
            new CFNode();

        var lastStmt = firstStmt;

        // compile the statement(s) in the context of the local scope;
        // this will also populate our symbol table
        var body = this.body.compile(localCtx);

        // declare our local vars
        var localVars = localCtx.getJsVars();

        if (localVars.length > 0) {
            lastStmt = lastStmt.setNext(new CFNode(JS.varDeclMulti(localVars)));
        }

        // bind values to our params
        // todo unpacking args like this might be a significant runtime perf hit
        this.params.forEach((param, idx) => {
            lastStmt = lastStmt.setNext(
                new CFNode(JS.exprStmt(JS.assign(JS.ID('$' + this.params[idx]), JS.subscript(JS.ID('args'), JS.num(String(idx)))))));
        });

        if (this.isService) {

            // implement auto-reply: if a service doesn't explicitly respond, it should reply <empty>
            body.append(new TerminalNode(
                new Connector(
                    JS.fnCall(JS.select(JS.select(JS.ID('task'), 'autoReply'), 'bind'), [JS.ID('task')]),
                    JS.stmtList(JS.exprStmt(JS.fnCall(JS.select(JS.ID('task'), 'autoReply'), []))))));
        }

        // connect the body
        lastStmt.setNext(body);

        // todo this is pretty ugly
        // we're compensating for procedure doing double-duty as both a standalone service
        // and as a handler, which may need to be joined into main control flow. in the former
        // case we can render down to JS now, in the latter we must defer it to codegen time
        return this.isService ?
            JS.fnDef(['args', 'succ', 'fail'], new JsWriter().generateJs(firstStmt)) :
            new Proc(['args'], firstStmt);
    }
}


module.exports = Procedure;