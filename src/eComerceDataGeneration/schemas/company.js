/*
 * company.js
 *
 * Purpose
 * This is the schema for the company doc and is to be used to manually
 * build the template for generating a company document
 *
 */


'use strict';

let list = require( './../enums/enums-company.js' );

// Which properties are optional?
let company = {
    "company": {
        "companyStatus":        list.companyStatus,
        "companyName":          "string - company name",
        "companyInformalName":  "string - company name",
        // Should exist in the future
        // leave as an empty array
        "doingBusinessAs":    [ "stirng - company name - 1 or more" ],
        // Should exist in the future
        // leave as empty array for now?
        "subsidiaryOf":       [ "string - another company name - 1 or more" ],
        // Should exist in the future
        // for now leave blank
        "parentCompanyOf":    [ "string - another company name - 1 or more" ],

        "phone": [
            { "phoneId": "number", "phonePurpose": list.phonePurpose,   "phoneNumber": "string" },
            { "phoneId": "number", "phonePurpose": list.phonePurpose,   "phoneNumber": "string" },
            { "phoneId": "number", "phonePurpose": list.phonePurpose,   "phoneNumber": "string" } ],

        // Any one address can have many purposes. The purpose of addressStreet is to allow for multiple
        // lines in the street address,
        // for now use the source data's format
        "address": [
            { "addressPurpose":    [ list.addressPurpose ],            "addressStreet": [ "string - 1 or more" ],
                "addressLocality":    "string - city/town",            "addressRegion":   "string - state abbreviation",
                "addressPostalCode":  "string - zip code",             "addressCountry":  "string", "addressId":"number" } ],

        "email": [
            { "emailId": "number", "emailPurpose": [ list.emailPurpose ], "emailAddress": "sales@nabisco.com"    },
            { "emailId": "number", "emailPurpose": [ list.emailPurpose ], "emailAddress": "support@nabisco.com"  },
            { "emailId": "number", "emailPurpose": [ list.emailPurpose ], "emailAddress": "shipping@nabisco.com" } ],

        "website": [
            { "websiteId":"number", "websitePurpose": [ list.websitePurpose ],  "websiteUrl":   "string - correlate with email address domain name" } ],

        "paymentMethod": [
            { "paymentMethodType": list.paymentMethodType,     "paymentMethodBankRoutingNumber": "number",
                "paymentMethodAccountNumber": "number",        "paymentMethodNameOnAccount":     "string - correlates to company informal name",
                "paymentMethodVerified": "boolean",            "paymentId": "number"} ],

        // Should supplier and seller objects require id's?
        // This specifies that the company is a supplier, making a subclass of supplier.
        // for now every company will be a supplier except the shipping companies
        // for now leave out seller

        "supplier": { "supplierJoinDate": "date", "supplierStatus": list.supplierStatus },
        "seller":   { "sellerJoinDate":   "date", "sellerStatus":   list.sellerStatus },

        "triple": [
            { "tripleId": "number", "subject": "doc id",   "predicate": "hasCompanyRep",   "object": "person id"},
            { "tripleId": "number", "subject": "doc id",   "predicate": "subsidiaryOf",    "object": "company id"},
            { "tripleId": "number", "subject": "doc id",   "predicate": "splitFrom",       "object": "company id"},
            { "tripleId": "number", "subject": "doc id",   "predicate": "parentCompanyOf", "object": "company id"}
        ],

        "metadata":{
            "docUri": "doc id",    "docComment": "string",     "docKeywords": "string - comma delimited list or array?",
            "schemaUri": "schema id",                          "schemaVersion": "double",
            "docHistory": [
                { "docVersion":      "double",               "docEvent": list.docEvent,
                    "docEditor":       "string - person name", "docEditorUri":  "person doc id",
                    "docEditDateTime": "dateTime",             "docEditorNote": "string",
                    "docHistoryId":    "number"  }
            ]
        }
    }
};