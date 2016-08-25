
import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import FlounderReact        from '../src/flounder.react.jsx';
import µ                    from 'microbejs';


window.FlounderReact = FlounderReact;

let _slice = Array.prototype.slice;


/**
 * example data object
 *
 * @type {Array}
 */
let data = [
    {
        cssClass    : 'select-filters',
        id          : 'All',
        isTaxonomy  : true,
        text        : 'All'
    },
    {
        cssClass    : 'category',
        id          : 'category',
        isTaxonomy  : true,
        text        : 'Categories'
    },
    {
        cssClass    : 'tag',
        id          : 'tag',
        isTaxonomy  : true,
        text        : 'Tags'
    },
    {
        cssClass    : 'month',
        id          : 'month',
        isTaxonomy  : true,
        text        : 'Month'
    }
];


let buildData = function()
{
    let res = [];
    data.forEach( function( dataObj )
    {
        res.push( {
            text        : dataObj.text,
            value       : dataObj.id,
            description : dataObj.id + ' could be described as "' + dataObj.text + '"'
        } );
    } );

    return res;
};


/**
 * React from Div (multiple, tags, placeholder, built from element)
 */
ReactDOM.render( React.createElement( FlounderReact, {
    placeholder         : 'placeholders!',

    multiple            : true,

    multipleTags        : true,

    onInit              : function(){ this.data = buildData(); },

    } ), document.getElementById( 'react--multiple--tags' )
);


/**
 * React from Span (default value, built from element)
 */
ReactDOM.render( React.createElement( FlounderReact, {
    defaultValue        : 'tag',

    onInit              : function(){ this.data = buildData(); },

    } ), document.getElementById( 'react--span' )
);


/**
 * React from Div (multiple, description, default index, elements disabled, built from element)
 */
ReactDOM.render( React.createElement( FlounderReact, {
    defaultIndex        : 3,

    multiple            : true,

    onInit              : function()
    {
        let res = [];
        data.forEach( function( dataObj, i )
        {
            res.push( {
                text        : dataObj.text,
                value       : dataObj.id,
                description : dataObj.id + ' - ' + dataObj.text,
                disabled    : i === 1 ? true : false
            } );
        } );

        this.data = res;
    } } ), document.getElementById( 'react--multiple--desc' )
);


µ( '.debug--mode' ).on( 'click', function()
{
    µ( '.flounder--select--tag' ).removeClass( 'flounder--hidden' ).removeClass( 'flounder--hidden--ios' );
    µ( '.flounder' ).css( 'display', 'inline-block' )
} );


µ( '.destroy--all' ).on( 'click', function()
{
    µ( '.flounder' ).each( function( el )
    {
        el.flounder.destroy();
    } );
} );


export default FlounderReact;