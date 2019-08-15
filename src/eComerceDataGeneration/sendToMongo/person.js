/*
 *
 * person.js
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

const pathsToPersons = `D:\\repos\\fakeDataGenerator-js\\data\\person`;
const fileName = fs.readdirSync(pathsToPersons);


function buildMongoPerson (doc){

    let customer = {
        "customerId": doc.customer.customerId,
        "status": doc.customer.status,
        "customerJoinDate": new Date( doc.customer.customerJoinDate ),
        "customerReviewerRank": doc.customer.customerReviewerRank
    };

    let paymentMethod = [];

    if( doc.paymentMethod[0] ){
        for(let i = 0; i < doc.paymentMethod.length; ++i){
            if( doc.paymentMethod[i].paymentMethodType === "Credit Card" ){
                doc.paymentMethod[i].creditCardExperiationDate = new Date( doc.paymentMethod[i].creditCardExperiationDate );
            }

            paymentMethod[i] = doc.paymentMethod[i];
        }
    }

    let docHis = [];

    for(let i = 0; i < doc.metadata.docHistory.length; ++i){
        doc.metadata.docHistory[i].docEditDateTime = new Date(doc.metadata.docHistory[i].docEditDateTime);

        docHis[i] = doc.metadata.docHistory[i]
    }

    let person = {
        person:{
            "personStatus": doc.personStatus,
            "personName": doc.personName,
            "personOnlineName": doc.personOnlineName,
            "personFirstName": doc.personFirstName,
            "personLastName": doc.personLastName,
            "personLegalName": doc.personLegalName,
            "personSortedName": doc.personSortedName,
            "personInformalLetterName": doc.personInformalLetterName,
            "personFormalLetterName": doc.personFormalLetterName,
            "personBirthDate": new Date( doc.personBirthDate ),
            "personGender": doc.personGender,
            "personEthnicity": doc.personEthnicity,
            "personShippingPreference": doc.personShippingPreference || null,

            "phone": doc.phone,

            "address": doc.address,

            "email": doc.email,

            "website": doc.website,

            "customer": customer,

            "paymentMethod": paymentMethod,

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
    };

    if(doc.middleName) person.person.personMiddleName = doc.middleName;
    if(doc.maidenName) person.person.personMaidenName = doc.maidenName;

    return person;
}



// console.log( JSON.stringify( buildMongoPerson( require( `${pathsToPersons}\\${fileName[0]}` ).person ), null, 2 ) );


let dataToSave = [];

for(let i = 0; i < fileName.length; ++i){

    let doc = require( `${pathsToPersons}\\${fileName[i]}` ).person;

    dataToSave[i] = buildMongoPerson( doc )
}

// console.log( `Time to send the data to mongo.` );

// insert into mongo

let insertPersonDocs = function( db, client, entries ){
    let collection = db.collection( 'person' );

    let bulkUpdateOpts = [];

    for(let i = 0; i < entries.length; ++i){
        bulkUpdateOpts[i] = { "insertOne": { "document": entries[i] } };

        if(bulkUpdateOpts.length === 1000){
            collection.bulkWrite( bulkUpdateOpts ).then( () => { console.log('Successfully inserted Person docs into MongoDB.') } );
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

    insertPersonDocs(client.db('fakeData'), client, dataToSave)

}).catch((err) => {
    console.log(err)
});
