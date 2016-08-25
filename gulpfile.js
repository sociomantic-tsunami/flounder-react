var gulp            = require( 'gulp' );
var fs              = require( 'fs' );
const browserify    = require( 'browserify' );
const babelify      = require( 'babelify' );
const uglify        = require( 'gulp-uglify' );
const header        = require( 'gulp-header' );

const _package      = require( './package.json' );

const now             = new Date();
const year            = now.getUTCFullYear();

const licenceLong     = `/*!
                        * Flounder React JavaScript Stylable Selectbox v${_package.version}
                        * ${_package.homepage}
                        *
                        * Copyright 2015-${year} Sociomantic Labs and other contributors
                        * Released under the MIT license
                        * https://github.com/sociomantic-tsunami/flounder-react/license
                        *
                        * Date: ${now.toDateString()}
                        * "This, so far, is the best Flounder ever"
                        */`;


gulp.task( 'addLiscence', function()
{
    gulp.src( './src/flounder.react.jsx' )
        .pipe( header( licenceLong ) )
        .pipe( gulp.dest( './dist/' ) );
} );


gulp.task( 'demo', function()
{
    browserify( './demo/demo.js' )
        .transform( babelify )
        .bundle()
        .pipe( fs.createWriteStream( `${__dirname }/demo/demoDist.js` ) );
} );


gulp.task( 'default', [], function()
{
    gulp.start( [ 'addLiscence', 'demo' ] );
} );