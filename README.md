Exa is a message-oriented programming language designed to make building secure, scalable software simple. This is an implementation of Exa as a transpiler to JavaScript.

To learn about the Exa language, see the [docs](docs).

The exa "binary" is a load-and-go compilier, but you can also use it to generate Node.js executables. Modules are parsed and compiled when loaded.

#### Installation

Clone the repo then in the project root folder do:

    $ npm link -g

#### To run an Exa program

    $ exa <source file>

This will compile the Exa source, load it, and run.

#### To build a Node executable

    $ exa --build <target file> <source file>

#### To run the examples

	$ cd examples
	$ exa factorial.exa 10
	3628800
	
etc.

#### To run the tests 

In the project root folder:

    $ npm test

# How it Works

#### Parsing

Scanning and parsing are handled by a parser generated by Jison.

#### Code Generation

The compiler generates JavaScript source from the AST bottom-up by snapping together chunks of JS wrapped in the following classes:

**JsConstruct**: base class for holding chunks of JS; expands helper objects such as argument lists and resolves SyncMessages when required

**SyncMessage**: models a synchronous message by wrapping supplied code in a Message

#### Runtime

The Exa runtime provides the implementation of the Exa Task tree as well as the module loader, which pulls in the parser/compiler.