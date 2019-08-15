const fs = require('fs');

const path = 'D:\\fakeData\\fakeDataGenerator-js\\tempData\\qa\\qa5.txt';

const data = fs.readFileSync( path, 'utf8' ).split( String.fromCharCode( 30 ) );

console.log( data[ data.length - 1 ] );