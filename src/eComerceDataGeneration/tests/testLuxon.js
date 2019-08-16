'use strict';

const {DateTime} = require('luxon');

const iterations = 1000000;


let start = new Date().getTime();

for(let i = 0; i < iterations; i++){
    DateTime.fromISO("2017-12-25");
}

let end = new Date().getTime();


let start2 = new Date().getTime();

for(let i = 0; i < iterations; i++){
    DateTime.local();
}

let end2 = new Date().getTime();


let start3 = new Date().getTime();

for(let i = 0; i < iterations; i++){
    DateTime.fromISO("2016-09-29").diff( DateTime.local() );
}

let end3 = new Date().getTime();


let results = {
    fromISO:( ( iterations / ( end - start ) ) * 1000 ).toLocaleString('en-US'),
    local: ( ( iterations / ( end2 - start2 ) ) * 1000 ).toLocaleString('en-US'),
    diffCreate: ( ( iterations / ( end3 - start3 ) ) * 1000 ).toLocaleString('en-US'),
};

console.log(JSON.stringify( results ));
