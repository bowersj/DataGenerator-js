'use strict';

const fs = require('fs');

const textPersons = fs.readFileSync( 'D:\\repos\\fakeDataGenerator-js\\tempData\\company\\company0.txt', 'utf8' );

// console.log(textPersons);

const persons = textPersons.split( String.fromCharCode( 30 ) );

console.log( `person1.txt contains ${persons.length} company documents` );

let json = JSON.parse( persons[persons.length - 1] );

// console.log( JSON.stringify( json, null, 2 ) );