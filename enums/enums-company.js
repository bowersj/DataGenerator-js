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

let purpose = [ "Primary", "Sales", "Shipping", "Support", "Customer Service", "Main Office", "Purchasing", "HR", "IT", "Help Desk" ];
let status = [ "Active", "Inactive" ];

module.exports = {
    "docEvent": docHistory.docEvent,
    "companyStatus": status,
    "addressPurpose": purpose,
    "emailPurpose": purpose,
    "phonePurpose": purpose,
    "paymentMethodType": [ "Credit card", "Bank Account", "Cash", "Check" ],
    "websitePurpose": purpose,
    "supplierStatus": status,
    "sellerStatus" : status
};