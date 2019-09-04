/**
 * To use make sure to update path
 *
 * const perf = require( "./../performance.js" );
 *
 */
module.exports.test = test;
module.exports.parseTestTimes = parseTestTimes;
module.exports.runTests = runTests;

const stats = require( "./../stats/base.js" );


/**
 * @function test
 * @version 1.0.2
 * @public
 *
 * With in nested for loops executes the provided function.
 * Results are not stored. Results are not verified.
 * This is a raw performance test
 *
 * @param {Number} tests - the number of times to execute the number of samples.
 * @param {Number} samples - the number of times to execute functionToTest
 * @param {Function} func - the function to be tested
 *
 * @example perf.test( 10, 1000000, () => Math.random() )
 *
 * Note: to get total num of iterations take the number of tests times the number of samples.
 */
function test({ tests, samples, func }){
    let results = [];

    for( let j = 0; j < tests; ++j ){
        let start = new Date().getTime();

        for( let i = 0; i < samples; ++i ){
            func();
        }

        results.push( ( samples / ( new Date().getTime() - start ) ) * 1000 )
    }

    return results;
}


function parseTestTimes({ results, samples }){
    let avg = stats.getAverage( results );
    let med = stats.getMedian( results );
    let std = stats.getSampleStandardDeviation( results );
    // let
    let potentiallyValid = ( avg < samples || med < samples ) && ( ( std * 3 ) > Math.abs( avg - med ) ) && ( std < avg / 10 );
    let res = {
        avg: avg.toLocaleString( "en-US" ),
        med: med.toLocaleString( "en-US" ),
        std: std.toLocaleString( "en-US" ),
        potentiallyValid
    };

    if( potentiallyValid === false ){
        if( avg > samples || med > samples )
            res.message = "More samples needed";
        else if( ( std * 3 ) < Math.abs( avg - med ) )
            res.message = "The distribution of test times is skewed";
        else if( std > avg / 10 )
            res.message = "The standard deviation is too large.";
    }

    return res;
}

function runTests( funcsToTest, opts = {} ){
    opts = Object.assign( { tests: 10, samples: 1000000 }, opts );

    // warm up JIT compiler
    for( let i = 0; i < funcsToTest.length; ++i ){
        for( let j = 0; j < 100; ++j ){
            funcsToTest[i].func();
        }
    }

    // execute tests
    let percent = Math.ceil( funcsToTest.length / 4 );
    let inc = 0;
    let percents = [ "25%", "50%", "75%", "95%" ];
    let res = [];
    for( let i = 0; i < funcsToTest.length; ++i ){
        res.push({ results: test({ tests: opts.tests, samples: opts.samples, func:funcsToTest[i].func }), testName: funcsToTest[i].name, samples: opts.samples });
        if( i % percent === 0 ){
            console.log( `${percents[ inc ]} completed...` );
            ++inc;
        }
    }
    console.log( "Building Test Metrics..." );

    let result = Object.assign( {}, opts );
    for( let i = 0; i < res.length; ++i ){
        result[ res[i].testName ] = parseTestTimes( res[i] );
    }

    return result;
}