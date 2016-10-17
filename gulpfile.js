var gulp            = require( 'gulp' );
var fs              = require( 'fs' );
var browserify      = require( 'browserify' );
var babelify        = require( 'babelify' );
var uglify          = require( 'gulp-uglify' );
var header          = require( 'gulp-header' );

var _package        = require( './package.json' );

var now             = new Date();
var year            = now.getUTCFullYear();

var licenceLong     = `/*!\n
                        * Flounder React JavaScript Stylable Selectbox v${_package.version}
                        * ${_package.homepage}
                        *
                        * Copyright 2015-${year} Sociomantic Labs and other contributors
                        * Released under the MIT license
                        * https://github.com/sociomantic-tsunami/flounder-react/license
                        *
                        * Date: ${now.toDateString()}
                        *
                        * "This, so far, is the best React Flounder ever"
                        */`;


gulp.task( 'addLiscence', function()
{
    gulp.src( './src/flounder.react.jsx' )
        .pipe( header( licenceLong ) )
        .pipe( gulp.dest( './dist/' ) );
} );


gulp.task( 'buildTests', function()
{
    browserify( './tests/tests.js' )
        .transform( babelify )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/tests/tests.dist.js' ) )
} );


gulp.task( 'demo', function()
{
    browserify( './demo/demo.js' )
        .transform( babelify )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/demo/demoDist.js' ) );
} );


gulp.task( 'default', [], function()
{
    gulp.start( [ 'addLiscence', 'demo', 'buildTests' ] );
} );