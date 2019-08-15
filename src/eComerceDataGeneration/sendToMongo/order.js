/*
 *
 * order.js
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

const pathsToPersons = `D:\\repos\\fakeDataGenerator-js\\data\\order`;
const fileName = fs.readdirSync(pathsToPersons);


function buildMongoOrder (doc){

    let product =[];

    for(let i = 0; i < doc.product.length; ++i){
        doc.product[i].productShippedDate = new Date( doc.product[i].productShippedDate );
        product[i] = doc.product[i];

    }

    let orderPayment =[];

    for(let i = 0; i < doc.orderPayment.length; ++i){
        doc.orderPayment[i].orderPaymentDate = new Date( doc.orderPayment[i].orderPaymentDate );
        orderPayment[i] = doc.orderPayment[i];

        if(doc.orderPayment[i].orderPaymentMethod.paymentMethodType === "Credit Card"){
            doc.orderPayment[i].orderPaymentMethod.creditCardExperiationDate = new Date(doc.orderPayment[i].orderPaymentMethod.creditCardExperiationDate)
        }
    }

    let docHis = [];

    for(let i = 0; i < doc.metadata.docHistory.length; ++i){
        doc.metadata.docHistory[i].docEditDateTime = new Date(doc.metadata.docHistory[i].docEditDateTime);

        docHis[i] = doc.metadata.docHistory[i]
    }

    return {
        "order": {
            "orderNumber": doc.orderNumber,
            "orderDate": doc.orderDate,
            "orderStatus": doc.orderStatus,
            "customer": {"customerId": doc.customer.customerId, "historicalCustomerName": doc.customer.historicalCustomerName},

            "orderShipment": {
                "shipmentTrackingNumber": doc.orderShipment.shipmentTrackingNumber,
                "shipmentMethod": doc.orderShipment.shipmentMethod,
                "shipmentCost": doc.orderShipment.shipmentCost,
                "shipmentNotes": doc.orderShipment.shipmentNotes
            },

            "orderShippingAddress": {
                "addressStreet": doc.orderShippingAddress.addressStreet,
                "addressLocality": doc.orderShippingAddress.addressLocality,
                "addressRegion": doc.orderShippingAddress.addressRegion,
                "addressPostalCode": doc.orderShippingAddress.addressPostalCode,
                "addressCountry": doc.orderShippingAddress.addressCountry
            },

            "product": product,

            "orderTotals": {
                "totalOrderItemCost": doc.orderTotals.totalOrderCost,
                "orderShippingCost": doc.orderTotals.orderShippingCost,
                "orderShippingCostCredit": doc.orderTotals.orderShippingCostCredit,
                "orderSalesTax": doc.orderTotals.orderSalesTax,
                "totalOrderCost": doc.orderTotals.totalOrderCost
            },

            "orderPayment": orderPayment,

            "triple": doc.triple,

            "metadata": {
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

    let doc = require( `${pathsToPersons}\\${fileName[i]}` ).order;

    dataToSave[i] = buildMongoOrder( doc )
}

// console.log( `Time to send the data to mongo.` );

// insert into mongo

let insertOrderDocs = function( db, client, entries ){
    let collection = db.collection( 'order' );

    let bulkUpdateOpts = [];

    for(let i = 0; i < entries.length; ++i){
        bulkUpdateOpts[i] = { "insertOne": { "document": entries[i] } };

        if(bulkUpdateOpts.length === 1000){
            collection.bulkWrite( bulkUpdateOpts ).then( () => { console.log('Successfully inserted Order docs into MongoDB.') } );
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

    insertOrderDocs(client.db('fakeData'), client, dataToSave)

}).catch((err) => {
    console.log(err)
});
