module.exports.batch = getRBatch_noParseInt;


let Benchmark = require( "benchmark" );


function getRBatch_noParseInt(){
    let digits = [];

    let num = Math.floor( Math.random() * Math.pow( 10, 16 ) );

    let digit = -1;

    while( num > 0 ){
        digit = num % 10;
        digits.push( digit );
        num = ( num - digit ) / 10;
        // num = parseInt( num / 10 );
    }

    return digits;
}


function getRBatch_parseInt(){
    let digits = [];

    let num = Math.floor( Math.random() * Math.pow( 10, 16 ) );

    let digit = -1;

    while( num > 0 ){
        // digit = num % 10;
        digits.push( num % 10 );
        // num = ( num - digit ) / 10;
        num = parseInt( num / 10 );
    }

    return digits;
}


// console.log( getRBatch_noParseInt() );
// console.log( getRBatch_parseInt() );


// let suite = new Benchmark.Suite;
//
// suite
//     .add( "===== WARM UP FOR getRBatch_noParseInt =====", function(){
//         getRBatch_noParseInt()
//     } )
//     .add( "===== WARM UP FOR getRBatch_parseInt =====", function(){
//         getRBatch_parseInt()
//     } )
//     .add( "===== getRBatch_noParseInt =====", function(){
//         getRBatch_noParseInt()
//     } )
//     .add( "===== getRBatch_parseInt =====", function(){
//         getRBatch_parseInt()
//     } )
//     .on( "complete", function(){
//         // console.log( this );
//         console.log( "And the fastest is... " + this.filter( "fastest" ).map( "name" ) );
//     } )
//     .run();