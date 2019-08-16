'use strict';

const fs = require('fs');


let data = fs.readFileSync( 'D:\\fakeData\\fakeDataGenerator-js\\tempData\\product\\product0.txt', 'utf8' );

data = data.split( String.fromCharCode( 30 ) );

let arr = [];

for( let i = 0; i < data.length; ++i ){
    let doc = JSON.parse( data[i] );

    if( !doc.product.productCode ){
        arr.push({ index: i })
    }
}

console.log( arr.length );
console.log( JSON.stringify( arr ) );