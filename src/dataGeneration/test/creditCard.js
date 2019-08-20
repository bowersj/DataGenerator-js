let stats = require( "./../../stats/base.js" );
let gen = require( "./../creditCard.js" );

let valid_credit_card = require( 'card-validator' );
let cc = gen.discoverCard();
console.log( cc );
console.log( cc.length );
console.log( valid_credit_card.number( cc.join( "" ) ) );

function _test( tests, samples, functionToTest ){
    let results = [];

    for( let j = 0; j < tests; ++j ){
        let start = new Date().getTime();

        for( let i = 0; i < samples; ++i ){
            functionToTest();
        }

        results.push( ( samples / ( new Date().getTime() - start ) ) * 1000 )
    }

    return results;
}

function parseTestTimes( arrOfNumbers ){
    return {
        avg: stats.getAverage( arrOfNumbers ).toLocaleString( "en-US" ),
        med: stats.getMedian( arrOfNumbers ).toLocaleString( "en-US" ),
        std: stats.getSampleStandardDeviation( arrOfNumbers ).toLocaleString( "en-US" )
    }
}

function runTests( test = 10, samples = 1000000 ){

    // warm up JIT compiler
    for( let i = 0; i < 100; ++i ){
        gen.visa();
    }

    for( let i = 0; i < 100; ++i ){
        gen.visaElectron();
    }

    for( let i = 0; i < 100; ++i ){
        gen.masterCard();
    }

    for( let i = 0; i < 100; ++i ){
        gen.discoverCard();
    }

    // test performance
    let visaTests = _test( test, samples, gen.visa );
    let visaElectronTests = _test( test, samples, gen.visaElectron );
    let masterCardTests = _test( test, samples, gen.masterCard );
    let discoverCardTests = _test( test, samples, gen.discoverCard );

    return {
        test,
        samples,
        visa: parseTestTimes( visaTests ),
        visaElectron: parseTestTimes( visaElectronTests ),
        masterCard: parseTestTimes( masterCardTests ),
        discoverCard: parseTestTimes( discoverCardTests ),
    };
}

console.log( runTests( 10, 4000000 ) );