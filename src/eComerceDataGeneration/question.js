/*
 * You will need to increase the heap size since the product data is greater than a gigabyte.
 *
 * node --max-old-space-size=8192 question.js
 *
 */
'use strict';

let start = new Date().getTime();

const fs = require( 'fs' );
const id = require('./constants.js');
const gen = require('./dataFunctions.js');
const questionIndex = require('D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\guttenberg\\simulatedQA\\questionIndex.json');

// TODO: need to update when generating actual data.
const productDir = 'D:\\fakeData\\fakeDataGenerator-js\\tempData\\product';

let qi = {};
let index = {};
let jsonDocs = [];

let questionId = id.startQuestionID;


// get index into a usable format
for(let i = 0; i < questionIndex.length; ++i){
    qi[ questionIndex[i].questionId ] = questionIndex[i].path;
}

// console.log( `Number of entries in the question index: ${questionIndex.length}` );
// console.log( `Number of entries in the reformatted question index: ${ Object.getOwnPropertyNames( qi ).length }` );


let productBatchDocs = fs.readdirSync(
    productDir,
    { withFileTypes: true }
);

// console.log( productBatchDocs );

// loop through each productBatch doc
for( let i = 0; i < productBatchDocs.length; ++i ){
    let productBatchName = productBatchDocs[i].name;
    jsonDocs = jsonDocs.concat( require( `${productDir}\\${productBatchName}` ) );
    // console.log( productBatch );

}

// console.log( batchedDocs.length );

for(let i = 0; i < jsonDocs.length; ++i){
    // build question id
    let qs = jsonDocs[i].product.productQA;
    let start = jsonDocs[i].product.productAvailabilityDate.split('-');

    for(let j = 0; j < qs.length; ++j){

        index[ qs[j].questionId ] = {
            questionId: qs[j].questionId.split("-").slice(0,2).join("-"),
            productId: jsonDocs[i].product.metadata.docId,
            newQuestionId: `${questionId}`,
            questionAskDate: gen.date({
                start: new Date( parseInt( start[0] ), parseInt( start[1] ), parseInt( start[2] )),
                end: new Date()
            })
        };

        ++questionId;
    }
    // get the path to question
    // get question
}

// fs.writeFileSync(
//     `D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\guttenberg\\simulatedQA\\index.json`,
//     JSON.stringify( index )
// );

jsonDocs = [];

// console.log( Object.getOwnPropertyNames( index ).length );
// console.log( Object.getOwnPropertyNames( qi ).length );

let indexKeys = Object.getOwnPropertyNames( index );

// this is where the generation of the question docs takes place
const qaSaveLocation = "D:\\fakeData\\fakeDataGenerator-js\\tempData\\qa";

let questionDocsPerFile = Math.floor( ( id.desiredBatchSizeInMB * 1024 )/id.avgQuestionSizeInKB );
let questionBatchIndex = 0;
let questionFileIndex = 0;
let questionData = [];


for(let i = 0; i < indexKeys.length; ++i ){

    ++questionBatchIndex;

    let question = {};

    let q = index[ indexKeys[i] ];
    let start = q.questionAskDate.split('-');
    let questionIdParts = indexKeys[i].split('-');
    let docIdIndex = questionIdParts.length - 1;
    let source = require( qi[ q.questionId ] );

    // console.log( JSON.stringify( questionIdParts ) );

    question.questionId = q.newQuestionId;
    question.questionDate = q.questionAskDate;
    question.productId = q.productId;
    question.question = source.question;
    question.answer = [];

    for( let j = 0; j < source.answer.length; ++j ){

        let ans = source.answer[j];

        // console.log( ans );

        ans.answerId = `${questionId}`;

        ans.answerDate = gen.date({
            start: new Date( parseInt( start[0] ), parseInt( start[1] ), parseInt( start[2] )),
            end: new Date()
        });

        question.answer.push( ans );
        ++questionId;
    }

    questionData.push( question );

    if( questionBatchIndex === questionDocsPerFile ){

        questionBatchIndex = 0;

        fs.writeFileSync(
            `${qaSaveLocation}\\qa${questionFileIndex}.json`,
            JSON.stringify( questionData )
        );

        questionData = [];
        ++questionFileIndex;

    } else if( i === indexKeys.length - 1 && questionData.length !== 0 ){
        fs.writeFileSync(
            `${qaSaveLocation}\\qa${questionFileIndex}.json`,
            JSON.stringify( questionData )
        );
    }

}

let end = new Date().getTime();
let diff = end - start;
let totalDocs = questionBatchIndex + ( questionDocsPerFile * ( questionFileIndex + 1 ) );

let seconds = ( diff / 1000 ).toFixed( 1 );
let minutes = ( diff / ( 60000 ) ).toFixed( 1 );    // 60000 = 1000 * 60
let hours   = ( diff / ( 3600000 ) ).toFixed( 1 );  // 3600000 = 1000 * 60 * 60

let iterationsPerSecond = ( ( totalDocs / ( diff ) ) * 1000 ).toLocaleString('en-US');
console.log( `This generated ${ iterationsPerSecond } docs per second` );
console.log( `This script took:\n  ${hours} Hours\n  ${minutes} Minutes\n  ${seconds} Seconds` );
