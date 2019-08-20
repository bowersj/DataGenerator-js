/**
 * Module for generating valid credit card numbers
 *
 * For a list of formats go to
 *  https://github.com/braintree/credit-card-type/blob/master/lib/card-types.js
 */

module.exports = {
    visa: genVisa,
    visaElectron: genVisaElectron,
    masterCard: genMasterCard,
    discoverCard: genDiscoverCard
};


/**
 * Visa
 * prefixes 4
 * lengths 16, 18 or 19
 */

function genVisa() {
    let funcs = [ _genVisa16, _genVisa18, _genVisa19 ];

    return funcs[ Math.floor( Math.random() * funcs.length ) ]()
}

function _genVisa16(){
    let sum = 8;
    let digit = -1;
    let digits = [ 4 ];

    for( let i = 0; i < 14; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 1 ){
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

    return digits;
}

function _genVisa18(){
    let sum = 8;
    let digit = -1;
    let digits = [ 4 ];

    for( let i = 0; i < 16; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 1 ){
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

    return digits;
}

function _genVisa19(){
    let sum = 4;
    let digit = -1;
    let digits = [ 4 ];

    for( let i = 0; i < 17; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 0 ){
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

    return digits;
}


/**
 * Visa electron
 * prefixes 4026, 417500, 4508, 4844, 4913, 4917
 * lengths 16
 */
function genVisaElectron(){
    let funcs = [ _genVisaElectron4026, _genVisaElectron417500, _genVisaElectron4508, _genVisaElectron4844, _genVisaElectron4913, _genVisaElectron4917 ];
    return funcs[ Math.floor( Math.random() * funcs.length ) ]();
}

function _genVisaElectron4026(){
    let sum = 18;
    let digit = -1;
    let digits = [ 4, 0, 2, 6 ];

    for( let i = 0; i < 11; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 0 ){
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

    return digits;
}

function _genVisaElectron417500(){
    let sum = 19;
    let digit = -1;
    let digits = [ 4, 1, 7, 5, 0, 0 ];

    for( let i = 0; i < 9; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 0 ){
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

    return digits;
}

function _genVisaElectron4508(){
    let sum = 21;
    let digit = -1;
    let digits = [ 4, 5, 0, 8 ];

    for( let i = 0; i < 11; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 0 ){
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

    return digits;
}

function _genVisaElectron4844(){
    let sum = 28;
    let digit = -1;
    let digits = [ 4, 8, 4, 4 ];

    for( let i = 0; i < 11; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 0 ){
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

    return digits;
}

function _genVisaElectron4913(){
    let sum = 22;
    let digit = -1;
    let digits = [ 4, 9, 1, 3 ];

    for( let i = 0; i < 11; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 0 ){
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

    return digits;
}

function _genVisaElectron4917(){
    let sum = 26;
    let digit = -1;
    let digits = [ 4, 9, 1, 7 ];

    for( let i = 0; i < 11; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 0 ){
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

    return digits;
}


/**
 * Master Card
 *
 * Prefixes 51 to 55, 2221 to 2229, 223 to 229, 23 to 26, 270, 271, 2720
 * lengths 16
 */
function genMasterCard(){
    let funcs = [
        _genMasterCard51, _genMasterCard2221, _genMasterCard223,
        _genMasterCard23, _genMasterCard270,  _genMasterCard271,
        _genMasterCard2720 ];
    return funcs[ Math.floor( Math.random() * funcs.length ) ]();
}

function _genMasterCard51(){
    let digit = -1;
    let opts = [ [ 5, 1 ], [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ] ];
    let digits = opts[ Math.floor( Math.random() * opts.length ) ];
    let sum = 1 + digits[1];

    for( let i = 0; i < 13; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 0 ){
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

    return digits;
}

function _genMasterCard2221(){
    let digit = -1;
    let opts = [
        [ 2, 2, 2, 1 ], [ 2, 2, 2, 2 ], [ 2, 2, 2, 3 ],
        [ 2, 2, 2, 4 ], [ 2, 2, 2, 5 ], [ 2, 2, 2, 6 ],
        [ 2, 2, 2, 7 ], [ 2, 2, 2, 8 ], [ 2, 2, 2, 9 ]
    ];

    let digits = opts[ Math.floor( Math.random() * opts.length ) ];
    let sum = 10 + digits[3];

    for( let i = 0; i < 11; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 0 ){
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

    return digits;
}

function _genMasterCard223(){
    let digit = -1;
    let opts = [
        [ 2, 2, 3 ], [ 2, 2, 4 ], [ 2, 2, 5 ],
        [ 2, 2, 6 ], [ 2, 2, 7 ], [ 2, 2, 8 ],
        [ 2, 2, 9 ]
    ];

    let digits = opts[ Math.floor( Math.random() * opts.length ) ];
    let calc = digits[2] > 4 ? ( digits[2] * 2 ) - 9 : digits[2] * 2;
    let sum = 6 + calc;

    for( let i = 0; i < 12; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 1 ){
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

    return digits;
}

function _genMasterCard23(){
    let digit = -1;
    let opts = [
        [ 2, 3 ], [ 2, 4 ], [ 2, 5 ], [ 2, 6 ]
    ];

    let digits = opts[ Math.floor( Math.random() * opts.length ) ];
    let sum = 4 + digits[1];

    for( let i = 0; i < 13; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 0 ){
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

    return digits;
}

function _genMasterCard270(){
    let digit = -1;
    let digits = [ 2, 7, 0 ];
    let sum = 11;

    for( let i = 0; i < 12; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 1 ){
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

    return digits;
}

function _genMasterCard271(){
    let digit = -1;
    let digits = [ 2, 7, 1 ];
    let sum = 13;

    for( let i = 0; i < 12; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 1 ){
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

    return digits;
}

function _genMasterCard2720(){
    let digit = -1;
    let digits = [ 2, 7, 2, 0 ];
    let sum = 15;

    for( let i = 0; i < 11; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 0 ){
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

    return digits;
}


/**
 * Discover Card
 * prefixes 6011, 644 to 649, 65
 * Lengths 16, 19
 *
 * TODO: need to implement the 19 length versions
 */
function genDiscoverCard() {
    let funcs = [ _genDiscoverCard6011_16, _genDiscoverCard644_16, _genDiscoverCard65_16 ];
    return funcs[ Math.floor( Math.random() * funcs.length ) ]();
}

function _genDiscoverCard6011_16(){
    let digit = -1;
    let digits = [ 6, 0, 1, 1 ];
    let sum = 6;

    for( let i = 0; i < 11; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 0 ){
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

    return digits;
}

function _genDiscoverCard644_16(){
    let digit = -1;
    let opts = [
        [ 6, 4, 4 ], [ 6, 4, 5 ], [ 6, 4, 6 ],
        [ 6, 4, 7 ], [ 6, 4, 8 ], [ 6, 4, 9 ]
    ];

    let digits = opts[ Math.floor( Math.random() * opts.length ) ];
    let calc = digits[2] > 4 ? ( digits[2] * 2 ) - 9 : digits[2] * 2;
    let sum = 7 + calc;

    for( let i = 0; i < 12; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 1 ){
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

    return digits;
}

function _genDiscoverCard65_16(){
    let digit = -1;
    let digits = [ 6, 5 ];
    let sum = 8;

    for( let i = 0; i < 13; ++i ){
        digit = Math.floor( Math.random() * 10 );
        digits.push( digit);
        if( i % 2 === 0 ){
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

    return digits;
}