
module.exports.isOdd = isOdd;
module.exports.union = union;
module.exports.getDigit = getDigit;
module.exports.getDigitCount = getDigitCount;
module.exports.getDigits = getDigits;
module.exports.mod = mod;
module.exports.genPatternOptions = genPatternOptions;
module.exports.genCreditCardFunctionBody = genCreditCardFunctionBody;
module.exports.buildFunction = buildFunction;
module.exports.buildCreditCardFunctions = buildCreditCardFunctions;
module.exports.filterArrayByArray = filterArrayByArray;

function isOdd( int ){
    return int % 2 === 1
}

function getDigit( int, digit ){
    return Math.floor( ( Math.abs( int ) / Math.pow( 10, digit ) ) % 10 )
}

function getDigitCount( int ){
    return Math.floor( Math.log10( Math.abs( int ) ) ) + 1
}

// console.log( getDigitCount( 123456 ) );

function getDigits( int ){
    let count = getDigitCount( int );
    let digits = [];

    for( let i = 0; i < count; ++i ){
        digits.push( getDigit( int, i ) );
    }

    return digits.reverse();
}

function mod( num, modVal ){
    return num % modVal;
}

// console.log( getDigits( 123456789 ) );
/**
 * @function genPatternOptions
 * @version 1.0.0
 * @public
 *
 * takes an array, of at least two numbers, and splits it up like so
 * [ 2221, 2229 ] => [
 *  [ 2, 2, 2, 1 ], [ 2, 2, 2, 2 ], [ 2, 2, 2, 3 ],
 *  [ 2, 2, 2, 4 ], [ 2, 2, 2, 5 ], [ 2, 2, 2, 6 ],
 *  [ 2, 2, 2, 7 ], [ 2, 2, 2, 8 ], [ 2, 2, 2, 9 ]
 * ]
 */
function genPatternOptions( range ){
    let start = range[0];
    let end = range[1];
    let diff = end - start;

    if( diff < 0 )
        throw new RangeError( "range[0] must be larger than range[1]." );

    let opts = [];

    for( let i = 0; i < diff + 1; ++i ){
        opts.push( getDigits( range[0] + i ) )
    }

    return opts;
}

// console.log( genPatternOptions( [624, 626] ) );

function genCreditCardFunctionBody( type, pattern, length ){
    let howManyDigitsToGenerate = length - pattern.length - 1;
    let doubleWhen = isOdd( howManyDigitsToGenerate ) ? 0 : 1;
    let whenToDouble = isOdd( length ) ? 1 : 0;
    let sum = 0;

    for( let i = 0; i < pattern.length; ++i ){
        if( i % 2 === whenToDouble )
            sum += pattern[i] > 4 ? ( pattern[i] * 2 ) - 9 : pattern[i] * 2 ;
        else
            sum += pattern[i];
    }

    return `
    let digit = -1;
    let digits = ${JSON.stringify( pattern )};
    let sum = ${sum};
    let res = ${JSON.stringify( type )}

    for( let i = 0; i < ${howManyDigitsToGenerate}; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === ${doubleWhen} ){
            digit *= 2;
            if( digit > 9 ){
                digit -= 9;
            }
        }
        sum += digit;
    }

    let remainder = sum % 10;

    if( remainder === 0 )
        digits.push( 0 );
    else
        digits.push( 10 - remainder );
        
    res.number = digits;

    return res;`
}

function buildFunction( name, body ){
    return `
    function ${name}(){
        ${body}
    }`;
}


function buildCreditCardFunctions( type ){
    let creditCardFunctions = [];
    let typePatterns = type.patterns;
    // console.log( "type patterns", typePatterns );
    let lens = type.lengths;

    let length = -1;
    let patternRange = [ [] ];
    let pattern = [];

    for( let i = 0; i < lens.length; ++i ){
        length = lens[i];
        for( let j = 0; j < typePatterns.length; ++j ){
            pattern = typePatterns[j];
            if( Array.isArray( pattern ) ){

                patternRange = genPatternOptions( pattern );
                for( let k = 0; k < patternRange.length; ++k ){
                    creditCardFunctions.push( new Function( genCreditCardFunctionBody( type, patternRange[k], length ) ) );
                }

            } else {
                creditCardFunctions.push( new Function( genCreditCardFunctionBody( type, getDigits( pattern ), length ) ) );
            }

        }

    }

    return creditCardFunctions;
}


function union( boolArr ){
    return boolArr.reduce( ( acc, cur ) => acc && cur );
}

/**
 * @function filterArrayByArray
 * @version 1.0.0
 * @public
 *
 * filters an array by another array, this has the potential to be very slow so if working with massive
 * data sets consider sorting and then using a method similar to this one.
 *
 *
 * @param {Array} array - the array to filter
 * @param {Array} filterArray - the array whose values you would like to filter by.
 * @param {Function} filterFunc - the function to use to filter the array in the array parameter.
 *          Note: it must be a traditional function since arrow functions have lexical scoping and this
 *          works by using using JavaScript function's original scoping.
 *
 * @return {Array} the filtered array
 *
 */
function filterArrayByArray( array, filterArray, filterFunc ){
    return array.filter(
        filterFunc,
        filterArray
    );
}