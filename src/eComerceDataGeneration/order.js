// When working with payment method information do not forget to account for if there are now associated payment methods

/*
 *
 * product.js
 *
 * Purpose
 * Generate product documents
 *
 * NOTE: average document size is 2.6560546875 KB
 *
 */
'use strict';

const start = new Date().getTime();

// Module Imports
const fs = require('fs');

// Function Imports
const id = require('./constants.js');
const gen = require('./dataFunctions.js');
const enums = require('./../enums/enums-order.js');

// const pathToPersonDocs = `D:\\fakeData\\fakeDataGenerator-js\\data\\person`;
// const pathToProductDocs = `D:\\fakeData\\fakeDataGenerator-js\\data\\product`;
// const pathToCompanyDocs = `D:\\fakeData\\fakeDataGenerator-js\\data\\company`;

const pathToPersonDocs = `D:\\fakeData\\fakeDataGenerator-js\\tempData\\person`;
const pathToProductDocs = `D:\\fakeData\\fakeDataGenerator-js\\tempData\\product`;
// const pathToCompanyDocs = `D:\\fakeData\\fakeDataGenerator-js\\tempData\\company`;

let personDocs  = fs.readdirSync(pathToPersonDocs,  { withFileTypes: true });
let productDocs = fs.readdirSync(pathToProductDocs, { withFileTypes: true });
// let companyDocs = fs.readdirSync(pathToCompanyDocs, { withFileTypes: true });

// TODO: need to pick text source doc at random
let text = require("./../_sourceData/guttenberg/json/jbunc10.json").paragraph;

// console.log( JSON.stringify( personDocs ) );

let personIndexInFile = 0;
let productIndexInFile = 0;
// let companyIndexInFile = 0;

let maxPersonsFromFile = 0;
let maxProductsFromFile = 0;
// let maxCompaniesFromFile = 0;

let personFile = [];
let productFile = [];
// let companyFile = [];

const personScaler = ( id.endPersonId - id.startPersonId + 1 )/( id.endOrderId - id.startOrderId + 1 );
const productScaler = ( id.endProductId - id.startProductId + 1 )/( id.endOrderId - id.startOrderId + 1 );
// const companyScaler = ( id.endCompanyId - id.startCompanyId + 1 )/( id.endOrderId - id.startOrderId + 1 );

const saveLocation = "D:\\fakeData\\fakeDataGenerator-js\\tempData\\order";


// setup for batching
let docsPerFile = Math.floor( ( id.desiredBatchSizeInMB * 1024 )/id.avgPersonSizeInKB );
let batchIndex = 0;
let fileIndex = 0;
let data = [];

for(let i = id.startOrderId; i < id.endOrderId + 1; ++i){
    // Getting required documents to generate an accurate order

    ++batchIndex;

    // Picking random source data
    if( personIndexInFile >= maxPersonsFromFile ){
        let pIndex = Math.floor( Math.random() * personDocs.length );

        personFile = require( `${pathToPersonDocs}\\${personDocs[ pIndex ].name}` );
        personIndexInFile = 0;
        maxPersonsFromFile = personFile.length * personScaler;

        // This will always return at least one. That one is the same every time.
        // if personDocs = [ "person29" ] the after the next line it would be personDocs = [ "person29" ]
        personDocs = ( personDocs.slice( 0, pIndex ) ).concat( personDocs.slice( pIndex + 1, personDocs.length ) )
    }

    if( productIndexInFile >= maxProductsFromFile ){
        let pIndex = Math.floor( Math.random() * productDocs.length );

        productFile = require( `${pathToProductDocs}\\${productDocs[ pIndex ].name}` );
        productIndexInFile = 0;
        maxProductsFromFile = productDocs.length * productScaler;

        // This will always return at least one. That one is the same every time.
        // if productDocs = [ "product29" ] the after the next line it would be productDocs = [ "product29" ]
        productDocs = ( productDocs.slice( 0, pIndex ) ).concat( productDocs.slice( pIndex + 1, productDocs.length ) )
    }

    let personRanNum  = Math.floor(Math.random()*personFile.length);

    const person  = personFile[ personRanNum ].person;

    let selectedParagraph = text[Math.floor(Math.random()*text.length)];
    let words = text[Math.floor(Math.random()*text.length)].split(" ");

    let personStartDate = person.customer.customerJoinDate.split("-");


    const shippingVariance = id.baseShippingPrice * id.shippingVarianceScaler;
    const shippingCreditVariance = (1 - shippingVariance);

    let triples = gen.triples({
        baseObjectId: 1900,
        id: i,
        docType: "order",
        personIdEnd: id.endPersonId,
        personIdStart: id.startPersonId,
        companyIdEnd: id.endCompanyId,
        companyIdStart: id.startCompanyId,
        productIdEnd: id.endProductId,
        productIdStart: id.startProductId,
        orderIdEnd: id.endOrderId,
        orderIdStart: id.startOrderId
    });

// console.log( JSON.stringify( triples ) );

// pick products in order from products and build order totals

    let orderedProduct = [];
    let totalItemCost = 0;
    let totalShippingCost = 0;
    let totalShippingCredit = 0;

    let dates = [];
    let products = [];

    let range = Math.floor(Math.random() * ( id.maxNumberOfProductsInEachOrder - 1 ) ) + 1;

    // get the required product documents
    for(let l =0; l < range; ++l){
        let productRanNum = Math.floor(Math.random()*productFile.length);
        let product = productFile[ productRanNum ].product;
        let productStartDate = product.productAvailabilityDate.split("-");

        dates.push(new Date(parseInt(productStartDate[0]), parseInt(productStartDate[1]), parseInt(productStartDate[2])));
        products.push(product)

        // console.log(startDate);
    }

    let startDate = new Date( gen.sortDates(dates)[0] );

    const info = gen.orderInfo({
        id: i,
        startDate: startDate,
        endDate: new Date(),
        enums: require("./../enums/enums-order.js"),
        customerId: Math.floor(Math.random()*(id.endPersonId - id.startPersonId)) + id.startPersonId,
        name: person.personFirstName
    });

// console.log(JSON.stringify(info));

    let orderDate = new Date( info.orderDate );

    let docHis = gen.docHistory({
        minPersonId: id.startPersonId,
        maxPersonId: id.endPersonId,
        id: i,
        baseObjectId: 2000,
        enums: enums,
        startDateTime: orderDate,
        fixedStartDate: true
    });

// console.log(docHis);

    let paymentDate = gen.date({
        start: orderDate,
        end: new Date( orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate() + 10 )
    });

    let jsPaymentDate = new Date(paymentDate);
    let shipDate = gen.date({ start: jsPaymentDate, end: new Date( jsPaymentDate.getFullYear(), jsPaymentDate.getMonth(), jsPaymentDate.getDate() + 3 ) });

    for( let j = 0; j < range; ++j ){

        let product = products[j];

        let obj = {};
        let basePrice = product.productListPrice;
        let shippingCost = +( (Math.random()*(id.baseShippingPrice - shippingVariance)) + shippingVariance ).toFixed(2);
        let shippingCredit = +( (Math.random()*(shippingCost - shippingCreditVariance )) + shippingCreditVariance ).toFixed(2);

        let price = +(Math.random()*(basePrice - basePrice/10) + basePrice/10 ).toFixed(2);
        let qty = Math.floor(Math.random()*(id.maxQty - id.minQty)) + id.minQty;

        totalItemCost += price * qty;
        totalShippingCost += shippingCost * qty;
        totalShippingCredit += shippingCredit;

        obj.orderedProductId = `${2100 + j}${i}`;
        obj.productId = product.metadata.docId;
        obj.historicalProductName = product.name;
        obj.productOrderQty = qty;
        obj.historicalProductUnitPrice = price;
        obj.productWeight = product.productMeasure[0].productWeight;
        obj.productWeightUOM = product.productMeasure[0].productWeightUOM;
        obj.productShippedDate = shipDate;
        obj.productCondition = enums.getProductCondition().productCondition;
        obj.productOrderStatus = enums.getProductOrderStatus().productOrderStatus;

        // obj.seller = {};
        // obj.seller.sellerId = 1;
        // obj.seller.historicalSellerName = company.name;
        //
        // obj.supplier = {};
        // obj.supplier.supplierId = 1;
        // obj.supplier.historicalSupplierName = company.name;

        orderedProduct.push(obj);
    }

    const subtotal = +(totalShippingCost + totalItemCost - totalShippingCredit).toFixed(2);
    const salesTax = +(subtotal * id.avgSalesTax).toFixed(2);
    const total = +(salesTax + subtotal).toFixed(2);


// pick a payment method from a person
// At the moment only one payment method is allowed.
    let orderPaymentMethod = [];
    let basePaymentMethodId = 2200;

    // TODO: paymentMethodId needs to be renamed.
    // TODO: paymentMethodId should always be present at the root of orderPaymentMethod.
    // TODO: should create multiple paymentMethods in rare occasions.

    if( person.paymentMethod.length > 0 ){
        let randomPaymentMethodIndex = Math.floor(Math.random()*person.paymentMethod.length);

        orderPaymentMethod = [{
            "orderPaymentAmount": total,
            "paymentMethodId": `${ basePaymentMethodId }${i}`,
            "orderPaymentDate": paymentDate,
            "orderPaymentType": person.paymentMethod[randomPaymentMethodIndex].paymentMethodType,
            "orderPaymentMethod": person.paymentMethod[randomPaymentMethodIndex]
        }];
    } else {

        let object = {};
        let type = enums.getPaymentMethodType().paymentMethodType;

        object.paymentMethodId             = `${basePaymentMethodId}${i}`;
        object.paymentMethodType           = type;
        object.paymentMethodStatus         = enums.getPaymentMethodStatus().paymentMethodStatus;

        switch(type){
            case "Credit Card":
                object.creditCardNumber            = gen.creditCardNumber();
                object.creditCardExperiationDate   = gen.date({
                    start: new Date(2000, 11, 21),
                    end: new Date(2038,11,21)
                });
                object.nameOnCreditCard            = `${person.personFirstName.toUpperCase()} ${person.personLastName.toUpperCase()}`;
                object.creditCardValidationAddress = gen.addressString(person.address[Math.floor(Math.random()*person.address.length)]);
                break;
            case "Bank Account":
                object.bankRoutingNumber = `${Math.floor(Math.random()*100000000)}`;
                object.bankAccountNumber = `${Math.floor(Math.random()*100000000000)}`;
                object.nameOnBankAccount = `${person.personFirstName} ${person.personLastName}`;
                // TODO: need to match the format to the state
                object.driversLicenseNumber = `${Math.floor(Math.random()*(100000000000000 - 100000000))+100000000}`;
                // TODO: need to make all 50 states available
                object.driversLicenseState = "AK";
                break;
            case "Cash":
                break;
            case "Check":
                object.bankRoutingNumber = `${Math.floor(Math.random()*100000000)}`;
                object.bankAccountNumber = `${Math.floor(Math.random()*100000000000)}`;
                object.checkNumber = `${Math.floor(Math.random()*9999) + 1}`;
                break;
        }

        orderPaymentMethod = [{
            "orderPaymentAmount": total,
            "orderPaymentDate": paymentDate,
            "orderPaymentType": "Guest Checkout",
            "orderPaymentMethod": object
        }];
    }
// console.log(paymentMethod);

// Generating Data
    let schemaInfo = gen.schemaReference({ type:"order", version: 3 });

    // console.log(schemaInfo);


    const address = person.address[Math.floor(Math.random()*person.address.length)];


    let order = {
        "order": {
            "orderNumber": info.orderNumber,
            "orderDate": info.orderDate,
            "orderStatus": info.orderStatus,
            "customer": {"customerId": info.customerId, "historicalCustomerName": info.customerName},

            "orderShipment": {
                "shipmentTrackingNumber": Math.floor(Math.random()*(9900000000000) + 100000000000),
                // "shipper": {
                //     "shipperId": 3,
                //     "historicalCompanyName": company.companyName
                // },
                "shipmentMethod": enums.getShipmentMethod().shipmentMethod,
                "shipmentCost": +(totalShippingCost).toFixed(2),
                "shipmentNotes": ""
            },

            "orderShippingAddress": {
                "coordinates": address.addressCoordinates,
                "addressStreet": address.addressStreet,
                "addressLocality": address.addressLocality,
                "addressRegion": address.addressRegion,
                "addressPostalCode": address.addressPostalCode,
                "addressCountry": address.addressCountry
            },

            "product": orderedProduct,

            "orderTotals": {
                "totalOrderItemCost": +(totalItemCost).toFixed(2),
                "orderShippingCost": +(totalShippingCost).toFixed(2),
                "orderShippingCostCredit": +(totalShippingCredit).toFixed(2),
                "orderSalesTax": salesTax,
                "totalOrderCost": total
            },

            "orderPayment": orderPaymentMethod,

            "triple": triples,

            "metadata": {
                "docId": `${i}`,
                "docComment": selectedParagraph,
                "docKeywords": words.slice(0, 4),
                "schemaId": schemaInfo.schemaId,
                "schemaVersion": schemaInfo.version,
                "docHistory": docHis
            }
        }
    };


// console.log(JSON.stringify(order, null, 2))

// saving the document

    data.push( order );

    if( batchIndex === docsPerFile ){

        batchIndex = 0;

        // console.log( addressIndex );

        fs.writeFileSync(
            `${saveLocation}\\order${fileIndex}.json`,
            JSON.stringify( data )
        );

        data = [];
        ++fileIndex;

        // Account for if the number of docs does noe evenly divide by the batch size.
    } else if( i === id.endPersonId && data.length !== 0 ){

        // console.log( addressIndex );

        fs.writeFileSync(
            `${saveLocation}\\order${fileIndex}.json`,
            JSON.stringify( data )
        );

    }
}


let end = new Date().getTime();
let diff = end - start;

let seconds = ( diff / 1000 ).toFixed( 1 );
let minutes = ( diff / ( 60000 ) ).toFixed( 1 );    // 60000 = 1000 * 60
let hours   = ( diff / ( 3600000 ) ).toFixed( 1 );  // 3600000 = 1000 * 60 * 60

let iterationsPerSecond = ( ( (id.endOrderId - id.startOrderId) / ( diff ) ) * 1000 ).toLocaleString('en-US');
console.log( `This generated ${ iterationsPerSecond } docs per second` );
console.log( `This script took:\n  ${hours} Hours\n  ${minutes} Minutes\n  ${seconds} Seconds` );