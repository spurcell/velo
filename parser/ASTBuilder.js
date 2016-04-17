/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Created by spurcell on 1/10/16.
 */

const antlr4 = require('antlr4');
const Lexer = require('./exaLexer');
const Parser = require('./exaParser');
const BaseVisitor = require('./exaVisitor').exaVisitor;


var __ = function () {
    BaseVisitor.call(this);
};

__.prototype = Object.create(BaseVisitor.prototype);
__.prototype.constructor = __;

////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.parse = function (input) {

    var chars = new antlr4.InputStream(input);
    var lexer = new Lexer.exaLexer(chars);
    var tokens  = new antlr4.CommonTokenStream(lexer);

    var parser = new Parser.exaParser(tokens);
    parser.buildParseTrees = true;

    var tree = parser.module();
    return this.visit(tree);
};

////////////////////////////////////////////////////////////////////////////////////////////////////

// Visit a parse tree produced by exaParser#module.
__.prototype.visitProgram = function(ctx) {

    return {type: 'module', service: {type: 'procedure', body: ctx.statementList().accept(this)}};
};

// Visit a parse tree produced by exaParser#module.
__.prototype.visitModule = function(ctx) {

    var visitor = this;

    return {
        type: 'module',
        definitions: ctx.definition().map(function (def) {return def.accept(visitor)}),
        references: ctx.references() ? ctx.references().accept(this) : null
    };
};


__.prototype.visitReferences = function(ctx) {

    var refs = [];

    var offset = 0;

    while (ctx.ID(offset)) {

        refs.push({
            id: ctx.ID(offset).getText(),
            ref: ctx.MODREF(offset).getText()
        });

        offset++;
    }

    return refs;
};


// Visit a parse tree produced by exaParser#statementList.
__.prototype.visitStatementList = function(ctx) {

    var subList = ctx.statementList();

    return {type: 'stmt_list', head: ctx.statement().accept(this), tail: subList ? subList.accept(this) : null};
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// statements


// Visit a parse tree produced by exaParser#receive.
__.prototype.visitDefStmt = function(ctx) {

    return ctx.definition().accept(this);
};

__.prototype.visitAdopt = function(ctx) {

    return {
        type: 'adopt',
        name: ctx.STRING().getText()
    };
};

// Visit a parse tree produced by exaParser#receive.
__.prototype.visitReceive = function(ctx) {

    return {
        type: 'receive',
        names: ctx.ID().map(function (token) {return token.getText()})
    };
};


// Visit a parse tree produced by exaParser#assignment.
__.prototype.visitAssignment = function(ctx) {

    return {
        type: 'assign',
        op: ctx.assignment_op().getText(),
        left: ctx.expr(0).accept(this),
        right: ctx.expr(1).accept(this)
    };
};


__.prototype.visitIncDec = function(ctx) {

    return {
        type: ctx.op.text == '++' ? 'increment' : 'decrement',
        operand: ctx.expr().accept(this)
    };
};


__.prototype.visitCondStmt = function(ctx) {

    return ctx.conditional().accept(this);
};


__.prototype.visitIfOnly = function(ctx) {

    return {
        type: 'conditional',
        predicate: ctx.expr().accept(this),
        consequent: ctx.block().accept(this)
    };
};


__.prototype.visitIfElse = function(ctx) {

    return {
        type: 'conditional',
        predicate: ctx.expr().accept(this),
        consequent: ctx.block(0).accept(this),
        alternate: ctx.block(1).accept(this)
    };
};


__.prototype.visitNestedIf = function(ctx) {

    return {
        type: 'conditional',
        predicate: ctx.expr().accept(this),
        consequent: ctx.block().accept(this),
        alternate: ctx.conditional().accept(this)
    };
};


__.prototype.visitExprStmt = function(ctx) {

    return {
        type: 'application_stmt',   // todo should arguably be expr_stmt
        application: ctx.expr().accept(this)
    };
};


__.prototype.visitResponse = function(ctx) {

    return {
        type: 'response',
        channel: ctx.channel.text,
        args: ctx.exprList().accept(this)
    };
};


__.prototype.visitDestructure = function(ctx) {

    return {
        type: 'destructure',
        members: ctx.ID().map(function (token) {return token.getText()})
    };
};


__.prototype.visitSkip = function(ctx) {

    return {type: 'skip'};
};


__.prototype.visitIteration = function(ctx) {

    return {
        type: 'iteration',
        condition: ctx.expr().accept(this),
        statements: ctx.block().accept(this)
    };
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// expressions


__.prototype.visitMulDiv = function(ctx) {

    return {
        type: 'op',
        op: ctx.op.text,
        left: ctx.expr(0).accept(this),
        right: ctx.expr(1).accept(this)
    };
};


__.prototype.visitAddSub = function(ctx) {

    return {
        type: 'op',
        op: ctx.op.text,
        left: ctx.expr(0).accept(this),
        right: ctx.expr(1).accept(this)
    };
};


__.prototype.visitCompare = function(ctx) {

    return {
        type: 'op',
        op: ctx.op.text,
        left: ctx.expr(0).accept(this),
        right: ctx.expr(1).accept(this)
    };
};


__.prototype.visitLogical = function(ctx) {

    return {
        type: 'op',
        op: ctx.op.text,
        left: ctx.expr(0).accept(this),
        right: ctx.expr(1).accept(this)
    };
};


__.prototype.visitWrap = function(ctx) {

    return ctx.expr().accept(this);
};


__.prototype.visitLitExpr = function(ctx) {

    return ctx.literal().accept(this);
};


__.prototype.visitValExpr = function(ctx) {

    return ctx.lvalue().accept(this);
};


// Visit a parse tree produced by exaParser#exprList.
__.prototype.visitExprList = function(ctx) {

    var _this = this;

    return ctx.expr().map(function (item) {
        return item.accept(_this);
    });
};


__.prototype.visitPairList = function(ctx) {

    var pairs = [];

    var offset = 0;

    while (ctx.expr(offset)) {

        pairs.push({
            type: 'dyad',
            key: ctx.expr(offset).accept(this),
            value: ctx.expr(offset + 1).accept(this)
        });

        offset += 2;
    }

    return pairs;
};


__.prototype.visitFieldList = function(ctx) {

    var fields = [];

    var offset = 0;

    while (ctx.ID(offset)) {

        fields.push({
            type: 'field',
            label: ctx.ID(offset).getText(),
            value: ctx.expr(offset).accept(this)
        });

        offset++;
    }

    return fields;
};


__.prototype.visitPair = function(ctx) {

    return {
        type: 'dyad',
        key: ctx.expr(0).accept(this),
        value: ctx.expr(1).accept(this)
    };
};


__.prototype.visitExternalId = function(ctx) {

    return {
        type: "id",
        scope: ctx.ID(0).getText(),
        name: ctx.ID(1).getText()
    };
};


__.prototype.visitId = function(ctx) {

    return {
        type: "id",
        name: ctx.ID().getText()
    };
};


__.prototype.visitConstant = function(ctx) {

    return {type: 'constant', name: ctx.ID().getText(), value: ctx.literal().accept(this) };
};


__.prototype.visitDimension = function(ctx) {

    return {type: 'range', variants: ctx.ID().map(function (token) {return token.getText()}) };
};


__.prototype.visitDynastring = function(ctx) {

    return {type: 'interpolation', left: ctx.INTER_BEGIN().getText(), middle: ctx.interpolated().accept(this), right: ctx.INTER_END().getText()};
};


__.prototype.visitInterpolated = function(ctx) {

    var mid = ctx.INTER_MID();

    if (mid) {
        return {
            type: 'dynastring', // todo change to interpolated
            left: ctx.expr().accept(this),
            middle: mid.getText(),
            right: ctx.interpolated().accept(this)
        };
    }

    return ctx.expr().accept(this);
};


__.prototype.visitCall = function(ctx) {

    var args = ctx.exprList();

    var res = {
        type: 'application',
        address: ctx.expr().accept(this),
        args: args ? args.accept(this) : []
    };

    if (ctx.failHandler()) {
        res.recover = ctx.failHandler().accept(this);
    }

    return res;
};


__.prototype.visitDispatch = function(ctx) {

    var args = ctx.exprList();

    var res = {
        type: 'message',
        address: ctx.expr().accept(this),
        args: args ? args.accept(this) : []
    };

    if (ctx.replyHandler()) {
        res.subsequent = ctx.replyHandler().accept(this);
    }

    if (ctx.failHandler()) {
        res.contingency = ctx.failHandler().accept(this);
    }

    return res;
};


__.prototype.visitReplyHandler = function(ctx) {

    return {
        type: 'handler',
        channel: 'reply',
        params: ctx.paramList() ? ctx.paramList().accept(this) : [],
        body: ctx.block().accept(this)
    };
};


__.prototype.visitFailHandler = function(ctx) {

    return {
        type: 'handler',
        channel: 'fail',
        params: ctx.paramList() ? ctx.paramList().accept(this) : [],
        body: ctx.block().accept(this)
    };
};


__.prototype.visitBlock = function(ctx) {

    var stmtList = ctx.statementList();

    if (stmtList) {
        return stmtList.accept(this);
    }
    else {
        return {type: 'stmt_list', head: {type: 'skip'}, tail: null};
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// literals


// Visit a parse tree produced by exaParser#nil.
__.prototype.visitNil = function(ctx) {
};


// Visit a parse tree produced by exaParser#bool.
__.prototype.visitBool = function(ctx) {

    // ??? might not want to return an actual bool here - number literals are kept as strings
    return {
        type: 'boolean',
        val: ctx.BOOL().getText() == 'true'};
};


// Visit a parse tree produced by exaParser#number.
__.prototype.visitNumber = function(ctx) {

    return {
        type: 'number',
        val: ctx.NUMBER().getText()};
};


// Visit a parse tree produced by exaParser#string.
__.prototype.visitString = function(ctx) {

    return {
        type: 'string',
        val: ctx.STRING().getText()
    };
};


__.prototype.visitModref = function(ctx) {

    return {
        type: 'modref',
        val: ctx.MODREF().getText()
    };
};


__.prototype.visitFrame = function(ctx) {

    if (ctx.exprList()) {

        return {
            type: 'record',
            labels: false,
            fields: ctx.exprList().accept(this)
        };
    }

    if (ctx.fieldList()) {

        return {
            type: 'record',
            labels: true,
            fields: ctx.fieldList().accept(this)
        };
    }

    return {type: 'record', fields: []};
};


__.prototype.visitField = function(ctx) {

    return {
        type: 'field',
        name: ctx.ID().getText(),
        value: ctx.expr().accept(this)
    };
};


__.prototype.visitService = function(ctx) {

    return {
        type: 'service',
        params: ctx.paramList() ? ctx.paramList().accept(this) : [],
        body: ctx.block().accept(this)
    };
};


__.prototype.visitParamList = function(ctx) {

    return ctx.ID().map(function (item) {
        return item.getText();
    });
};


__.prototype.visitMeasure = function(ctx) {

    return {
        type: 'cardinality',
        operand: ctx.expr().accept(this)
    };
};


__.prototype.visitArray = function(ctx) {

    if (ctx.exprList()) {

        return {
            type: 'array',
            elements: ctx.exprList().accept(this)
        };
    }

    return {type: 'array', elements: []};
};

__.prototype.visitSet = function (ctx) {

    if (ctx.exprList()) {

        return {
            type: 'set',
            elements: ctx.exprList().accept(this)
        };
    }

    if (ctx.pairList()) {

        return {
            type: 'map',
            elements: ctx.pairList().accept(this)
        };
    }

    if (ctx.colon) {
        return {type: 'map', elements: []};
    }

    return {type: 'set', elements: []};
};


////////////////////////////////////////////////////////////////////////////////////////////////////


__.prototype.visitSplice = function(ctx) {

    return { type: 'splice', item: ctx.expr(0).accept(this), list: ctx.expr(1).accept(this)};
};


__.prototype.visitSubscript = function(ctx) {

    return {
        type: ctx.cut ? 'extraction' : 'subscript',
        list: ctx.expr(0).accept(this),
        index: ctx.expr(1).accept(this)
    };
};


__.prototype.visitField = function(ctx) {

    return { type: 'select', set: ctx.expr().accept(this), member: ctx.ID().getText()};
};


__.prototype.visitMembership = function(ctx) {

    return {
        type: 'in',
        left: ctx.expr(0).accept(this),
        right: ctx.expr(1).accept(this)
    };
};


__.prototype.visitRange = function(ctx) {

    var start = ctx.expr(1);
    var end = ctx.expr(2);

    var res = {
        type: ctx.cut ? 'extraction' : 'slice',
        list: ctx.expr(0).accept(this)
    };

    if (start) {
        res.start = start.accept(this);
    }

    if (end) {
        res.end = end.accept(this);
    }

    return res;
};


__.prototype.visitExtraction = function(ctx) {

    return { type: 'extraction', list: ctx.expr(0).accept(this), index: ctx.expr(1).accept(this)};
};


__.prototype.visitExcision = function(ctx) {

    var start = ctx.expr(1);
    var end = ctx.expr(2);

    var res = {
        type: 'excision',
        list: ctx.expr(0).accept(this)
    };

    if (start) {
        res.start = start.accept(this);
    }

    if (end) {
        res.end = end.accept(this);
    }

    return res;
};

module.exports = __;