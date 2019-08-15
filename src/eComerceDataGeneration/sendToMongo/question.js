/*
 *
 * question.js
 *
 * Purpose
 * Load individual documents into mongodb using the bulk insert API.
 *
 *
 */
'use strict';

const fs = require('fs');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;


const url = 'mongodb://localhost:3141/';

const pathsToPersons = `D:\\repos\\fakeDataGenerator-js\\data\\qa`;
const fileName = fs.readdirSync(pathsToPersons);


function buildMongoQuestion (doc){

    let answer = [];

    for(let i = 0; i < doc.answer.length; ++i){
        doc.answer[i].answerDate = new Date( doc.answer[i].answerDate );

        answer[i] = doc.answer[i];
    }

    return {
        questionId: doc.questionId,
        productId: doc.productId,
        questionDate: new Date( doc.questionDate ),
        question: doc.question,
        answer: answer
    }
}


// console.log( JSON.stringify( buildMongoPerson( require( `${pathsToPersons}\\${fileName[0]}` ).person ), null, 2 ) );


let dataToSave = [];

for(let i = 0; i < fileName.length; ++i){

    let doc = require( `${pathsToPersons}\\${fileName[i]}` );

    dataToSave[i] = buildMongoQuestion( doc )
}

// console.log( `Time to send the data to mongo.` );

// insert into mongo

let insertQuestionDocs = function( db, client, entries ){
    let collection = db.collection( 'question' );

    let bulkUpdateOpts = [];

    for(let i = 0; i < entries.length; ++i){
        bulkUpdateOpts[i] = { "insertOne": { "document": entries[i] } };

        if(bulkUpdateOpts.length === 1000){
            collection.bulkWrite( bulkUpdateOpts ).then( () => { console.log('Successfully inserted Question docs into MongoDB.') } );
            bulkUpdateOpts = [];
        }
    }

    if( bulkUpdateOpts.length > 0 ){
        collection.bulkWrite( bulkUpdateOpts ).then( () => {
            console.log('Successfully inserted Person docs into MongoDB.');
            client.close()
                .then(() => { console.log('Mongo Client closed successfully.')})
                .catch((err) => {console.log(err)});
        } )
    }
};

MongoClient.connect(url, { useNewUrlParser: true }).then((client) => {

    insertQuestionDocs(client.db('fakeData'), client, dataToSave)

}).catch((err) => {
    console.log(err)
});
