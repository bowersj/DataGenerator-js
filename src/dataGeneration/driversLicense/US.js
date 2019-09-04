// how to format for different states
// https://ntsi.com/drivers-license-format/

//for additional information see this website
// http://www.highprogrammer.com/alan/numbers/dl_us_shared.html
//
// International Drivers License
// Explanation of UK driver license format
// https://stackoverflow.com/questions/45493570/validate-uk-driving-license-regex-in-javascript#answer-46447128
const utils = require( "./../utils.js" );

module.exports = {
    alabama: numericLicense_helper.bind( null, 7 ),
    alaska: numericLicense_helper.bind( null, 7 ),
    // arizona:
};


const firstNameEncoding = {
    ALBERT: 20,	    FRANK: 260,	    MELVIN: 600,
    ALICE: 20,	    GEORGE: 300,	MILDRED: 600,
    ANN: 40,	    GRACE: 300,	    PATRICIA: 680,
    ANNA: 40,	    HAROLD: 340,	PAUL: 680,
    ANNE: 40,	    HARRIET: 340,	RICHARD: 740,
    ANNIE: 40,	    HARRY: 360,	    ROBERT: 760,
    ARTHUR: 40,	    HAZEL: 360,	    RUBY: 740,
    BERNARD: 80,    HELEN: 380,	    RUTH: 760,
    BETTE: 80,	    HENRY: 380,	    THELMA: 820,
    BETTIE: 80,	    JAMES: 440,	    THOMAS: 820,
    BETTY: 80,	    JANE: 440,	    WALTER: 900,
    CARL: 120,	    JAYNE: 440,	    WANDA: 900,
    CATHERINE: 120,	JEAN: 460,	    WILLIAM: 920,
    CHARLES: 140,	JOAN: 480,	    WILMA: 920,
    DORTHY: 180,	JOHN: 460,
    EDWARD: 220,	JOSEPH: 480,
    ELIZABETH: 220,	MARGRET: 560,
    FLORENCE: 260,	MARTIN: 560,
    DONALD: 180,    MARVIN: 580,
    CLARA: 140,     MARY: 580,

};

const firstNameEncodingFallback = {
    A: 0,	H: 320,	O: 640,	V: 860,
    B: 60,	I: 400,	P: 660,	W: 880,
    C: 100,	J: 420,	Q: 700,	X: 940,
    D: 160,	K: 500,	R: 720,	Y: 960,
    E: 200,	L: 520,	S: 780,	Z: 980,
    F: 240,	M: 540,	T: 800,
    G: 280,	N: 620,	U: 840,
};

const middleInitial = {
    A: 1, H: 8, O: 14, V: 18,
    B: 2, I: 9, P: 15, W: 19,
    C: 3, J: 10, Q: 15, X: 19,
    D: 4, K: 11, R: 16, Y: 19,
    E: 5, L: 12, S: 17, Z: 19,
    F: 6, M: 13, T: 18,
    G: 7, N: 14, U: 18,
};


function encode( code, fallback, val ){
    let _code = code[val];

    if( _code === undefined )
        return fallback[ val ];

    return _code;
}


function lastTwoDigitsOfBirthYear( year ){
    let digits = [ utils.getDigit( year, 1 ), utils.getDigit( year, 0 ) ];
    return digits[0] * 10 + digits[1];
}


// console.log( lastTwoDigitsOfBirthYear( 1991 ) );
// console.log( lastTwoDigitsOfBirthYear( 99 ) );


function monthDayGenderEncoding_general( month, day, monthMultiplier, gender, genderEncoding ){
    return ( month - 1 ) * monthMultiplier + day + genderEncoding[ gender ]
}


function numericLicenseRange_helper( min, max ){

}


function numericLicense_helper( numOfDigits ){
    let license = [ Math.floor( Math.random() * 9 ) + 1 ];

    for( let i = 0; i < numOfDigits - 1; ++i ){
        license.push( Math.floor( Math.random() * 10 ) );
    }

    return license;
}
