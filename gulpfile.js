var gulp            = require( 'gulp' );
var fs              = require( 'fs' );
var browserify      = require( 'browserify' );
var babelify        = require( 'babelify' );
var uglify          = require( 'gulp-uglify' );
var header          = require( 'gulp-header' );

var _package        = require( './package.json' );

var now             = new Date();
var year            = now.getUTCFullYear();

var licenceLong     = '/*!\n' +
                      ' * Flounder React JavaScript Stylable Selectbox v' + _package.version + '\n' +
                      ' * ' + _package.homepage + '\n' +
                      ' *\n' +
                      ' * Copyright ' + ( 2015 === year ? year : '2015-' + year ) + ' Sociomantic Labs and other contributors\n' +
                      ' * Released under the MIT license\n' +
                      ' * https://github.com/sociomantic-tsunami/flounder-react/license\n' +
                      ' *\n' +
                      ' * Date: ' + now.toDateString() + '\n' +
                      ' * "This, so far, is the best React Flounder ever"\n' +
                      ' */\n';


gulp.task( 'addLiscence', function()
{
    gulp.src( './src/flounder.react.jsx' )
        .pipe( header( licenceLong ) )
        .pipe( gulp.dest( './dist/' ) );
} );


gulp.task( 'buildTests', function()
{
    browserify( './tests/tests.js' )
        .transform( babelify, { stage : 0 } )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/tests/tests.dist.js' ) )
} );


gulp.task( 'demo', function()
{
    browserify( './demo/demo.js' )
        .transform( babelify, { stage : 0 } )
        .bundle()
        .pipe( fs.createWriteStream( __dirname + '/demo/demoDist.js' ) );
} );


gulp.task( 'default', [], function()
{
    gulp.start( [ 'addLiscence', 'demo' ] );
} );