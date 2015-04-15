/**
 * compiles and runs simple programs to test the compiler
 *
 * could alternatively load a bunch of modules in at the top and then just hit them in tests
 * or have sets of expected input -> expected output mappings and automate it
 *
 * Created by: spurcell
 * 12/24/14
 */

"use strict";

var Loader = require('../../loader/Loader');
var Harness = require('../Harness');
var Q = require('q');
var util = require('util');

var loader = new Loader(__dirname);

module.exports['attach'] = {

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'attach');

        this.harness.setUp(cb);
    },

    'success': function (test) {

//        console.log(util.inspect(this.harness.getJs(), {depth: null, colors: true}));
//        console.log(this.harness.getJs().render(true));
        this.harness.testSuccess(test, [], 120);
    },

//    'failure': function (test) {
//        this.harness.testFailure(test, [-1], 'I pity the fool!');
//    }
};

//module.exports['errors'] = {
//
//    "setUp": function (cb) {
//
//        this.harness = new Harness(loader, 'errors');
//
//        this.harness.setUp(cb);
//    },
//
//    'success': function (test) {
//
////        console.log(util.inspect(this.harness.getJs(), {depth: null, colors: true}));
//        console.log(this.harness.getJs().render(true));
//        this.harness.testSuccess(test, [], 14);
//    }
//};

module.exports['deps'] = {

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'deps');

        this.harness.setUp(cb);
    },

    'success': function (test) {
        this.harness.testSuccess(test, [], 14);
    }
};

module.exports['conditionals'] = {

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'conditionals');

        this.harness.setUp(cb);
    },

    'neg': function (test) {
        this.harness.testSuccess(test, [-1], 'negative');
    },

    'zero': function (test) {
        this.harness.testSuccess(test, [0], 'zero!');
    },

    'pos': function (test) {
        this.harness.testSuccess(test, [1], 'positive');
    }
};

module.exports['factorial'] = {

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'factorial');

        this.harness.setUp(cb);
    },

    'success': function (test) {
        this.harness.testSuccess(test, [10], 3628800);
    },

    'failure': function (test) {
        this.harness.testFailure(test, [-1], 'I pity the fool!');
    }
};

module.exports['fibonacci'] = {

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'fibonacci');

        this.harness.setUp(cb);
    },

    'success': function (test) {
        this.harness.testSuccess(test, [10], 55);
    },

    'failure': function (test) {
        this.harness.testFailure(test, [-1], 'Whatsamatta, you?');
    }
};

module.exports['collections'] = {

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'collections');

        this.harness.setUp(cb);
    },

    'all': function (test) {

        this.harness.testSuccess(test);
    }
};

//module.exports['factorial2'] = {
//
//    "setUp": function (cb) {
//
//        this.harness = new Harness(loader, 'factorial2');
//
//        this.harness.setUp(cb);
//    },
//
//    'success': function (test) {
//
//        this.harness.testSuccess(test, 10, 3628800);
//    },
//
//    'failure': function (test) {
//
//        this.harness.testFailure(test, -1, "I pity the fool!");
//    }
//};
//
//module.exports['fibonacci2'] = {
//
//    "setUp": function (cb) {
//
//        this.harness = new Harness(loader, 'fibonacci2');
//
//        this.harness.setUp(cb);
//    },
//
//    'success': function (test) {
//
//        this.harness.testSuccess(test, 10, 55);
//    },
//
//    'failure': function (test) {
//
//        this.harness.testFailure(test, -1, "Whatsamatta, you?");
//    }
//};

module.exports['procedure'] = {

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'procedure');

        this.harness.setUp(cb);
    },

    'success': function (test) {

        this.harness.testSuccess(test, [], 60);
    }
};