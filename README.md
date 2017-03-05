
![Wright brothers bicycle](vancleve.png "Wright brothers bicycle")

## A Lo-to-JavaScript compiler, written in Node.js [![Build Status](https://travis-ci.org/lo-language/velo.svg?branch=master)](https://travis-ci.org/lo-language/velo)

This is a proof-of-concept compiler for the [Lo programming language](http://lolang.org). It can operate as a load-and-go compiler to seamlessly compile, load, and run a Lo program within a Node environment, or be used to build statically-linked JavaScript files for execution in Node or a browser.

## Installation

Clone the repo then in the project root folder do:

    $ npm install -g
    
#### To run the test suite

In the project root folder:

    $ npm test
    
## Usage

#### To compile and run a program

    $ velo run <root module>

The root module of a Lo program must define a `main` service that takes two arguments: `args` and `system`, for example:

    main is <-> (args, system) {
    
        system.out("Hello, world!");
    };

The first argument is the array of strings provided on the command line after the root module name (arguments before the root module name are handled by Velo). The second argument is the [system API](system.md) object, which contains all the authority available to the program.

#### To build a statically-linked Node.js executable

    $ velo build <root module>

## Module Bindings

Velo provides several built-in module namespaces.
You can see the complete list [here](builtins.md).

### JavaScript Built-In Objects

Velo maps the various JavaScript built-in objects to modules under the `JS` namespace, but omits any calls that depend on ambient authority, such as Math.random().

For example, this program uses the `Math` built-in object.

    main is <-> (args, system) {
    
        system.out(JS::Math.E);
    };

### Node.js Core Modules

The Node.js core modules that don't require ambient authority can be referenced using the `Node` namespace.

    main is <-> (args, system) {
    
        system.out(Node::querystring);
    };

### NPM Modules

Arbitrary NPM modules that don't require ambient authority can be linked in using the `NPM` namespace.

    main is <-> (args, system) {
    
        system.out(NPM::HTTP);
    };
    
### Browser Objects

TBD

## Virtual Environments

Since many Node modules depend on the ambient authority that Lo expressly doesn't provide, they can't be loaded and used in Velo programs. To use these modules, they must be loaded in a context where the ambient authority they require exists, and Velo has a facility to provide this called "virtual environments". This is a similar concept to a virtual machine – an execution context that authority can be loaded into.

    main is <-> (args, system) {
    
        nodeEnv is Velo::NodeEnv.create(system);
        
        // equivalent to const http = require('http');
        http is nodeEnv.load("http");
        
        // http now has the authority provided to its VE
    };

## Implementation

#### Parsing

Scanning and parsing are handled by a parser generated by ANTLR; a Lo AST is constructed and handed to the backend.

#### Code Generation

Each node in the Lo AST compiles itself to a JavaScript AST which is then rendered into JavaScript. By default the compiler will cache compiled modules on disk (like a built-in make).

#### Runtime

The runtime consists of Task.js, which implements the Lo task tree.

## License

Copyright (c) Seth Purcell

Licensed under Apache License v2.0 with Runtime Library Exception

See LICENSE.txt in the project root for license information.