/*
 *
 * product.js
 *
 * Purpose
 * Generate product documents
 *
 * NOTE: average document size is 2.6275390625 KB
 *
 */
'use strict';

let start = new Date().getTime();

// Module Imports
const fs = require('fs');

// Function Imports
const id = require('./constants.js');
const gen = require('./dataFunctions.js');
const enums = require('./../enums/enums-company.js');

// Importing Data
const companyNames = require("./../_sourceData/companyNames/onlyCompanyNames.json");

const domainNames = require("./../_sourceData/domainNames/domainNames_random.json");

// TODO: need to pick text source doc at random
const text = require("./../_sourceData/guttenberg/json/mtent13.json").paragraph;

let selectedParagraph = text[Math.floor(Math.random()*text.length)];
let words = text[Math.floor(Math.random()*text.length)].split(" ");

let schemaInfo = gen.schemaReference({ type:"company", version: 3 });

// const saveLocation = "D:\\repos\\fakeDataGenerator-js\\data\\company";
const saveLocation = "D:\\fakeData\\fakeDataGenerator-js\\tempData\\company";

// TODO: Need to figure out how to make addressIndex dynamic
// maybe each type save a json doc with metadata about what data it used and where it left off...
// create a function to generate each type of document and then write one script to go and generate all the data...

// NOTE: the starting position should be 55 in the address index.
// getting the starting point of addresses
let addressIndex = 0;
let addressFileIndex = 0;

let maxAddresses = id.maxNumOfAddresses * ( ( id.endCompanyId + 1 ) - id.startCompanyId );

let startingAddressCount = id.maxNumOfAddresses * ( ( id.endPersonId + 1 ) - id.startPersonId );

let endingAddressCount = startingAddressCount + maxAddresses;
let addressCount = 0;
let addressStartCount = 0;
let startIndex = 0;
let availableAddress = [];

let ai = require( "D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\addresses\\addressIndex.json" );

for( let i = 0; i < ai.length; ++i ){
    if( addressStartCount < startingAddressCount ){
        // console.log( "Finding where to start" );
        addressStartCount += ai[i].count;
        ++startIndex;
    } else if( addressCount + addressStartCount >= endingAddressCount ){
        // console.log( `ending here ${i}` );
        addressCount += ai[i].count;
        availableAddress.push( ai[i] );
        break;
    } else if( addressCount >= startingAddressCount ){
        // console.log( `Starting here ${i}` );
        addressCount += ai[i].count;
        availableAddress.push( ai[i] )
    }
}

// console.log( `Start Index: ${startIndex}` );
// console.log( `Max Address Count: ${maxAddresses.toLocaleString("en-US")}`);
// console.log( `Address Starting Count: ${startingAddressCount.toLocaleString("en-US")}`);
// console.log( `Ending Address: ${endingAddressCount.toLocaleString("en-US")}` );
// console.log( `Length of Available Address Array: ${availableAddress.length.toLocaleString("en-US")}` );
// console.log( `Address Count: ${addressCount.toLocaleString("en-US")}` );
// console.log( JSON.stringify( availableAddress ) );

console.log(`Getting Addresses`);

let addresses = require( availableAddress[ addressFileIndex ].path );

// console.log( `Number of address in memory: ${address.length}` );


// determining batch size
let docsPerFile = Math.floor( ( id.desiredBatchSizeInMB * 1024 )/id.avgCompanySizeInKB );
let batchIndex = 0;
let fileIndex = 0;
let data = [];

for(let i = id.startCompanyId; i < id.endCompanyId + 1; ++i){

    ++batchIndex;

    if( addressIndex + id.maxNumOfAddresses >= availableAddress[ addressFileIndex ].count - 1 ){
        // console.log( `Changing Address File to ${availableAddress[ addressFileIndex + 1 ].path}` );
        ++addressFileIndex;
        addresses = require( availableAddress[ addressFileIndex ].path );
        addressIndex = 0;
    }

// Generating Data
//    TODO: need to allow multiples of doingBusinessAs, subsidiaryOf, and parentCompanyOf.
//    TODO: after make change above update company.js in the _csv folder
    const info = gen.companyNameInfo({ data: companyNames });

// console.log(JSON.stringify(info));

    const phone = gen.phoneNumbers({
        baseObjectId: 800,
        id: i,
        enums: enums,
        delimiter: "-"
    });

// console.log(JSON.stringify(phone));

    let address = gen.address({
        baseObjectId: 900,
        id: i,
        address: addresses,
        index: addressIndex,
        enums: enums,
        maxNumOfAddresses: id.maxNumOfAddresses
    });

// console.log(JSON.stringify(address));

    let website = gen.websites({
        baseObjectId: 1000,
        id: i,
        enums: enums,
        domains : domainNames,
        scaler: 1000,
        maxWebsites: 4
    });

// console.log(website);

    let email = gen.companyEmails({
        baseObjectId: 1100,
        id: i,
        domain: website[0].url ? website[0].url : domainNames[Math.floor(Math.random()*domainNames.length)],
        enums: enums,
        numOfRecords: id.numOfRecords,
        percentages: [0.6, 0.3, 0.1],
        iteration: i
    });

// console.log(email);

    let paymentMethod = gen.paymentMethod({
        baseObjectId: 1200,
        id: i,
        maxPaymentMethods: 5,
        enums: enums,
        expirationStartDate: new Date(2010, 11, 21),
        expirationEndDate: new Date(2038, 11, 21),
        firstName: info.companyName,
        lastName: "",
        address: address.address
    });

// console.log(JSON.stringify(paymentMethod));

    let triples = gen.triples({
        baseObjectId: 1300,
        id: i,
        docType: "company",
        personIdEnd: id.endPersonId,
        personIdStart: id.startPersonId,
        companyIdEnd: id.endCompanyId,
        companyIdStart: id.startCompanyId,
        productIdEnd: id.endProductId,
        productIdStart: id.startProductId,
        orderIdEnd: id.endOrderId,
        orderIdStart: id.startOrderId
    });

// console.log(triples);

    let docHis = gen.docHistory({
        minPersonId: 1400,
        maxPersonId: id.endPersonId,
        id: i,
        baseObjectId: id.endCompanyId*7,
        enums: enums,
        startDateTime: new Date( 2000, 0, 1 )
    });

// console.log(docHis);

    let company = {
        "company": {
            "companyStatus":        enums.getCompanyStatus().companyStatus,
            "companyName":          info.companyName,
            "companyInformalName":  info.companyInformalName,
            "doingBusinessAs":    [ info.companyInformalName ],
            "subsidiaryOf": [ info.subsidiaryOf ],
            "parentCompanyOf": [ info.parentCompanyOf ],

            "phone": phone,

            "address": address.address,

            "email": email,

            "website": website,

            "paymentMethod": paymentMethod,

            "triple": triples,

            "metadata":{
                "docId": `${i}`,
                "docComment": selectedParagraph,
                "docKeywords": words.slice( 0, 4 ),
                "schemaId": schemaInfo.schemaId,
                "schemaVersion": schemaInfo.version,
                "docHistory": docHis
            }
        }
    };

    addressIndex = address.nextIteration;

    data.push( company );

// saving the document
    if( batchIndex === docsPerFile ){

        batchIndex = 0;

        fs.writeFileSync(
            `${saveLocation}\\company${fileIndex}.json`,
            JSON.stringify( data )
        );

        data = [];
        ++fileIndex;

    } else if( i === id.endCompanyId && data.length !== 0 ){
        fs.writeFileSync(
            `${saveLocation}\\company${fileIndex}.json`,
            JSON.stringify( data )
        );
    }
}

let end = new Date().getTime();
let iterationsPerSecond = ( ( ( id.endCompanyId - id.startCompanyId ) / ( end - start ) ) * 1000 ).toLocaleString('en-US');
console.log( `This generated ${ iterationsPerSecond } docs per second` );
