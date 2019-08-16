/*
 *
 * product.js
 *
 * Purpose
 * Generate question documents
 *
 *
 */
'use strict';

const fs = require('fs');
const gen = require('../dataFunctions.js');

const pathToSourceData = `D:\\repos\\fakeDataGenerator-js\\_sourceData\\guttenberg\\simulatedQA\\qa`;
const saveLocation = `D:\\repos\\fakeDataGenerator-js\\_sourceData\\guttenberg\\simulatedQA\\individualQa`;

// get list of all question files
let fileName = fs.readdirSync( pathToSourceData );

// console.log(fileNames);

// generate QA docs

for(let i = 0; i < fileName.length; ++i){
    let QA = require(`${pathToSourceData}\\${fileName[i]}`);

    for(let j = 0; j < QA.length; ++j){

        fs.writeFileSync(`${saveLocation}\\qa-${i}${j}.json`, JSON.stringify( QA[j] ) )

    }

    QA = {};
}

// console.log(QA);

// console.log(date);

// for( let j = 0; j < QA.length; ++j ){
//     for(let k = 0; k < QA[j].answer.length; ++k){
//         QA[j].answer[k].answerDate = gen.date({start: new Date(date), end: new Date()});
//     }
// }

// console.log(JSON.stringify(QA[107].answer[1].answerDate));