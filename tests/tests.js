
/* jshint globalstrict: true */
'use strict';

import { React, Component, ReactDOM, FlounderReact } from '../src/flounder.react.jsx';
import utils            from '../src/core/utils';
import classes          from '../src/core/classes';

import constructorTest   from './unit/constructorTest';
import flounderTest      from './unit/flounderTest';
import utilsTest         from './unit/utilsTest';
import versionTest       from './unit/versionTest';


class Tests
{
    constructor()
    {
        window.Flounder = FlounderReact;

        return this;
    }
};


utils.extendClass( Tests, utils );
let tests = new Tests;

constructorTest( FlounderReact, React, ReactDOM );
flounderTest( FlounderReact, React, ReactDOM );
utilsTest( FlounderReact, React, ReactDOM, utils );
versionTest( FlounderReact, React, ReactDOM );

export default tests;