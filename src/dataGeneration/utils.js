
module.exports.isOdd = isOdd;
module.exports.getDigit = getDigit;
module.exports.getDigitCount = getDigitCount;
module.exports.getDigits = getDigits;
module.exports.genPatternOptions = genPatternOptions;
module.exports.genCreditCardFunctionBody = genCreditCardFunctionBody;
module.exports.genCreditCardPatternRangeBody = genCreditCardPatternRangeBody;
module.exports.buildFunction = buildFunction;

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

// console.log( getDigits( 123456789 ) );

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

// console.log( genPatternOptions( [627700, 627779] ) );

function genCreditCardFunctionBody( pattern, sum, length, doubleWhen ){
    return `
    let digit = -1;
    let digits = ${JSON.stringify( pattern )};
    let sum = ${sum};

    for( let i = 0; i < ${ length - pattern.length - 1 }; ++i ){
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

    return digits;`
}


function genCreditCardPatternRangeBody( pattern, initialSum, pos, length, doubleWhen ){
    return `
    let digit = -1;
    let opts = ${JSON.stringify( pattern )};

    let digits = opts[ Math.floor( Math.random() * opts.length ) ];
    let sum = ${initialSum} + digits[${pos}];

    for( let i = 0; i < ${length - pattern[0].length - 1}; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === ${ doubleWhen } ){
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

    return digits;`
}

function buildFunction( name, body ){
    return `let ${name} = function(){${body}}
    `;
}

let test = buildFunction( "",  );