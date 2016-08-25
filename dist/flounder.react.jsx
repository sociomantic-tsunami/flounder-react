/*!
                        * Flounder React JavaScript Stylable Selectbox v0.1.2
                        * https://github.com/sociomantic-tsunami/flounder-react
                        *
                        * Copyright 2015-2016 Sociomantic Labs and other contributors
                        * Released under the MIT license
                        * https://github.com/sociomantic-tsunami/flounder-react/license
                        *
                        * Date: Thu Aug 25 2016
                        * "This, so far, is the best Flounder ever"
                        */
import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import Flounder             from './core/flounder';
import classes              from './core/classes';
import utils                from './core/utils';
import Search               from './core/search';
import version              from './version';
import { setDefaultOption } from './core/defaults';

class FlounderReact extends Component
{
    /**
     * available states
     *
     * @return _Array_ available states
     */
    allStates()
    {
        return [
            'default'
        ];
    }


    /**
     * ## componentDidMount
     *
     * setup to run after rendering the dom
     *
     * @return _Void_
     */
    componentDidMount()
    {
        let refs            = this.refs;

        this.target         = this.originalTarget = refs.wrapper.parentNode;

        refs.data           = Array.prototype.slice.call( refs.optionsList.children, 0 );
        refs.selectOptions  = Array.prototype.slice.call( refs.select.children, 0 );

        refs.flounder.flounder = this.originalTarget.flounder = this.target.flounder = this;

        let multiTagWrapper = refs.multiTagWrapper;

        if ( !this.multiple )
        {
            refs.select.removeAttribute( 'multiple' );
        }

        let { isOsx, isIos, multiSelect } = utils.setPlatform();
        this.isOsx          = isOsx;
        this.isIos          = isIos;
        this.multiSelect    = multiSelect;

        this.onRender();

        try
        {
            this.onComponentDidMount();
        }
        catch( e )
        {
            console.log( 'something may be wrong in "onComponentDidMount"', e );
        }
    }


    /**
     * sets the initial state
     *
     * @return _Void_
     */
    constructor( props )
    {
        super( props );
        this.state = {
            modifier        : '',
            errorMessage    : ''
        };
    }


    /**
     * Callback to handle change.
     *
     * Also updates div state and classes
     *
     * @param  _Object_ e Event object
     */
    handleChange( e )
    {
        if ( this.props.onChange )
        {
            this.props.onChange( e );
        }
    }


    /**
     * ## prepOptions
     *
     * double checks that the options are correctly formatted
     *
     * @param {Array} _options array object that may contain objects or strings
     *
     * @return _Array_ correctly formatted options
     */
    prepOptions( data )
    {
        return data.map( ( dataObj, i ) =>
        {
            if ( typeof dataObj === 'string' )
            {
                dataObj = {
                    text    : dataObj,
                    value   : dataObj
                };
            }

            dataObj.text = this.allowHTML ? dataObj.text : utils.escapeHTML( dataObj.text );

            return dataObj;
        } );
    }


    /**
     * Spits out our markup
     *
     * REACT FLOUNDER CAN NOT MOUNT TO INPUT OR SELECT TAGS.
     *
     */
    render( e )
    {

        this.bindThis();

        this.initializeOptions();

        if ( this.search )
        {
            this.search = new Search( this );
        }

        try
        {
            this.onInit();
        }
        catch( e )
        {
            console.log( 'something may be wrong in "onInit"', e );
        }

        let optionsCollection       = [];
        let selectOptionsCollection = [];

        let escapeHTML      = utils.escapeHTML;
        let props           = this.props;
        let data            = this.data = this.prepOptions( props.data || this.data );

        let handleChange    = this.handleChange.bind( this );

        let multipleTags    = this.multipleTags;
        let multiple        = this.multiple;

        if ( multipleTags === true )
        {
            multiple = this.multiple = true;
        }

        let searchBool      = this.search;

        let defaultValue    = this._default = setDefaultOption( this, props, data );
        let defaultReact    = multiple ? [ defaultValue.value ] : defaultValue.value;

        let wrapperClass    = this.wrapperClass ? '  ' + this.wrapperClass : '';
        let flounderClass   = this.flounderClass ? '  ' + this.flounderClass : '';

        let _stateModifier  = this.state.modifier;
        _stateModifier = _stateModifier.length > 0 ? '--' + _stateModifier : '';

        return (
            <div ref="wrapper" className={classes.MAIN_WRAPPER + wrapperClass}>
                <div ref="flounder" tabIndex="0" className={classes.MAIN + flounderClass} aria-hidden={true}>
                    { searchBool ? <input ref="search" type="text" className={classes.SEARCH} /> : null }
                    <div ref="selected" className={classes.SELECTED_DISPLAYED} data-value={defaultValue.value}>
                        {defaultValue.text}
                    </div>
                    { multipleTags ? <div ref="multiTagWrapper" className={classes.MULTI_TAG_LIST}></div> : null }
                    <div ref="optionsListWrapper" className={classes.OPTIONS_WRAPPER + '  ' + classes.HIDDEN}>
                        <div ref="optionsList" className={classes.LIST}>
                        {
                            data.map( ( dataObj, i ) =>
                            {
                                let extraClass = dataObj.disabled ? '  ' + classes.DISABLED : '';
                                extraClass += dataObj.extraClass ? '  ' + dataObj.extraClass : '';

                                if ( !this.placeholder && i === defaultValue.index )
                                {
                                    extraClass += '  ' + classes.SELECTED;
                                }

                                if ( typeof dataObj === 'string' )
                                {
                                    dataObj = [ dataObj, dataObj ];
                                }

                                return ( <div className={classes.OPTION + extraClass} data-index={i} key={i} ref={'option' + i}>
                                            {dataObj.text}
                                            {dataObj.description ?
                                                <div className={classes.DESCRIPTION}>
                                                    {dataObj.description}
                                                </div> :
                                                null
                                            }
                                        </div> );
                            } )
                        }
                        </div>
                    </div>
                    <div className={classes.ARROW}>
                        <div className={classes.ARROW_INNER}></div>
                    </div>
                </div>
                <select ref="select" className={classes.SELECT_TAG + '  ' + classes.HIDDEN} defaultValue={defaultReact} tabIndex="-1" multiple={multiple}>
                {
                    data.map( ( dataObj, i ) =>
                    {
                        let extraClass  = i === defaultValue ? '  ' + this.selectedClass : '';

                        let res = {
                            className       : classes.OPTION + extraClass,
                            'data-index'    : i
                        };

                        return ( <option key={i} value ={dataObj.value} className={classes.OPTION_TAG} ref={'option' + i} disabled={dataObj.disabled}>
                                    {dataObj.text}
                                </option> );
                    } )
                }
                </select>
            </div>
        );
    }
}


let FlounderPrototype       = Flounder.prototype;
let FlounderReactPrototype  = FlounderReact.prototype;
let methods                 = Object.getOwnPropertyNames( FlounderPrototype );

methods.forEach( function( method )
{
    if ( !FlounderReactPrototype[ method ] && !FlounderPrototype[ method ].propertyIsEnumerable() )
    {
        FlounderReactPrototype[ method ] = FlounderPrototype[ method ]
    }
});


Object.defineProperty( FlounderReact, 'version', {
    get : function()
    {
        return version;
    }
} );


Object.defineProperty( FlounderReact.prototype, 'version', {
    get : function()
    {
        return version;
    }
} );

export default FlounderReact;
