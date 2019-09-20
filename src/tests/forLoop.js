const stats = require( "./../stats/base.js" );
const perf = require( "./../dataGeneration/performance.js" );


function forLoop_naive( arr ){
    let temp = 0;
    for( let i = 0; i < arr.length; ++i ){
        temp += i;
    }
}


function forLoop_standard( arr ){
    let temp = 0;
    let l = arr.length;
    for( let i = 0; i < l; ++i ){
        temp += i;
    }
}


function test(){
    let itrs = 50000000;
    let tests = 100;
    let results = [];
    let res = {};

    let testArr = [];

    for( let i = 0; i < itrs; ++i ){
        testArr.push(i);
    }

    // warm up
    for( let i = 0; i < 100; ++i ){
        forLoop_naive( testArr );
    }

    for( let i = 0; i < 100; ++i ){
        forLoop_standard( testArr );
    }

    // test
    for( let i = 0; i < tests; ++i ){

        let start = new Date().getTime();

        forLoop_standard( testArr );

        let end = new Date().getTime();

        results.push( ( itrs / ( end - start ) ) * 1000 );
    }

    res.standard = perf.parseTestTimes( { results, samples: itrs } );

    results = [];

    for( let i = 0; i < tests; ++i ){

        let start = new Date().getTime();

        forLoop_naive( testArr );

        let end = new Date().getTime();

        results.push( ( itrs / ( end - start ) ) * 1000 );
    }

    res.naive = perf.parseTestTimes( { results, samples: itrs } );

    return res;
}

console.log( test() );