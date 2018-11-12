/*
 *
 * enums-order.js
 *
 * Purpose
 * This file contains all the enums required for generating an order document
 *
 */

let docHistory = require( './enums-metadata.js' );

let status = [ "Ordered", "Backordered", "Shipped", "Returned" ];


module.exports = {
    "docEvent": docHistory.docEvent,
    "orderStatus": status,
    "billingTerms": [ "Cash", "Net30Days", "Net60Days" ],
    "shipmentMethod": [ "UPS Standard", "UPS Overnight", "FedEx 2 day", "FedEx Overnight", "USPS 2 day air", "USPS 1 day air", "USPS Overnight", "USPS Priority" ],
    "productOrderStatus": status,
    "productCondition": [ "Like New", "Very Good", "Good", "Acceptable" ],
    "paymentMethodType": [ "Credit card", "Bank Account", "Cash", "Check", "Guest Checkout" ]
};