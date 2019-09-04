let valid_credit_card = require( 'card-validator' );
// let Benchamrk = require( "benchmark" );
let stats = require( "./../stats/base.js" );

/**
 *@function genCreditCardNumber
 * @version 1.0.1
 * @private
 *
 * TODO: need to account for the different formats based on the type of credit card
 *
 * Credit card formats
 *  See https://www.freeformatter.com/credit-card-number-generator-validator.html#cardFormats
 *
 *  American Express
 *  Starts with 34 OR 37
 *  Length 15
 *
 */
function genCreditCardNumber(){
    /**
     * Format: {
     *     prefixes:[ 12,345 ]
     *     length: 16
     * }
     */
    let formats = {
        americanExpress:{
            prefix:[ 34, 37 ],
            length:[ 15 ]
        },
        dinnersClubCarteBlanche:{
            prefix:[ 300, 301, 302, 303, 304, 305 ],
            length:[ 14 ]
        },
        dinnersClubInternational:{
          prefix:[ 36 ],
          length: [ 14 ]
        },
        dinnersClubUSCanada:{
            prefix:[ 54 ],
            length: [ 16 ]
        },
        discover:{
            prefix:[ 6011, [ 622126, 622925 ], 644, 645, 646, 647, 648, 649, 65 ],
            length:[ 16 - 19 ]
        },
        instaPayment:{
            prefix:[ 637, 638, 639 ],
            length:[ 16 ]
        },
        jcb: {
            prefix:[ [ 3528, 3589 ] ],
            length: [ 16, 19 ]
        },
        maestro:{
            prefix:[ 5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763 ],
            length: [ 16, 19 ]
        },
        masterCard:{
            prefix:[ 51, 52, 53, 54, 55, [ 222100, 272099 ] ],
            length: [16]
        },
        visa:{
            prefix:[ 4 ],
            length:[ 13, 19 ]
        },
        visaElectron:{
            prefix:[ 4026, 417500, 4508, 4844, 4913, 4917 ],
            length: [ 16 ]
        }
    };

    let creditCardNumber = Math.floor(Math.random()*10000000000000000);
    if( creditCardNumber.length < 16 ){
        genCreditCardNumber();
    } else {
        return creditCardNumber;
    }
}

let _genVisa_hardCoded = (function (){

    // let floor = Math.floor;
    // let rand = Math.random;

    let sum = 0;
    let digit = -1;
    // let digits = [
    //     4,
    //     floor( rand() * 10 ),
    //     floor( rand() * 10 ),
    //     floor( rand() * 10 ),
    //     floor( rand() * 10 ),
    //     floor( rand() * 10 ),
    //     floor( rand() * 10 ),
    //     floor( rand() * 10 ),
    //     floor( rand() * 10 ),
    //     floor( rand() * 10 ),
    //     floor( rand() * 10 ),
    //     floor( rand() * 10 ),
    //     floor( rand() * 10 ),
    //     floor( rand() * 10 ),
    //     floor( rand() * 10 ),
    // ];
    let digits = [
        4,
        Math.floor( Math.random() * 10 ),
        Math.floor( Math.random() * 10 ),
        Math.floor( Math.random() * 10 ),
        Math.floor( Math.random() * 10 ),
        Math.floor( Math.random() * 10 ),
        Math.floor( Math.random() * 10 ),
        Math.floor( Math.random() * 10 ),
        Math.floor( Math.random() * 10 ),
        Math.floor( Math.random() * 10 ),
        Math.floor( Math.random() * 10 ),
        Math.floor( Math.random() * 10 ),
        Math.floor( Math.random() * 10 ),
        Math.floor( Math.random() * 10 ),
        Math.floor( Math.random() * 10 ),
    ];

    let d0 = digits[0] * 2;
    let d2 = digits[2] * 2;
    let d4 = digits[4] * 2;
    let d6 = digits[6] * 2;
    let d8 = digits[8] * 2;
    let d10 = digits[10] * 2;
    let d12 = digits[12] * 2;
    let d14 = digits[14] * 2;

    if( d0 > 9 ) d0 -= 9;
    if( d2 > 9 ) d2 -= 9;
    if( d4 > 9 ) d4 -= 9;
    if( d6 > 9 ) d6 -= 9;
    if( d8 > 9 ) d8 -= 9;
    if( d10 > 9 ) d10 -= 9;
    if( d12 > 9 ) d12 -= 9;
    if( d14 > 9 ) d14 -= 9;

    sum +=
        d0 +
        digits[1] +
        d2 +
        digits[3] +
        d4 +
        digits[5] +
        d6 +
        digits[7] +
        d8 +
        digits[9] +
        d10 +
        digits[11] +
        d12 +
        digits[13] +
        d14;

    let remainder = sum % 10;

    if( remainder === 0 )
        digits.push( 0 );
    else
        digits.push( 10 - remainder );

    return digits.join( "" );
});


let _genVisa = require( "../dataGeneration/creditCard/creditCardNumbers.js" ).visa["16"];
// let cc = _genVisa().join("");
// console.log( cc );
// console.log( cc.length );
// console.log( valid_credit_card.number( cc ) );

function test( test = 10, samples = 1000000 ){

    // warm up JIT compiler
    for( let i = 0; i < 100; ++i ){
        _genVisa()
    }

    for( let i = 0; i < 100; ++i ){
        _genVisa_hardCoded()
    }

    // test performance
    let loopRes = [];
    let hardRes = [];

    // build out results for forLoop

    for( let j = 0; j < test; ++j ){
        let start = new Date().getTime();

        for( let i = 0; i < samples; ++i ){
            _genVisa_hardCoded()
        }

        hardRes.push( ( samples / ( new Date().getTime() - start ) ) * 1000 )
    }

    for( let j = 0; j < test; ++j ){
        let start = new Date().getTime();

        for( let i = 0; i < samples; ++i ){
            _genVisa()
        }

        loopRes.push( ( samples / ( new Date().getTime() - start ) ) * 1000 )
    }

    return {
        test,
        samples,
        forLoop:{
            avg: stats.getAverage( loopRes ).toLocaleString( "en-US" ),
            med: stats.getMedian( loopRes ).toLocaleString( "en-US" ),
            std: stats.getSampleStandardDeviation( loopRes ).toLocaleString( "en-US" )
        },
        hardCoded:{
            avg: stats.getAverage( hardRes ).toLocaleString( "en-US" ),
            med: stats.getMedian( hardRes ).toLocaleString( "en-US" ),
            std: stats.getSampleStandardDeviation( hardRes ).toLocaleString( "en-US" )
        }
    };
}

console.log( test( 10, 2000000 ) );