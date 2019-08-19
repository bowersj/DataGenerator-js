let Benchmark = require( "benchmark" );
let random = require( "./rBatch.js" );

const getAverage = function( array ){
    if( !Array.isArray(array) ) throw new TypeError('You did not pass in an array');

    let sum = array.reduce( ( sum, value ) => {
        return sum + value;
    });

    return sum/( array.length );
};


const getMedian = function( array ){
    // just a quick refresher
    // median is the middle number when the sample count is odd
    // when the sample count is even it is the average of the two middle numbers
    if( !Array.isArray(array) ) throw new TypeError('You did not pass in an array');

    let median = 0;
    let count  = array.length;
    let sortedArray = array.sort();

    if( count % 2 === 0 ){
        // sample count is even
        median = ( sortedArray[ count/2 - 1 ] + sortedArray[ count/2 ] ) / 2;
    } else {
        // sample count is odd
        median = sortedArray[ ( count - 1 ) / 2 ];
    }

    return median
};


const getSampleStandardDeviation = function( array ){
    // just a quick refresher
    // sampleStandardDeviation = sqrt( 1/(n-1) * sum from 1 to N of (x - xbar)^2 )
    // where n is the sample size, x is each observation, and xbar is the sample average.
    // This function is what should be ued unless you know you have all of your populations data.
    if( !Array.isArray(array) ) throw new TypeError('You did not pass in an array');
    // console.log( array );

    let avg = getAverage( array );
    // console.log( avg );

    let squareDiffs = array.map( ( value ) => { return Math.pow( ( value - avg ), 2) });
    // console.log(squareDiffs);

    let sumOfSquareDiffs = squareDiffs.reduce( (a, b) => { return a + b }, 0 );

    // console.log( sumOfSquareDiffs );

    let sampleVariance = sumOfSquareDiffs/( array.length - 1 );

    // console.log( sampleVariance );

    return Math.sqrt( sampleVariance );
};

function test( tests= 10, itrs = 10000000 ){
    let nums = [];
    let rBatch = [];
    for( let i = 0; i < itrs; ){
        rBatch = random.batch();
        [].push.apply( nums, rBatch );
        // random.batch does not always return the same number of digits
        i += rBatch.length;
    }
    // console.log( nums.length );

    // warming up v8

    for( let i = 0; i < 100; ++i ){
        Math.floor( nums[i] )
    }

    for( let i = 0; i < 100; ++i ){
        Math.ceil( nums[i] )
    }

    // running tests
    let floorTests = [];
    let ceilTests = [];

    let start = 0;

    for( let j = 0; j < tests; ++j ){
        start = new Date().getTime();

        for( let i = 0; i < nums.length; ++i ){
            Math.floor( nums[i] );
        }

        floorTests.push( ( nums.length / ( new Date().getTime() - start ) ) * 1000 );
    }

    start = 0;

    for( let j = 0; j < tests; ++j ){
        start = new Date().getTime();

        for( let i = 0; i < nums.length; ++i ){
            Math.ceil( nums[i] );
        }

        ceilTests.push( ( nums.length / ( new Date().getTime() - start ) ) * 1000 );
    }

    // build results analysis
    let floor = {
        avg: getAverage( floorTests ).toLocaleString( "en-US" ),
        median: getMedian( floorTests ).toLocaleString( "en-US" ),
        std: getSampleStandardDeviation( floorTests ).toLocaleString( "en-US" )
    };
    let ceil  = {
        avg: getAverage( ceilTests ).toLocaleString( "en-US" ),
        median: getMedian( ceilTests ).toLocaleString( "en-US" ),
        std: getSampleStandardDeviation( ceilTests ).toLocaleString( "en-US" )
    };

    return { floor, ceil }
}

console.log( JSON.stringify( test(20 ), null, 2 ) );