/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Models an Exa program, which is mostly a collection of modules and an address space for services.
 * Also supplies our load-and-go behavior by loading compiled code into the current JS sourcerironment.
 *
 * Author: Seth Purcell
 * Date: 5/28/16
 */

'use strict';

const Task = require('../runtime/Task');
const Q = require('q');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Constructor
 */
var __ = function (sourcer, baseModule) {

    this.sourcer = sourcer;
    this.baseModule = baseModule;
    this.nextModule = 0;
    this.modules = {};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Incorporates the specified module into this program.
 *
 * @param modRef    module reference
 * @returns         promise for a module ID
 */
__.prototype.include = function (modRef) {

    // todo check module cache here!

    return this.sourcer.acquire(modRef).then(module => {

        // module ID is its index in our list
        module.id = 'M' + this.nextModule++;

        return module.compileSelf(this).then(result => {

            // stash the module in our cache
            this.modules[module.id] = result;

            return module;
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compiles the program, starting with the base module.
 *
 * Should this return a built program, instead of just modifying this object's state?
 */
__.prototype.compile = function () {

    return this.include(this.baseModule);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Builds this program to its environment.
 */
__.prototype.build = function () {

};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Builds the program target code.
 *
 * @returns {string}
 */
__.prototype.render = function () {

    // render each module in the program

    return Object.keys(this.modules).map(moduleId => {

        // todo put the const name in as the fn name for JS
        return "const " + moduleId + " = " + this.modules[moduleId].renderJs() + "();";
    }
    ).join("\n\n");
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loads and runs this program.
 */
__.prototype.run = function (args) {

    var body =
        "'use strict';\n\n" +
        this.render() +
        '\n\nM0["main"](rootTask);\n\n';

    try {
        var main = new Function("rootTask", body);

        console.log(body);

        var d = Q.defer();

        Task.sendRootRequest(main, args, d.resolve.bind(d), d.reject.bind(d));

        return d.promise;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = __;