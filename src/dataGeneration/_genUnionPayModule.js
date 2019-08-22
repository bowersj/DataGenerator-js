/**
 * This module generates the UnionPay credit card module.
 *
 * I went with code generation because there are 6 lengths with 20 patterns
 * to account for. This means there are 120 functions that need to be created.
 * That is a lot especially since most of the functions are permutations.
 *
 */
const fs = require( "fs" );
const path = require( "path" );
const utils = require( "./utils.js" );
let valid_credit_card = require( 'card-validator' );

let patterns = [
    620,
    [624, 626],
    [62100, 62182],
    [62184, 62187],
    [62185, 62197],
    [62200, 62205],
    [622010, 622999],
    622018,
    [622019, 622999],
    [62207, 62209],
    [622126, 622925],
    [623, 626],
    6270,
    6272,
    6276,
    [627700, 627779],
    [627781, 627799],
    [6282, 6289],
    6291,
    6292
];

let lengths = [ 14, 15, 16, 17, 18, 19 ];
let len = lengths.length;

// let _genAmericanExpress37 = new Function( _genCreditCardFunctionBody( [ 3, 7 ], 8, 15, 1 ) );
let _gen = new Function(
    utils.genCreditCardPatternRangeBody(
        [
            [ 2, 2, 2, 1 ], [ 2, 2, 2, 2 ], [ 2, 2, 2, 3 ],
            [ 2, 2, 2, 4 ], [ 2, 2, 2, 5 ], [ 2, 2, 2, 6 ],
            [ 2, 2, 2, 7 ], [ 2, 2, 2, 8 ], [ 2, 2, 2, 9 ]
        ],
        10,
        3,
        16,
        0
    )
);

let cc = _gen();
console.log( cc );
console.log( cc.length );
console.log( valid_credit_card.number( cc.join( "" ) ) );

// module.exports.generated = _genAmericanExpress37;

// let length = 0;
//
// for( let i = 0; i < len; ++i ){
//     length = lengths[i];
//
//
//     for( let j = 0; j < patterns.length; ++j ){
//
//     }
//
// }
