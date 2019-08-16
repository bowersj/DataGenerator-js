/*
 * testJstat.js
 *
 * Purpose to see which is faster, to get a random number or use a jstat function
 *
 */
'use strict';

const jstat = require( 'jStat' );

const iterations = 10000000;

const jStatStart = new Date().getTime();
for( let i = 0; i < iterations; i++ ){
    jstat.rand(1, 2)[0];
}
const jStatEnd = new Date().getTime();

const jsStart = new Date().getTime();
for( let i = 0; i < iterations; i++ ){
    [ Math.random(), Math.random() ];
}
const jsEnd = new Date().getTime();


console.log(JSON.stringify({
    jstat: ( ( iterations / ( jStatEnd - jStatStart ) ) * 1000 ).toLocaleString('en-US'),
    js:    ( ( iterations / ( jsEnd - jsStart ) ) * 1000 ).toLocaleString('en-US'),
}));

