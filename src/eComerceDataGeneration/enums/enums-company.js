/*
 *
 * enums-company.js
 *
 * Purpose
 * This file contains all the enums required for generating a company document
 *
 */

const fs = require( 'fs' );

let docHistory = require( './enums-metadata.js' );
let order = require( './enums-order.js' );

let purpose = [ "Primary", "Sales", "Shipping", "Support", "Customer Service", "Main Office", "Purchasing", "HR", "IT", "Help Desk" ];
let status = [ "Active", "Inactive" ];

module.exports = {
    "docEvent": docHistory.docEvent,
    "companyStatus": status,
    "addressPurpose": purpose,
    "phonePurpose": purpose,
    "paymentMethodType": [ "Credit Card", "Bank Account", "Cash", "Check" ],
    "paymentMethodStatus": status,
    "websitePurpose": purpose,
    "supplierStatus": status,
    "sellerStatus" : status,
    "getDocEvent": function(){
        return { docEvent: this.docEvent[Math.floor(Math.random() * this.docEvent.length)] }
    },
    "getCompanyStatus": function(){
        return { companyStatus: this.companyStatus[Math.floor(Math.random() * this.companyStatus.length)] }
    },
    "getSupplierStatus": function(){
        return { supplierStatus: this.supplierStatus[Math.floor(Math.random() * this.supplierStatus.length)] }
    },
    "getSellerStatus": function(){
        return { sellerStatus: this.sellerStatus[Math.floor(Math.random() * this.sellerStatus.length)] }
    },
    "getAddressPurpose": function(){

        return { addressPurpose: this.addressPurpose[Math.floor(Math.random() * this.addressPurpose.length)] }
    },
    "getEmailPurpose": function(numOfRecords, percentages, iteration){
        let setNumber = getSetNumber( numOfRecords, percentages, iteration );
        let emailPurpose = [ "Primary", "Sales", "Shipping", "Support", "Customer Service", "Main Office", "Purchasing", "HR", "IT", "Help Desk" ];

        if( setNumber === 0 ){
            return { emailPurpose: [ emailPurpose[Math.floor(Math.random() * emailPurpose.length)] ] }
        } else if( setNumber === 1 ){

            let emailPurposes= [];

            for( let i = 0; i < 2; i++ ){
                emailPurposes[i] = emailPurpose[ Math.floor(Math.random() * emailPurpose.length) ]
            }
            return { emailPurpose: emailPurposes }

        } else if( setNumber === 2 ){
            let ranNum = Math.floor(Math.random() * (emailPurpose.length));

            if( ranNum - 3 < 0 ){
                ranNum = 0;
            } else {
                ranNum -= 3;
            }

            return { emailPurpose: emailPurpose.splice(ranNum, ranNum + 3) }
        } else {
            return { emailPurpose: emailPurpose[Math.floor(Math.random() * emailPurpose.length)] }
        }
    },
    "getPhonePurpose": function(){

        return { phonePurpose: this.phonePurpose[Math.floor(Math.random() * this.phonePurpose.length)] }
    },
    "getWebsitePurpose": function(){

        return { websitePurpose: this.websitePurpose[Math.floor(Math.random() * this.websitePurpose.length)] }
    },
    "getPaymentMethodType": function(){
        return { paymentMethodType: this.paymentMethodType[Math.floor(Math.random() * this.paymentMethodType.length)] }
    }, "getPaymentMethodStatus":function(){
        return { paymentMethodStatus: this.paymentMethodStatus[Math.floor(Math.random() * this.paymentMethodStatus.length)] }
    }
};

function getSetNumber( percentages ){
    if( !Array.isArray(percentages) ){ throw TypeError('percentages must be an array of decimals.') }

    let num = Math.random();

    let percentageTotal = 0;

    for( let i = 0; i < percentages.length; i++ ){

       percentageTotal += percentages[i];

       if( percentageTotal > 1 ){ throw new RangeError('The provided percentages must sum up to at most one.') }

       if( num <= percentageTotal ){ return i }

    }

    throw new Error('Some thing went wrong. Please Try again...')

}



// Test to make sure it lines up with desired percentages
// let percentages = [0.6, 0.3, 0.1];
// let itrs = 100000000;
// let obj = {};
//
// let start = new Date().getTime();
// for(let i = 0; i < itrs; ++i){
//
//     let setNum = getSetNumber(percentages);
//
//     if(obj[setNum]){ ++obj[setNum] } else { obj[setNum] = 1 }
// }
// let end = new Date().getTime();
//
//
// // get percentages
// let props = Object.getOwnPropertyNames( obj );
//
// let frequency = {};
//
// for(let j = 0; j < props.length; ++j){
//     frequency[props[j]] = ( obj[props[j]]/itrs )
// }
//
// frequency.iterationsPerSecond = ( ( itrs / ( end - start ) ) * 1000 ).toLocaleString('en-US');
//
// console.log( JSON.stringify( frequency ) );