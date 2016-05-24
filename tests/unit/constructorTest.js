/* global document, QUnit  */
let tests = function( Flounder, React, ReactDOM )
{
    QUnit.module( 'Flounder constructor' );


    /*
     * constructor tests
     *
     * @test    constructor exists
     * @test    constructor returns constructor with no args
     */
    QUnit.test( 'Flounder', function( assert )
    {
        assert.ok( Flounder, 'Flounder Exists' );

        let flounder = ReactDOM.render( React.createElement( Flounder, {} ), document.querySelector( '.flounder-test__target' ) );

        assert.ok( flounder instanceof Flounder, 'a single target makes a flounder' );

        let ref     = flounder.refs.flounder.flounder instanceof Flounder;
        let oTarget = flounder.originalTarget.flounder instanceof Flounder;
        let target  = flounder.target.flounder instanceof Flounder;

        assert.ok( ref === true && oTarget === true && target === true, 'creates all refs' );
        flounder.destroy();
        ref     = flounder.refs.flounder.flounder instanceof Flounder;
        oTarget = flounder.originalTarget.flounder instanceof Flounder;
        target  = flounder.target.flounder instanceof Flounder;

        assert.ok( ( !ref && !oTarget && !target ), 'and removes them all' );
    });
};

export default tests;
