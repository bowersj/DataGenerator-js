/*
 *
 * product.js
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

const pathsToPersons = `D:\\repos\\fakeDataGenerator-js\\data\\product`;
const fileName = fs.readdirSync(pathsToPersons);


function buildMongoProduct (doc){

    let docHis = [];

    for(let i = 0; i < doc.metadata.docHistory.length; ++i){
        doc.metadata.docHistory[i].docEditDateTime = new Date(doc.metadata.docHistory[i].docEditDateTime)

        docHis[i] = doc.metadata.docHistory[i]
    }

    return {
        "product": {
            "productCode": doc.productCode,
            "productStatus": doc.productStatus,
            "productName": doc.productName,
            "productDescription": doc.productDescription,
            "productCategories": doc.productCategories,
            "productSubCategories": doc.productSubCategories,
            "productAvailabilityDate": new Date(doc.productAvailabilityDate),
            "productListPrice": doc.productListPrice,
            "productDiscountPrice": doc.productDiscountPrice,
            "productStandardCost": doc.productStandardCost,
            "productInventoryReorderLevel": doc.productInventoryReorderLevel,
            "productInventoryTargetLevel": doc.productInventoryTargetLevel,
            "productImages": doc.productImages,

            "vendor": { "vendorId": 1 },

            "productMeasure": doc.productMeasure,

            "productWebsite": doc.productWebsite,

            "productReviewSummary": doc.productReviewSummary,

            "productQA": doc.productQA,


            "triple": doc.triple,

            "metadata":{
                "docId": doc.metadata.docId,
                "docComment": doc.metadata.docComment,
                "docKeywords": doc.metadata.docKeywords,
                "schemaId": doc.metadata.schemaId,
                "schemaVersion": doc.metadata.schemaVersion,
                "docHistory": docHis
            }
        }
    }
}


// console.log( JSON.stringify( buildMongoPerson( require( `${pathsToPersons}\\${fileName[0]}` ).person ), null, 2 ) );


let dataToSave = [];

for(let i = 0; i < fileName.length; ++i){

    let doc = require( `${pathsToPersons}\\${fileName[i]}` ).product;

    dataToSave[i] = buildMongoProduct( doc )
}

// console.log( `Time to send the data to mongo.` );

// insert into mongo

let insertProductDocs = function( db, client, entries ){
    let collection = db.collection( 'product' );

    let bulkUpdateOpts = [];

    for(let i = 0; i < entries.length; ++i){
        bulkUpdateOpts[i] = { "insertOne": { "document": entries[i] } };

        if(bulkUpdateOpts.length === 1000){
            collection.bulkWrite( bulkUpdateOpts ).then( () => { console.log('Successfully inserted Product docs into MongoDB.') } );
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

    insertProductDocs(client.db('fakeData'), client, dataToSave)

}).catch((err) => {
    console.log(err)
});
