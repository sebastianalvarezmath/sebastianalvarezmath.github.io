# The music search project

This is a very basic example project of how to use the 
[Spotify Api](https://developer.spotify.com/web-api/) to search
for information about music and show the results on a 
simple angularjs application.

The resulting page is hosted on GitHub pages in the 
URL [http://hsebasa.github.io/](http://hsebasa.github.io).
 

# Installing dependences and starting server

To get started, you must install a recent version of node [nodejs](https://nodejs.org/es/) 
and it's pakage manager [npm](https://www.npmjs.com/). Then you just have to clone this
repository and __start__ the node server by typing the following in a command prompt:
 
```
$ npm start
```

This installs the additional requirements, 'compiles' the project and starts
a local web server listening in the port 8000.
 
# General structure of the project

This is the project tree:

```
Project
 |
 +-- app                           <- Main project folder
 |    +-- build                    <- 'Compiled' version of the project
 |    +-- source                   <- AngularJS application
 |    |     +-- directives         <- AngularJS custom directives
 |    |     +-- filters            <- AngularJS custom filters
 |    |     +-- scss               <- Sass scripts
 |    |     |     +-- phone        <- Sass phone styles
 |    |     |     +-- desktop      <- Sass desktop styles
 |    |     +-- startPage          <- Start page
 |    |     +-- static             <- Static folder copied 'as is' into the build folder
 |    |     +-- templates          <- Aditional templates
 |    |     +-- utils              <- Project utilities
 |    |     +-- app.js             <- Script that defines the angularjs application and scopes
 |    |     +-- index.html         <- Index 
 |    |
 |    +-- tests                    <- Some Jasmine tests
 |
 +-- e2e-tests                     <- Some end-to-end tests
 +-- .bowerrc                      <- Bower config
 +-- bower.json                    <- Bower package config
 +-- gulpfile.js                   <- Gulp tasks
 +-- index.html                    <- Jekyll script that redirects to app/build/
 +-- LICENSE                       <- MIT License
 +-- package.json                  <- Node package manager
 +-- README.md                     <- Readme
 
```

The application is developed in the folder __app/source/__, while
__app/build/__ contains a 'compiled' version of the
source. The _build_ folder is not ignored (it is commited) because
it contains the version to publish on GitHub pages. The __index.html__
contains a simple _Jekyll_ code that redirects to __app/build/__, so 
__app/build/index.html__ can be accessed just typing 
[http://hsebasa.github.io/](http://hsebasa.github.io).

Angular directives and filters are all placed in the folder 
__app/source/directives__ and __app/source/filters__ respectively.
CSS styles are written in [http://sass-lang.com/](http://sass-lang.com/) and
can be found in __app/source/scss__.


# Running the tests

Some unitary tests written in [Jasmine](https://jasmine.github.io/)
can be found in __app/tests__. To run them, just type the following on a command prompt:

```
$ sudo npm start
$ npm test
```

First command is necesary to install required node packages.
