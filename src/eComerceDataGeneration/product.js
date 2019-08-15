/*
 *
 * product.js
 *
 * Purpose
 * Generate product documents
 *
 * TODO: currently only produces one document. Need to specify amount to produce and then loop through it.
 * TODO: need to move questions out of this the product document and into there own doc type.
 *
 * NOTE: average product doc size is roughly:   4.4617706564360402991909632117234 KB
 * NOTE: average question doc size is roughly:  15.929466051417270929466051417271 KB
 *
 *
 * NOTE: had to clean up patent source data with the following regex commands
 *     \b\s{2,}\b
 *     \\n
 *
 */
'use strict';

let start = new Date().getTime();

// Module Imports
const fs = require('fs');

// Function Imports
const id = require('./constants.js');
const gen = require('./dataFunctions.js');
const enums = require('./../enums/enums-product.js');

// Data Imports
// Note that the format of the patent docs is a file containing multiple docs.
const patentsFile = require('D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\patents\\parsedData\\patentData.json');

// console.log(patentsFile[0]);

const domainNames = require("./../_sourceData/domainNames/domainNames_random.json");

// TODO: need to pick text source doc at random
const text = require("./../_sourceData/guttenberg/json/gn06v10.json").paragraph;

let schemaInfo = gen.schemaReference({ type:"product", version: 3 });

// question location information
let qi = require(`D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\guttenberg\\simulatedQA\\questionIndex.json`);

// TODO: need to figure out realistic number for max number of questions.
let maxNumOfQuestions = 25;

let nextQuestionIndex = 0;

// const productSaveLocation = "D:\\fakeData\\fakeDataGenerator-js\\data\\product";
// const qaSaveLocation = "D:\\fakeData\\fakeDataGenerator-js\\data\\qa";

const productSaveLocation = "D:\\fakeData\\fakeDataGenerator-js\\tempData\\product";

const logFileLocation = "D:\\fakeData\\fakeDataGenerator-js\\_sourceData\\patents\\debugging.txt";

// setup for getting patent data
let patentOffset = id.startProductId;
let patentFileIndex = 0;
let patentFile = require( patentsFile[0] );
let currentPatentIndex = 0;
let patent = {};

// setup for batching
let productDocsPerFile = Math.floor( ( id.desiredBatchSizeInMB * 1024 )/id.avgProductSizeInKB);
let productBatchIndex = 0;
let productFileIndex = 0;
let productData = [];

// console.log( productDocsPerFile );

for(let i = id.startProductId; i < id.endProductId + 1; ++i){

    ++productBatchIndex;

// Generate Data
    // Note that the file contains more than one patent document.
    // console.log( patentFile.length );
    // console.log( i );

    // get patent batch file
    if( currentPatentIndex >= patentFile.length - 1 ){

        patentOffset = i + 1;
        ++patentFileIndex;
        patentFile = require( patentsFile[patentFileIndex] );
        currentPatentIndex = 0;

    }

    patent = patentFile[ currentPatentIndex ];
    ++currentPatentIndex;

    let date = gen.date({start: new Date(2008, 0, 1), end: new Date()});

    const info = gen.productInfo({
        code: patent.patentId,
        name: patent.patentName,
        description: patent.patentDescription,
        keywords: patent.patentKeyword,
        images: patent.patentImg
    });

// console.log(JSON.stringify( info ));

    const lists = enums.getProductCategoriesAndSubCategories();

// TODO: should enforce an order in the array.
    const measure = gen.productMeasures({
        baseObjectId: 1500,
        id: i,
        enums: enums,
        maxProductMeasurements: 3
    });

// console.log(JSON.stringify(measure));

    const website = gen.websites({
        baseObjectId: 1600,
        id: i,
        enums: enums,
        domains: domainNames,
        scaler: 1000,
        maxWebsites: 4
    });

// console.log(JSON.stringify(website));

    const reviewSummary = gen.productReviewSummary();

// console.log(JSON.stringify(reviewSummary));

    const triples = gen.triples({
        baseObjectId: 1700,
        id: i,
        docType: "product",
        personIdEnd: id.endPersonId,
        personIdStart: id.startPersonId,
        companyIdEnd: id.endCompanyId,
        companyIdStart: id.startCompanyId,
        productIdEnd: id.endProductId,
        productIdStart: id.startProductId,
        orderIdEnd: id.endOrderId,
        orderIdStart: id.startOrderId
    });

// console.log(JSON.stringify(triples));

    const docHis = gen.docHistory({
        baseObjectId: 1800,
        minPersonId: id.startPersonId,
        maxPersonId: id.endPersonId,
        id: 2,
        enums: enums,
        startDateTime: new Date( date )
    });

// console.log(JSON.stringify(docHis));

    // getting questions
    // need to figure out how to have it delete the contents of the folder if there is any
    // see  https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty  for an example of how to
    // remove all file beneath a directory
    let arrayOfQuestions = [];

    let numOfQuestions = Math.floor(Math.random()*maxNumOfQuestions);
    let index = 0;

    // TODO: need to figure out how to speed up generating products
    // possibility to only reference question ids and create a question script to
    // generate the actual question documents... Problem is that it will still be slow.
    // possibility to figure out a parallelization to generate these in parallel.
    // convert to async saving functions, which should work since I do not need to reference
    // documents already generated.

    // TODO: Need to make question Ids unique!!!
    // the simplest way would be to just add a -i where i is the docId.
    // This way every question will have a unique id

    // TODO: Need to make answer Ids unique!!!
    // the simplest way would be to just add a -i where i is the docId.
    // This way every question will have a unique id
    for(let j = 0; j < numOfQuestions; ++j){

        index = nextQuestionIndex + j;

        arrayOfQuestions.push({ questionId: `${qi[index].questionId}-${i}` });

    }

    let selectedParagraph = text[Math.floor(Math.random()*text.length)];
    let words = text[Math.floor(Math.random()*text.length)].split(" ");

    nextQuestionIndex = nextQuestionIndex + index + maxNumOfQuestions < qi.length ? nextQuestionIndex + index : 0;

    let product = {
        "product": {
            "productCode": info.productCode,
            "productStatus": enums.getProductStatus().productStatus,
            "productName": info.productName,
            "productDescription": patent.patentDescription,
            "productCategories": lists.category,
            "productSubCategories": lists.subCategory,
            "productAvailabilityDate": date,
            "productListPrice": info.productListPrice,
            "productDiscountPrice": info.productDiscountPrice,
            "productStandardCost": info.productStandardCost,
            "productInventoryReorderLevel": info.productInventoryReorderLevel,
            "productInventoryTargetLevel": info.productInventoryTargetLevel,
            "productImages": info.productImages,

            "vendor": { "vendorId": Math.floor(Math.random()*(id.endProductId - id.startProductId)) + id.startProductId },

            "productMeasure": measure,

            "productWebsite": website,

            "productReviewSummary": reviewSummary,

            "productQA": arrayOfQuestions,


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

    productData.push( product );

// saving the document
    if( productBatchIndex === productDocsPerFile ){

        productBatchIndex = 0;

        fs.writeFileSync(
            `${productSaveLocation}\\product${productFileIndex}.json`,
            JSON.stringify( productData )
        );

        productData = [];
        ++productFileIndex;

    } else if( i === id.endProductId && productData.length !== 0 ){
        fs.writeFileSync(
            `${productSaveLocation}\\product${productFileIndex}.json`,
            JSON.stringify( productData )
        );
    }
}

let end = new Date().getTime();
let diff = end - start;

let seconds = ( diff / 1000 ).toFixed( 1 );
let minutes = ( diff / ( 60000 ) ).toFixed( 1 );    // 60000 = 1000 * 60
let hours   = ( diff / ( 3600000 ) ).toFixed( 1 );  // 3600000 = 1000 * 60 * 60

let iterationsPerSecond = ( ( (id.endProductId - id.startProductId) / ( diff ) ) * 1000 ).toLocaleString('en-US');
console.log( `This generated ${ iterationsPerSecond } docs per second` );
console.log( `This script took:\n  ${hours} Hours\n  ${minutes} Minutes\n  ${seconds} Seconds` );
