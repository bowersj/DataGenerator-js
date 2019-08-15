/*
 *
 * person.js
 *
 * Purpose
 * Generate person documents
 *
 * NOTE: average document size is 3.1292317708333333333333333333333 KB
 *
 */
'use strict';

let start = new Date().getTime();

// Module Imports
const fs = require('fs');

// Function Imports
const id = require('./constants.js');
const gen = require('./dataFunctions.js');
const enums = require('./../enums/enums-person.js');

// Source Data Imports
const femaleFirstNames = require("./../_sourceData/names/femaleFirstNames.json");
const maleFirstNames   = require("./../_sourceData/names/maleFirstNames.json");
const lastNames        = require( "./../_sourceData/names/surnames.json" );

const domainNames = require("./../_sourceData/domainNames/domainNames_random.json");

// TODO: need to pick text source doc at random
const text = require("./../_sourceData/guttenberg/json/0drvb10.json").paragraph;

// const saveLocation = "D:\\repos\\fakeDataGenerator-js\\data\\person";
const saveLocation = "D:\\fakeData\\fakeDataGenerator-js\\tempData\\person";

// getting the starting point of addresses
let addressIndex = 0;
let addressFileIndex = 0;

let maxAddresses = id.maxNumOfAddresses * ( ( id.endPersonId + 1 ) - id.startPersonId );
let addressPriority = id.addressPriority.indexOf( "maxPersonAddresses" );

let startingAddressCount = 0;

if( addressPriority === -1 ){
    throw new TypeError('The provided addressPriority search value was not found.')
} else {
    for( let i = 0; i < addressPriority; ++i ){
        startingAddressCount += id[ id.addressPriority[ i ] ]
    }
}

let endingAddressCount = startingAddressCount + maxAddresses;
let addressCount = 0;
let addressStartCount = 0;
let availableAddress = [];

let ai = require( "D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\addresses\\addressIndex.json" );

for( let i = 0; i < ai.length; ++i ){
    if( addressStartCount < startingAddressCount ){
        // console.log( "Finding where to start" );
        addressStartCount += ai[i].count;
    } else if( addressCount >= endingAddressCount ){
        // console.log( `ending here ${i}` );
        addressCount += ai[i].count;
        availableAddress.push( ai[i] );
        break;
    } else if( addressStartCount >= startingAddressCount ){
        // console.log( `Starting here ${i}` );
        addressCount += ai[i].count;
        availableAddress.push( ai[i] )
    }
}

// console.log(`Max Address Count: ${maxAddresses}`);
// console.log(`Address Starting Count: ${startingAddressCount}`);
// console.log( `Ending Address: ${endingAddressCount.toLocaleString("en-US")}` );
// console.log( `Length of Available Address Array: ${availableAddress.length.toLocaleString("en-US")}` );
// console.log( `Address Count: ${addressCount.toLocaleString("en-US")}` );

console.log(`Getting Addresses`);

let addresses = require( availableAddress[ addressFileIndex ].path );

// console.log( `Number of address in memory: ${address.length}` );

// setup for batching
let docsPerFile = Math.floor( ( id.desiredBatchSizeInMB * 1024 )/id.avgPersonSizeInKB );
let batchIndex = 0;
let fileIndex = 0;
let data = [];

console.log( `Number of Docs per File: ${docsPerFile}` );
console.log( `Starting to generate Persons` );

for(let i = 0; i < id.endPersonId + 1; ++i){

    ++batchIndex;

    if( addressIndex + id.maxNumOfAddresses >= availableAddress[ addressFileIndex ].count - 1 ){
        // console.log( `Changing Address File to ${availableAddress[ addressFileIndex + 1 ].path}` );
        ++addressFileIndex;
        addresses = require( availableAddress[ addressFileIndex ].path );
        addressIndex = 0;
    }

    let birthDate = gen.date({start: new Date(1945,0, 1), end: new Date(2000, 0, 1)});
    let selectedParagraph = text[Math.floor(Math.random()*text.length)];
    let words = text[Math.floor(Math.random()*text.length)].split(" ");

    let schemaInfo = gen.schemaReference({ type:"person", version: 3 });

//console.log(schemaInfo);

    let femaleOrMale = Math.round( Math.random() ) === 0;

    let nameInfo = gen.personNameInfo({
        id: i,
        gender: femaleOrMale ? "female" : "male",
        middleName: Math.round( Math.random() ) === 0,
        data:{
            femaleFirstNames: femaleFirstNames,
            maleFirstNames: maleFirstNames,
            lastNames: lastNames,
            maidenName: Math.round( Math.random() ) === 0 && femaleOrMale
        }
    });

// console.log(nameInfo);

    let phone = gen.phoneNumbers({
        baseObjectId: 0,
        id: i,
        enums: enums,
        delimiter:"-"
    });

// console.log(phone);

    let address = gen.address({
        baseObjectId: 100,
        id: i,
        address: addresses,
        index: addressIndex,
        enums: enums,
        maxNumOfAddresses: id.maxNumOfAddresses
    });

// console.log(JSON.stringify(address));

    let email = gen.emails({
        baseObjectId: 200,
        id: i,
        enums: enums,
        name: nameInfo.firstName,
        numOfRecords: id.numOfRecords,
        percentages: [0.6, 0.3, 0.1],
        iteration: 0
    });

// console.log(email);

    let website = gen.websites({
        baseObjectId: 300,
        id: i,
        enums: enums,
        domains : domainNames,
        scaler: 1000,
        maxWebsites: 4
    });

// console.log(website);

    let customer = gen.customer({
        baseObjectId: 400,
        enums: enums,
        personId: i,
        reviewerRankScale: 10
    });

// console.log(customer);

    let paymentMethod = gen.paymentMethod({
        baseObjectId: 500,
        id: i,
        maxPaymentMethods: 5,
        enums: enums,
        expirationStartDate: new Date(2010, 11, 21),
        expirationEndDate: new Date(2038, 11, 21),
        firstName: nameInfo.firstName,
        lastName: nameInfo.lastName,
        address: address.address
    });

// console.log(JSON.stringify(paymentMethod));

    let triples = gen.triples({
        baseObjectId: 600,
        id: i,
        docType: "person",
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
        baseObjectId: 700,
        minPersonId: id.startPersonId,
        maxPersonId: id.endPersonId,
        id: i,
        enums: enums,
        startDateTime: gen.date({start: new Date( birthDate ), end: new Date() })
    });

// console.log(docHis);

// generating doc
// TODO: Add personNickName to person object
    let person = {
        person:{
            "personStatus": enums.getPersonStatus().personStatus,
            "personName": nameInfo.name,
            "personOnlineName": nameInfo.onlineName,
            "personFirstName": nameInfo.firstName,
            "personLastName": nameInfo.lastName,
            "personLegalName": nameInfo.legalName,
            "personSortedName": nameInfo.sortedName,
            "personInformalLetterName": nameInfo.informalLetterHead,
            "personFormalLetterName": nameInfo.formalLetterHead,
            "personBirthDate": birthDate,
            "personGender": enums.getPersonGender().personGender,
            "personEthnicity": enums.getPersonEthnicity().personEthnicity,
            "personShippingPreference": address.address.length > 0 ? address[Math.floor(Math.random()*(address.address.length-1))+1] : 0,

            "phone": phone,

            "address": address.address,

            "email": email,

            "website": website,

            "customer": customer,

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

    if(nameInfo.middleName) person.person.personMiddleName = nameInfo.middleName;
    if(nameInfo.maidenName) person.person.personMaidenName = nameInfo.maidenName;

    addressIndex = address.nextIteration;

    data.push( person );

    // if(batchIndex % 100 === 0){
    //     console.log( `Current Batch Number ${batchIndex}` );
    //     console.log( `Current Number of Docs Generated: ${batchIndex + ( docsPerFile * ( fileIndex + 1 ) )}` );
    //     console.log( `Current Address Index ${addressIndex}` );
    // }

    if( batchIndex === docsPerFile ){

        batchIndex = 0;

        // console.log( addressIndex );

        fs.writeFileSync(
            `${saveLocation}\\person${fileIndex}.json`,
            JSON.stringify( data )
        );

        data = [];
        ++fileIndex;

    // Account for if the number of docs does noe evenly divide by the batch size.
    } else if( i === id.endPersonId && data.length !== 0 ){

        // console.log( addressIndex );

        fs.writeFileSync(
            `${saveLocation}\\person${fileIndex}.json`,
            JSON.stringify( data )
        );

    }

}

let end = new Date().getTime();
let iterationsPerSecond = ( ( id.endPersonId / ( end - start ) ) * 1000 ).toLocaleString('en-US');
console.log( `This generated ${ iterationsPerSecond } docs per second` );
