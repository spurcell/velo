/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
var util = require('util');

module.exports["slice"] = {

    "basic slice": function (test) {

        var node = {
            type: 'slice',
            list: {type: 'id', name: 'foo'},
            start: {type: 'number', val: '1'},
            end: {type: 'number', val: '3'},
        };

        test.equal(new Context().compile(node).render(), '$foo.slice(1,3+1)');
        test.done();
    },

    "shorthand slice": function (test) {

        var node = {
            type: 'slice',
            list: {type: 'id', name: 'foo'},
        };

        test.equal(new Context().compile(node).render(), '$foo.slice(0)');
        test.done();
    },

    "reverse indexing slice": function (test) {

        var node = {
            type: 'slice',
            list: {type: 'id', name: 'foo' },
            start: {type: 'number', val: '-3'},
            end: {type: 'number', val: '-1'}
        };

        test.equal(new Context().compile(node).render(), '$foo.slice(-3,-1+1)');
        test.done();
    },

    "basic excision": function (test) {

        var node = {
            type: 'excision',
            list: {type: 'id', name: 'foo'},
            start: {type: 'number', val: '1'},
            end: {type: 'number', val: '3'}
        };

        test.equal(new Context().compile(node).render(), '$foo.splice(1,(3)-(1)+1)');
        test.done();
    },

    "shorthand excision": function (test) {

        var node = {
            type: 'excision',
            list: {type: 'id', name: 'foo'},
            start: {type: 'number', val: '2'}
        };

        test.equal(new Context().compile(node).render(), '$foo.splice(2)');
        test.done();
    },

    "reverse indexing excision": function (test) {

        var node = {
            type: 'excision',
            list: {type: 'id', name: 'foo' },
            start: {type: 'number', val: '-3'},
            end: {type: 'number', val: '-1'}
        };

        test.equal(new Context().compile(node).render(), '$foo.splice($foo.length-3,($foo.length-1)-($foo.length-3)+1)');
        test.done();
    }
};
