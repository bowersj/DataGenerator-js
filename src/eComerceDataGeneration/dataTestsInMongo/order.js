/*
 *
 * order.js
 *
 * Purpose
 * Test the order documents to make sure the data that is supposed to be correlated is correlated
 *
 *
 *
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
        let doc = db.collection('order').find().toArray();
        let lastDoc;
        
        for( let i = 0; i < doc.length; ++i ){
            if(!pass) break; 
            let od = new Date( doc[i].order.orderDate );

            // TODO: need to update to account for multiple order payments
            let opd = new Date( doc[i].order.orderPaymentDate );
            
            if( od < opd ){
                pass = false;
                reason = 'The data failed the order test.';
            }

            for(let j = 0; j < doc[i].order.product.length; ++j ){
                if(!pass) break;
                let shipDate = new Date( doc[i].order.product[j].productShippedDate );

                if(od < shipDate && opd < shipDate){
                    pass = false;
                    reason = "The data failed the order test.";
                }
            }
            lastDoc = doc[i]
        }

        if(reason === '' && !pass){
            reason = `something went wrong. But for some reason the date order test failed.`
        }

        if(!pass){
            console.log( reason );
            console.log( 'Make sure that the earliest date is the orderDate, then the orderPaymentDate, and then the productShippedDate.\nBelow is the doc that failed the test\n' );
            console.log( JSON.stringify( lastDoc, null, 2 ) )
        } else {
            console.log('The data passed the order dates test.\nNow checking to see if the orderDate is after every productAvailabilityDate in each product document.');
        }

        reason = '';

        // checking the orderDate is after every productAvailabilityDate in the product document
        for(let i = 0; i < doc.length; ++i ){
            if(!pass) break;

            let od = new Date( doc[i].order.orderDate );

            for(let j = 0; j < doc[i].product.length; ++j){
                if(!pass) break;

                let product = db.collection('product').find({ "product.metadata.docId": doc[i].product[j].productId }).toArray();

                if(product.length > 1) {
                    pass = false;
                    reason = `There was more than one product with ${doc[i].product[j].productId} as it's ID`;
                }

                if(od < new Date(product[0].productAvailabilityDate)){
                    pass = false;
                    reason = `The orderDate is after the productAvailabilityDate.`;
                }

            }
        }

        if(reason === '' && !pass){
            reason = `Something went wrong. But for some reason the orderDate is before the productAvailabilityDate.`
        }

        if(!pass){
            console.log( reason );
            console.log( JSON.stringify( lastDoc, null, 2 ) )
        } else {
            console.log('The data passed the orderDate after productAvailabilityDate test.');
        }

        client.close()
            .then( () => { console.log('\n\nFinished testing') } )
            .catch( (err) => { console.log(err) } )
    }
).catch((err)=>{ if(err) throw err });
