/*
 * order.js
 *
 * Purpose
 * This is the schema for the order doc and is to be used to manually
 * build the template for generating a order document
 *
 */

'use strict';

let list = require( './../enums/enums-order.js' );

// Which properties are optional?
let order = {
    "order": {
        "orderNumber": "string - a unique number for each order",
        "orderDate":   "dateTime",
        "orderStatus": list.orderStatus,
        "customer": { "customerUri": "person id",  "historicalCustomerName": "string - personName" },

        // Ignore for now.
        "isPurchaseOrder": { "purchaseOrderUri": "product id",  "billingTerms": list.billingTerms },

        "orderShipment": {
        "orderShipmentId": "number",
        // Create the following company documents USPS, UPS, FedEx
        "shipper": { "shipperId": "number", "companyUri": "company id", "historicalCompanyName": "string - company name" },
        "shipmentMethod": list.shipmentMethod,            "shipmentCost": "number", "shipmentNotes": "string" },

        // Does orderShippingAddress need a unique id?
        "orderShippingAddress": {
            "addressStreet":    [ "string - shouldn't there be only one shipping address?" ],
            "addressLocality":    "string - city/towns", "addressRegion":   "string - state abbreviation",
            "addressPostalCode":  "string - zip code",   "addressCountry":  "string" },

        // How often should the historicalProductName line up with the actual name?
        // leave it out for the first iteration
        "product": [
            { "orderedProductId":      "number",
                "productUri":          "product id",                  "historicalProductName": "string - product name",
                "productOrderQty":     "number",                      "historicalProductUnitPrice": "number",
                "productWeight":     "number",
                "productWeightUOM":     "string - enum",               "productShippedDate": "date or null",
                "productCondition": list.productCondition,            "productOrderStatus": list.productOrderStatus,
                "seller":   { "sellerUri":   "company id",  "historicalSellerName":   "string - company name" },
                "supplier": { "supplierUri": "company id",  "historicalSupplierName": "string - company name" } },

            { "orderedProductId":"number",
                "productUri":        "product id",                    "historicalProductName": "string - product name",
                "productOrderQty":     "number",                      "historicalProductUnitPrice": "number",
                "productWeightOz":     "number",                      "productShippedDate": "date or null",
                "productCondition": list.productCondition,            "productOrderStatus": list.productOrderStatus,
                "seller":   { "sellerUri":   "company id",  "historicalSellerName":   "string - company name" },
                "supplier": { "supplierUri": "company id",  "historicalSupplierName": "string - company name" } }
        ],

        "orderTotals": {
            "totalOrderItemCost":       "number - correlate with cost of items",
            "orderShippingCost":        "number - correlate with cost of shipping",
            "orderShippingCostCredit":  "number",
            "orderSalesTax":            "number",
            "totalOrderCost":           "number - sum of the previous four" },

        // There is repeated values, how would you like me to handle that?
        //    pick one from the person document
        // Does orderPaymentDate need to correlate with anything?
        //    the person must exist to use that
        "orderPayment": [
            { "orderPaymentAmount": "number - correlate with totalOrderCost",    "orderPaymentDate": "date",
                "orderPaymentMethod": {
                    "paymentMethodType": list.paymentMethodType,                 "creditCardNumber": "string",
                    "creditCardExpirationDate": "date",                          "nameOnCreditCard": "string",
                    "creditCardValidationAddress": {
                        "addressStreet":    [ "string - correlate with credit card address" ],
                        "addressLocality":    "string - city",        "addressRegion":   "string - state abbreviation",
                        "addressPostalCode":  "string - zip code",    "addressCountry":  "string" } } } ],

        "triple": [
            { "tripleId": "number", "subject": "person id",   "predicate": "ordered",   "object": "order id" }
        ],

        "metadata":{
            "docUri": "doc id",    "docComment": "string",     "docKeywords": "string - comma delimited list or array?",
            "schemaUri": "schema id",                          "schemaVersion": "double",
            "docHistory": [
                { "docVersion":      "double",                     "docEvent": list.docEvent,
                    "historicalDocEditor": "string - person name", "docEditorUri":  "person doc id",
                    "docEditDateTime": "dateTime",                 "docEditorNote": "string",
                    "docHistoryId":    "number"  }
            ]
        }
    }
};