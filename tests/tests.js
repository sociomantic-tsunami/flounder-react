
/* jshint globalstrict: true */
'use strict';

import { React, Component, ReactDOM, FlounderReact } from '../src/flounder.react.jsx';
import utils            from '../src/core/utils';
import classes          from '../src/core/classes';

import constructorTest   from './unit/constructorTest';
import flounderTest      from './unit/flounderTest';
import utilsTest         from './unit/utilsTest';
import versionTest       from './unit/versionTest';

let Flounder = FlounderReact;

console.log( Flounder );
class Tests
{
    constructor()
    {
        window.Flounder = Flounder;

        return this;
    }
};


utils.extendClass( Tests, utils );
let tests = new Tests;

constructorTest( Flounder );
flounderTest( Flounder );
utilsTest( Flounder, utils );
versionTest( Flounder );

export default tests;