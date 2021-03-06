/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";

var fs = require('fs');
var path = require('path');
var Parser = require('../../parser/Parser');


var EXT = '.lo';

// go through the tests directory and generate a test for each file
var files = fs.readdirSync(__dirname + '/inputs');

files.forEach(function (filename) {

    if (path.extname(filename) !== EXT) {
        return;
    }

    var name = path.basename(filename, EXT);

    module.exports[name] = function (test) {

        var source = fs.readFileSync(__dirname + '/inputs/' + filename, 'utf8');
        var expected = fs.readFileSync(__dirname + '/outputs/' + name + '.json', 'utf8');
        var result = new Parser().parse(source).getAst();


        var treeToString = function (tree) {

            if (typeof tree === 'undefined') {
                return '()';
            }

            if (tree === null) {
                return 'null';
            }


            if (typeof tree === 'number' || typeof tree === 'boolean' || typeof tree === 'string') {
                return tree;
            }

            if (tree[0] === 'string') {
                return '"' + tree[1] + '"';
            }

            return "(" +
                    tree.map(item => treeToString(item)).join(' ') +
                ")";
        };

        //console.log(treeToString(parser.parse(source).getTree()));

        // we shouldn't have to stringify both of these but if we don't, we get a test fail
        test.deepEqual(JSON.stringify(result), JSON.stringify(JSON.parse(expected)));
        test.done();
    };
});

// commented this chunk out and threw the tests away because they were all really obsolete
// and they would put the parser in a bad state such that when it went to parse a correct program in RunTest it would fail
// go through the errors directory and make sure they all fail
//var errorFiles = fs.readdirSync(__dirname + '/errors');
//
//errorFiles.forEach(function (filename) {
//
//    if (path.extname(filename) !== EXT) {
//        return;
//    }
//
//    var name = path.basename(filename, EXT);
//
//    module.exports['error - ' + name] = function (test) {
//
//        var source = fs.readFileSync(__dirname + '/errors/' + filename, 'utf8');
//
//        test.throws(function () {
//            var result = parser.parse(source);
//            console.log(JSON.stringify(result));
//        });
//
//        test.done();
//    };
//});