const stats = require( "../../stats/base.js" );
const gen = require( "./creditCard.js" );

// let valid_credit_card = require( 'card-validator' );
// let cc = gen.hipercard();
// console.log( cc );
// console.log( cc.length );
// console.log( valid_credit_card.number( cc.join( "" ) ) );

//TODO: move to another module, same one as parseTestTimes function
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

// TODO: move to another module, consider naming that module performance.js
function parseTestTimes( arrOfNumbers, samples ){
    let avg = stats.getAverage( arrOfNumbers );
    let med = stats.getMedian( arrOfNumbers );
    let std = stats.getSampleStandardDeviation( arrOfNumbers );
    let potentiallyValid = ( avg < samples || med < samples ) && ( ( std * 3 ) > Math.abs( avg - med ) ) && ( std < avg/10 );
    return {
        avg: avg.toLocaleString( "en-US" ),
        med: med.toLocaleString( "en-US" ),
        std: std.toLocaleString( "en-US" ),
        potentiallyValid
    };
}

function runTests(tests = 10, samples = 1000000 ){

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
        gen.americanExpress();
    }

    for( let i = 0; i < 100; ++i ){
        gen.unionPay();
    }

    for( let i = 0; i < 100; ++i ){
        gen.maestro();
    }

    for( let i = 0; i < 100; ++i ){
        gen.elo();
    }

    for( let i = 0; i < 100; ++i ){
        gen.mir();
    }

    for( let i = 0; i < 100; ++i ){
        gen.hiper();
    }

    for( let i = 0; i < 100; ++i ){
        gen.hipercard();
    }

    for( let i = 0; i < 100; ++i ){
        gen.discoverCard();
    }

    console.log( "Testing Performance" );

    // tests performance
    let visaTests = _test( tests, samples, gen.visa );
    let visaElectronTests = _test( tests, samples, gen.visaElectron );
    let masterCardTests = _test( tests, samples, gen.masterCard );
    console.log( "25% complete..." );
    let discoverCardTests = _test( tests, samples, gen.discoverCard );
    let americanExpressTests = _test( tests, samples, gen.americanExpress );
    let testUnionPay = _test( tests, samples, gen.unionPay );
    console.log( "50% complete..." );
    let testMaestro = _test( tests, samples, gen.maestro );
    let testElo = _test( tests, samples, gen.elo );
    let testMir = _test( tests, samples, gen.mir );
    console.log( "75% complete..." );
    let testHiper = _test( tests, samples, gen.hiper );
    let testHiperCard = _test( tests, samples, gen.hipercard );
    console.log( "100% complete..." );
    console.log( "Building out Results" );

    return {
        test: tests,
        samples,
        visa: parseTestTimes( visaTests, samples ),
        visaElectron: parseTestTimes( visaElectronTests, samples ),
        masterCard: parseTestTimes( masterCardTests, samples ),
        americanExpress: parseTestTimes( americanExpressTests, samples ),
        discoverCard: parseTestTimes( discoverCardTests, samples ),
        unionPay: parseTestTimes( testUnionPay, samples ),
        maestro: parseTestTimes( testMaestro, samples ),
        elo: parseTestTimes( testElo, samples ),
        mir: parseTestTimes( testMir, samples ),
        hiper: parseTestTimes( testHiper, samples ),
        hipercard: parseTestTimes( testHiperCard, samples ),
    };
}

console.log( runTests( 10, 3000000 ) );
