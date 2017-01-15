/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
var Context = require('../../codegen/Context');

module.exports["identifiers"] = {

    "normal var": function (test) {

        var node = new Lo.identifier('foo');

        test.deepEqual(node.compile(new Context()).renderTree(),
            ['id', '$foo']);
        test.done();
    },

    "external ID": function (test) {

        var node = new Lo.identifier('foo', 'HTTP');

        var context = new Context({

            resolveExternal: function (name, ref) {
                test.equal(ref, 'HTTP');
                return "M0.foo";
            }
        });

        test.deepEqual(node.compile(context).renderTree(), [ 'subscript',
            [ 'subscript',
                [ 'select', [ 'id', 'module' ], 'deps' ],
                [ 'string', 'HTTP' ] ],
            [ 'string', '$foo' ] ]);
        test.done();
    },

    "external ID with local counterpart": function (test) {

        // should resolve to external, not local def

        var node = new Lo.identifier('foo', 'HTTP');

        var context = new Context({

            has: function () {
                return false;
            },
            
            resolveExternal: function (name, ref) {
                test.equal(ref, 'HTTP');
                return "M0.foo";
            }
        });

        context.define("foo", 42);

        test.deepEqual(node.compile(context).renderTree(), [ 'subscript',
            [ 'subscript',
                [ 'select', [ 'id', 'module' ], 'deps' ],
                [ 'string', 'HTTP' ] ],
            [ 'string', '$foo' ] ]);
        test.done();
    }
};