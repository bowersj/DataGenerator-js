/*
 *
 * enums-company.js
 *
 * Purpose
 * This file contains all the enums required for generating a company document
 *
 */

let docHistory = require( './enums-metadata.js' );
let order = require( './enums-order.js' );

let purpose = [ "Personal", "Company", "family", "spam" ];
let status = [ "Active", "Inactive" ];

module.exports = {
    "docEvent": docHistory.docEvent,
    "companyStatus": status,
    "addressPurpose": purpose,
    "emailPurpose": purpose,
    "paymentMethodType": order.paymentMethodType,
    "websitePurpose": [ "companyWebsite", "personalWebsite" ],
    "supplierStatus": status,
    "sellerStatus" : status
};