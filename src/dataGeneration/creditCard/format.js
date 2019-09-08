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
        d: digitToken_array
    };

    let functionBody = _buildArrayFormatterBody( tokens, parameterName, map, opts );

    console.log( functionBody );

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


function _buildArrayFormatterBody( tokens, paramName, map, opts ){

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


let format = buildFormatter( "dddd-dddd-dddd-dddd" );

test(
    format,
    tests,
    [
        "1234-5678-9123",
        "1234-5678-9123-4",
        "1234-5678-9123-45",
        "1234-5678-9123-456",
        "1234-5678-9123-4567",
        "1234-5678-9123-4567-8",
        "1234-5678-9123-4567-89",
        "1234-5678-9123-4567-890"
    ]
);

function test ( func, tests, expectedResults ){
    if( tests.length !== expectedResults.length )
        throw new TypeError( "expectedResults must have the same length as tests" );

    for( let i = 0; i < tests.length; ++i ){
        let res = func( tests[i] );
        if( res !== expectedResults[i] )
            console.log( `Failed test ${i + 1}, with the value of ${ tests[i] } with the expected value of ${ expectedResults[i] } actually returned ${res}` );
    }
}
