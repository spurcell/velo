/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/


/**
 * Created by spurcell on 7/23/16.
 */

/**
 * Primitives for building JS ASTs
 */

// should we have an exaID part that prepends '$' to names?

const JS = {};

JS.NOOP = {

    renderTree: () => ['no-op'],
    renderJs: () => ''
};

JS.NULL = {

    renderTree: () => ['null'],
    renderJs: () => 'null'
};

// todo make this a stmt
JS.USE_STRICT = {

    renderTree: () => ['use-strict'],
    renderJs: () => "'use strict';\n"
};

JS.ID = (name) => {

    return {
        renderTree: () => ['id', name],
        getResolved: function () {return this;},
        renderJs: () => name
    };
};

JS.bool = (val) => {

    return {
        renderTree: () => ['bool', val],
        renderJs: () => val
    };
};

JS.num = (val) => {

    return {
        renderTree: () => ['num', val],
        renderJs: () => val
    };
};

JS.string = (val) => {

    return {
        renderTree: () => ['string', val],
        renderJs: () => "'" + val.replace(/'/g, "\\'") + "'"
    };
};

JS.arrayLiteral = (exprs) => {

    return {
        renderTree: () => ['arrayLiteral', exprs.map(expr => expr.renderTree())],
        renderJs: () => '[' + exprs.map(expr => expr.renderJs()).join(', ') + ']'
    };
};

JS.objLiteral = (pairs) => {

    return {
        renderTree: () => ['objLiteral', pairs.map(pair => [pair[0].renderTree(), pair[1].renderTree()])],
        renderJs: () => '{' + pairs.map(pair => pair[0].renderJs() + ': ' + pair[1].renderJs()).join(',') + '}'
    };
};

JS.varDecl = (name, value) => {

    return {
        renderTree: () => value ? ['var', name, value.renderTree()] : ['var', name],
        renderJs: () => 'var ' + name + (value ? ' = ' + value.renderJs() : '') + ';'
    };
};

JS.varDeclMulti = (names) => {

    return {
        renderTree: () => ['var', names.length == 1 ? names[0] : names],
        renderJs: () => 'var ' + names.join(', ') + ';'
    };
};

JS.letDecl = (name, value) => {

    return {
        renderTree: () => value ? ['let', name, value.renderTree()] : ['let', name],
        renderJs: () => 'let ' + name + (value ? ' = ' + value.renderJs() : '') + ';'
    };
};

JS.constDecl = (name, value) => {

    return {
        renderTree: () => ['const', name, value.renderTree()],
        renderJs: () => 'const ' + name + ' = ' + value.renderJs() + ';'
    };
};

JS.subscript = (array, index) => {

    return {
        renderTree: () => ['subscript', array.renderTree(), index.renderTree()],
        renderJs: () => array.renderJs() + '[' + index.renderJs() + ']'
    };
};

JS.select = (obj, property) => {

    return {
        renderTree: () => ['select', obj.renderTree(), property],
        renderJs: () => obj.renderJs() + '.' + property
    };
};

JS.logicalAnd = (left, right) => {

    return {
        renderTree: () => ['&&', left.renderTree(), right.renderTree()],
        renderJs: () => left.renderJs() + ' && ' + right.renderJs()
    };
};

JS.logicalOr = (left, right) => {

    return {
        renderTree: () => ['||', left.renderTree(), right.renderTree()],
        renderJs: () => left.renderJs() + ' || ' + right.renderJs()
    };
};

JS.strictEqual = (left, right) => {

    return {
        renderTree: () => ['strict-eq', left.renderTree(), right.renderTree()],
        renderJs: () => '(' + left.renderJs() + ' === ' + right.renderJs() + ')'
    };
};

JS.notEqual = (left, right) => {

    return {
        renderTree: () => ['ne', left.renderTree(), right.renderTree()],
        renderJs: () => '(' + left.renderJs() + ' != ' + right.renderJs() + ')'
    };
};

JS.strictNotEqual = (left, right) => {

    return {
        renderTree: () => ['strict-ne', left.renderTree(), right.renderTree()],
        renderJs: () => '(' + left.renderJs() + ' !== ' + right.renderJs() + ')'
    };
};

JS.lt = (left, right) => {

    return {
        renderTree: () => ['lt', left.renderTree(), right.renderTree()],
        renderJs: () => '(' + left.renderJs() + ' < ' + right.renderJs() + ')'
    };
};

JS.gt = (left, right) => {

    return {
        renderTree: () => ['gt', left.renderTree(), right.renderTree()],
        renderJs: () => '(' + left.renderJs() + ' > ' + right.renderJs() + ')'
    };
};

JS.lte = (left, right) => {

    return {
        renderTree: () => ['lte', left.renderTree(), right.renderTree()],
        renderJs: () => '(' + left.renderJs() + ' <= ' + right.renderJs() + ')'
    };
};

JS.gte = (left, right) => {

    return {
        renderTree: () => ['gte', left.renderTree(), right.renderTree()],
        renderJs: () => '(' + left.renderJs() + ' >= ' + right.renderJs() + ')'
    };
};

JS.typeof = (left) => {

    return {
        renderTree: () => ['typeof', left.renderTree()],
        renderJs: () => 'typeof ' + left.renderJs()
    };
};

JS.condExpr = (predicate, consequent, alt) => {

    return {
        renderTree: () => ['cond-expr', predicate.renderTree(), consequent.renderTree(), alt.renderTree()],
        renderJs: () => '(' + predicate.renderJs() + '?' + consequent.renderJs() + ':' + alt.renderJs() + ')'
    }
};

JS.add = (left, right) => {

    return {
        renderTree: () => ['add', left.renderTree(), right.renderTree()],
        renderJs: () => '(' + left.renderJs() + ' + ' + right.renderJs() + ')'
    };
};

JS.sub = (left, right) => {

    return {
        renderTree: () => ['sub', left.renderTree(), right.renderTree()],
        renderJs: () => '(' + left.renderJs() + ' - ' + right.renderJs() + ')'
    };
};

JS.mul = (left, right) => {

    return {
        renderTree: () => ['mul', left.renderTree(), right.renderTree()],
        renderJs: () => '(' + left.renderJs() + ' * ' + right.renderJs() + ')'
    };
};

JS.div = (left, right) => {

    return {
        renderTree: () => ['div', left.renderTree(), right.renderTree()],
        renderJs: () => '(' + left.renderJs() + ' / ' + right.renderJs() + ')'
    };
};

JS.mod = (left, right) => {

    return {
        renderTree: () => ['mod', left.renderTree(), right.renderTree()],
        renderJs: () => '(' + left.renderJs() + ' % ' + right.renderJs() + ')'
    };
};

JS.inc = (expr) => {

    return {
        renderTree: () => ['inc', expr.renderTree()],
        renderJs: () => expr.renderJs() + '++'
    };
};

JS.dec = (expr) => {

    return {
        renderTree: () => ['dec', expr.renderTree()],
        renderJs: () => expr.renderJs() + '--'
    };
};

JS.not = (expr) => {

    return {
        renderTree: () => ['not', expr.renderTree()],
        renderJs: () => '(!' + expr.renderJs() + ')'
    };
};

JS.exprStmt = (expr) => {

    return {
        renderTree: () => ['expr-stmt', expr.renderTree()],
        renderJs: () =>  expr.renderJs() + ';'
    };
};

JS.assign = (lvalue, rvalue, op) => {

    return {
        renderTree: () => ['assign', lvalue.renderTree(), rvalue.renderTree()].concat(op ? [op] : []),
        renderJs: () =>  lvalue.renderJs() + ' ' + (op ? op : '=') + ' ' + rvalue.renderJs()
    };
};

JS.fnCall = (fnExpr, args) => {

    var wrap = false;

    if (args == null) {
        throw new Error("invalid JS: null args array");
    }

    args.forEach((arg, idx) => {

        if (arg == null) {
            throw new Error("invalid JS: null arg " + idx + " to fn:" + fnExpr.renderJs());
        }

    });

    // see: http://benalman.com/news/2010/11/immediately-invoked-function-expression/
    if (fnExpr.isFnDef) {
        wrap = true;
    }

    return {
        renderTree: () => ['call', fnExpr.renderTree(), args.map(arg => arg.renderTree())],
        renderJs: () => (wrap ? '(' : '') + fnExpr.renderJs() + '(' + args.map(arg => arg.renderJs()).join(', ') + ')' + (wrap ? ')' : '')
    };
};

JS.fnDef = (params, body, name) => {

    return {
        isFnDef: true,
        renderTree: () => ['function', name || null, params, body.renderTree()],
        renderJs: () => 'function ' + (name ? name + ' ' : '') + '(' + params.join(', ') + ') {\n\n' + body.renderJs() + '}'
    };
};

JS.stmtList = (head, tail) => {

    return {

        renderTree: function () {

            if (head == null) {
                return [ 'stmtList' ];
            }

            try {
                var tailTree = tail ? tail.renderTree() : null;
            }
            catch (e) {
                tailTree = ['ERROR RENDERING TAIL', e.stack];
            }

            try {
                var headTree = head.renderTree();
            }
            catch (e) {
                headTree = ['ERROR RENDERING HEAD: ' + e.message, e.stack];
            }

            return tailTree ? ['stmtList', headTree, tailTree] : ['stmtList', headTree];
        },

        renderJs: function () {

            if (head == null) {
                return '';
            }

            try {
                var tailJs = tail ? tail.renderJs() : null;
            }
            catch (e) {
                tailJs = 'ERROR RENDERING TAIL';
            }

            try {
                var headJs = head.renderJs();
            }
            catch (e) {
                headJs = 'ERROR RENDERING HEAD: ' + e.message;
            }

            return headJs + '\n' + (tailJs || '');
        },

        // should this take a stmt instead?
        // attach: function (stmtList) {
        //
        //     if (tail) {
        //         tail.attach(stmtList);
        //         return;
        //     }
        //
        //     tail = stmtList;
        // }
    };
};

JS.return = (expr) => {

    return {
        renderTree: () => expr ? ['return', expr.renderTree()] : ['return'],
        renderJs: () => 'return' + (expr ? ' ' + expr.renderJs() : '') + ';'
    };
};

JS.cond = (predicate, consequent, alt) => {

    return {
        renderTree: () => ['if', predicate.renderTree(), consequent.renderTree()].concat(alt ? [alt.renderTree()] : []),
        renderJs: () => 'if (' + predicate.renderJs() + ') {\n' + consequent.renderJs() + '}' +
        (alt ? ' else {\n' + alt.renderJs() + '}' : '')
    };
};

JS.while = (condition, body) => {

    return {
        renderTree: () => ['while', condition.renderTree(), body.renderTree()],
        renderJs: () => 'while (' + condition.renderJs() + ') {\n' + body.renderJs() + '\n}'
    };
};

JS.new = (name, args) => {

    return {
        renderTree: () => ['new', name, args.map(arg => arg.renderTree())],
        renderJs: () => 'new ' + name + '(' + args.map(arg => arg.renderJs()).join(', ') + ')'
    };
};

// not-quite-primitives; arguably these are a form of IR

JS.runtimeCall = (fnName, args) => {

    return JS.fnCall(
        JS.select(JS.ID('task'), fnName), args);
};

JS.utilCall = (fnName, args) => {

    return JS.fnCall(
        JS.select(JS.ID('Util'), fnName), args);
};


module.exports = JS;
