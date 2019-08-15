/*
 *
 * product.js
 *
 * Purpose
 * Test the product documents to make sure the data that is supposed to be correlated is correlated
 *
 * TODO: check the frequency of the product names and product codes. This is to check for duplicates
 */
'use strict';

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:3141/';

let pass = true;
let reason = '';

MongoClient.connect( url, { useNewUrlParser: true } ).then(
    (client) => {
        let db = client.db('fakeData');

        // checking the order of dates within each order document
        let doc = db.collection('product').find().toArray();
        let lastDoc;

        for( let i = 0; i < doc.length; ++i ){
            if(!pass) break;

            for(let j = 0; j < doc[i].product.productQA.length; ++j ){
                if(!pass) break;

                let qa = db.collection('question').find({"questionId":doc[i].productQA[j].questionId}).count();

                if( qa > 1){
                    pass = false;
                    reason = "There are multiple question documents with the same docId.";
                } else if( qa === 0 ){
                    pass = false;
                    reason = "The question document does not exist.";
                }
            }
            lastDoc = doc[i]
        }

        if(reason === '' && !pass){
            reason = `something went wrong. But for some reason the question existence test failed.`
        }

        if(!pass){
            console.log( reason );
            console.log( 'Below is the doc that failed the test\n' );
            console.log( JSON.stringify( lastDoc, null, 2 ) )
        } else {
            console.log('The data passed the question existence test.');
        }

        client.close()
            .then( () => { console.log('\n\nFinished testing') } )
            .catch( (err) => { console.log(err) } )
    }

).catch((err)=>{ if(err) throw err });
