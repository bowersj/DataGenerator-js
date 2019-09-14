// credit card test cases
const tests =[
    [ 1,2,3,4,5,6,7,8,9,1,2,3 ],
    [ 1,2,3,4,5,6,7,8,9,1,2,3,4 ],
    [ 1,2,3,4,5,6,7,8,9,1,2,3,4,5],
    [ 1,2,3,4,5,6,7,8,9,1,2,3,4,5,6 ],
    [ 1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7 ],
    [ 1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8 ],
    [ 1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9 ],
    [ 1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,0 ]
];

const ccTypes = require( "./ccTypes.js" );
const utils = require( "./../utils.js" );

/**
 * d - a single digit
 *
 * currently only works with accepting arrays
 *
 * TODO: implement minLength and maxLength props in opts obj
 *  This way, specialized functions can be generated for each length
 *  The defaults should be 12 for minLength and 19 for maxLength since there are no
 *  CCN less than 12 digits and greater than 19
 *
 * TODO: generalize it to work with objects as the input of the returned function
 *
 */
function buildFormatter( pattern, opts = {} ){
    opts = Object.assign( {
        expectedValue: "array"
    }, opts );

    let tokens = pattern.split( "" );

    let parameterName = "val";
    let map = {
        // d: digitToken_array
        d: digitToken_simple
    };

    let functionBody = _buildArrayFormatterBody( tokens, parameterName, map, opts );

    // return _returnFunction( parameterName, functionBody );
    return new Function ( parameterName, functionBody );
}


function _returnFunction( parameterName, functionBody ){
    return new Function ( parameterName, functionBody );
}


/**
 * @param {String} varName - the name of the variable be referenced
 * @param {String} path - the path to an array, it must start with a ".",
 *      unless no path is needed, in which case pass in ""
 * @param {Number|string} index - the index with in an array
 *
 */
function digitToken_array( varName, path, index ){
    let val = _buildPath( varName, `${path}[${index}]` );
    // let val = `${varName}${path}[${index}]`;
    return _isolate( _ternary( val, `${val}.toString()`, '""' ) );
}


/**
 * @param {String} varName - the name of the variable be referenced
 * @param {String} path - the path to an array, it must start with a ".",
 *      unless no path is needed, in which case pass in ""
 * @param {Number|string} index - the index with in an array
 *
 */
function digitToken_simple( varName, path, index ){
    let val = _buildPath( varName, `${path}[${index}]` );
    return `${val}.toString()`;
}


function _ternary( condition, t, f ){
    return `${condition} ? ${t} : ${f}`;
}


function _isolate( expression ){
    return `(${ expression })`;
}


/**
 * @param {String} varName - the name of the variable be referenced
 * @param {String} path - the path to an array, it must start with a ".",
 *      unless no path is needed, in which case pass in ""
 */
function _buildPath( varName, path ){
    return `${varName}${path}`;
}


function _buildCreditCardFormatterBody( tokens, paramName, map, opts ){
    let functionBody = "return ";
    let token = "";
    let expression = "";
    let path = "";
    let strToken = "";

    // console.log( tokens );

    let j = 0;
    for( let i = 0; i < tokens.length; ++i ){
        token = tokens[i];

        if( token in map ){
            if( i === tokens.length - 1 )
                functionBody += `${map[ token ]( paramName, "", j )}`;
            else
                functionBody += `${map[ token ]( paramName, "", j )} + `;
            // console.log( functionBody );
            ++j;
        } else {
            path = _buildPath( paramName, `[${j}]` );
            strToken = `"${token}"`;
            if( i === tokens.length - 1 ){
                functionBody += _isolate( _ternary( path, strToken, '""' ) );
                // functionBody += `"${token}"`;
            } else{
                functionBody += `${_isolate( _ternary( path, strToken, '""' ) )} + `;
                // functionBody += `"${token}" + `;
            }
        }
    }
    // functionBody = functionBody.trim().replace( /\s\+\s$/, "" );

    return functionBody;
}


function _buildArrayFormatterBody( tokens, paramName, map, opts ){

    let functionBody = "return ";
    let token = "";
    // let expression = "";
    let path = "";
    let strToken = "";

    // console.log( tokens );

    let j = 0;
    for( let i = 0; i < tokens.length; ++i ){
        token = tokens[i];

        if( token in map ){
            if( i === tokens.length - 1 )
                functionBody += `${map[ token ]( paramName, "", j )}`;
            else
                functionBody += `${map[ token ]( paramName, "", j )} + `;
            // console.log( functionBody );
            ++j;
        } else {
            path = _buildPath( paramName, `[${j}]` );
            strToken = `"${token}"`;
            if( i === tokens.length - 1 ){
                functionBody += strToken;
            } else{
                functionBody += `${strToken} + `;
            }
        }
    }

    return functionBody;
}

// see https://baymard.com/checkout-usability/credit-card-patterns for a more detailed list
function _buildCCFormatter( cardType, ccTypes, breakChar ){
    let ccType = ccTypes[ cardType ];
    let breaks = ccType.gaps;
    let lengths = ccType.lengths;
    let paramName = "arr";

    let map = {
        // d: digitToken_array
        d: digitToken_simple
    };

    let len = -1;
    let pattern = [];
    let brkIndex = {};
    let brkIndexes = [];
    let patterns = [];

    for( let k = 0; k < breaks.length; ++k ){
        brkIndex[ breaks[k] ] = true;
    }

    for( let i = 0; i < lengths.length; ++i ){
        brkIndexes.push( utils.copy( brkIndex ) );
    }

    // console.log( brkIndex );

    for( let j = 0; j < lengths.length; ++j ){

        len = lengths[j];
        brkIndex = brkIndexes.pop();

        for( let i = 0; i < len; ++i ){

            if( brkIndex[i] ){
                brkIndex[i] = false;

                pattern.push( breakChar );

                --i;
            } else {
                pattern.push( "d" );
            }

        }

        patterns.push( { len, pattern } );
        pattern = [];

    }

    // console.log( patterns );

    let swtch = `switch( ${paramName}.length ){`;

    while( patterns.length > 0 ){
        pattern = patterns.pop();
        len = pattern.len;
        pattern = pattern.pattern;

        console.log( pattern );
        console.log( len );

        swtch += _buildCase( len, _buildArrayFormatterBody( pattern, paramName, map, {} ) )
    }

    swtch += '}';

    return new Function( paramName, swtch );
}


function _buildSwitch( cases, functionBodies, paramName ){

    if( cases.length !== functionBodies.length )
        throw new TypeError( "The number of cases and funcs must be the same." );

    let statement = `switch( ${paramName}.length ){`;

    for( let i = 0; i < cases.length; ++i ){

    }

    statement += '}';

    return statement;
}


function _buildCase( caseId, code ){
    return ` case ${caseId}: ${code}; `;
}

let format = _buildCCFormatter( "visa", ccTypes, "-" );
console.log( format );
console.log( format( [ 1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7 ] ) );


// let _format_12 = buildFormatter( "dddd-dddd-dddd" );
// let _format_13 = buildFormatter( "dddd-dddd-dddd-d" );
// let _format_14 = buildFormatter( "dddd-dddd-dddd-dd" );
// let _format_15 = buildFormatter( "dddd-dddd-dddd-ddd" );
// let _format_16 = buildFormatter( "dddd-dddd-dddd-dddd" );
// let _format_17 = buildFormatter( "dddd-dddd-dddd-dddd-d" );
// let _format_18 = buildFormatter( "dddd-dddd-dddd-dddd-dd" );
// let _format_19 = buildFormatter( "dddd-dddd-dddd-dddd-ddd" );
//
//
// let format = function ( arr ){
//     // console.log( arr.length );
//     switch( arr.length ){
//         case 12:
//             return _format_12( arr );
//         case 13:
//             return _format_13( arr );
//         case 14:
//             return _format_14( arr );
//         case 15:
//             return _format_15( arr );
//         case 16:
//             return _format_16( arr );
//         case 17:
//             return _format_17( arr );
//         case 18:
//             return _format_18( arr );
//         case 19:
//             return _format_19( arr );
//     }
// };
//
// test(
//     format,
//     tests,
//     [
//         "1234-5678-9123",
//         "1234-5678-9123-4",
//         "1234-5678-9123-45",
//         "1234-5678-9123-456",
//         "1234-5678-9123-4567",
//         "1234-5678-9123-4567-8",
//         "1234-5678-9123-4567-89",
//         "1234-5678-9123-4567-890"
//     ]
// );
//
// function test ( func, tests, expectedResults ){
//     if( tests.length !== expectedResults.length )
//         throw new TypeError( "expectedResults must have the same length as tests" );
//
//     let success = true;
//
//     for( let i = 0; i < tests.length; ++i ){
//         let res = func( tests[i] );
//         if( res !== expectedResults[i] ){
//             console.log( `Failed test ${i + 1}, with the value of ${ tests[i] } with the expected value of ${ expectedResults[i] } actually returned ${res}` );
//             success = false;
//         }
//     }
//
//     if( success )
//         console.log( "All the tests passed." );
// }
//
// console.log( format( [ 1,2,3,4,5,6,7,8,9,1,2,3 ] ) );