/*
 * person.js
 *
 * Purpose
 * This is the schema for the person doc and is to be used to manually
 * build the template for generating a person document
 *
 */

'use strict';

let list = require( './../enums/enums-person.js' );

// Which properties are optional?
let person = {
    "person": {
        "personStatus": list.personStatus,
        "personName":       "string",
        "personOnlineName": "string",
        "personFirstName":  "string",
        "personLastName":  "string",
        // should be optional
        // leave out for now
        // longterm 10% have
        "personMiddleName": "string",
        "personMaidenName": "string - optional",
        "personLegalName": "string - composite of personFirstName, personLastName, personMiddleName",
        "personSortedName": "string - composite of personLastName, personFirstName",
        "personNickname":  "string",
        "personInformalLetterName": "string - composite of personFirstName",
        "personFormalLetterName": "string - composite of personFirstName, personLastName",
        "personBirthDate":  "date",
        "personGender": list.personGender,
        "personEthnicity": list.personEthnicity,
        // shouldn't this be an id from the addressPurpose object?
        "personShippingPreference": "string - enum - correlate with addressId",

        "phone": [
            { "phoneId": "number", "phonePurpose": [ list.phonePurpose ], "phoneNumber": "string" },
            { "phoneId": "number", "phonePurpose": [ list.phonePurpose ], "phoneNumber": "string" },
            { "phoneId": "number", "phonePurpose": [ list.phonePurpose ], "phoneNumber": "string" } ],

        "address": [
            { "addressPurpose":    [ list.addressPurpose ], "addressStreet": [ "string - enum - 1 or more" ],
                "addressLocality":     "string - city/town",          "addressRegion":   "string - state abbreviation",
                "addressPostalCode":   "string - zip code",           "addressCountry":  "string", "addressId":"number" } ],

        "email": [
            { "emailId": "number", "emailPurpose": [ list.emailPurpose ], "emailAddress": "string" },
            { "emailId": "number", "emailPurpose": [ list.emailPurpose ], "emailAddress": "string" } ],

        "website": [
            { "websiteId":"number", "websitePurpose": [ list.websitePurpose ], "websiteUrl":   "string" },
            { "websiteId":"number", "websitePurpose": [ list.websitePurpose ], "websiteUrl":   "string" } ],

        "customer": { "customerId":"number", "customerStatus": list.personStatus,         "customerJoinDate": "date",
            "customerReviewerRank": "number" },

        "paymentMethod": [
            { "paymentMethodId":      "number",                       // What are the values for paymentMethodStatus
                "paymentMethodType":    list.paymentMethodType,       "paymentMethodStatus":         "string - enum",
                "creditCardType": list.creditCardType,
                "creditCardNumber":     "string containing a number", "creditCardExpirationDate":    "date",
                "nameOnCreditCard":     "string - uppercase",         "creditCardValidationAddress": "string - must correlate with provided addresses" },

            { "paymentMethodId":      "number",                       // What are the values for paymentMethodStatus
                "paymentMethodType":    list.paymentMethodType,       "paymentMethodStatus":         "string - enum",
                "bankRoutingNumber":    "string containing a number", "bankAccountNumber":           "string containing a number",
                "nameOnBankAccount":    "string",
                "driversLicenseNumber": "string containing a number", "driversLicenseState":         "string - enum" } ],

        "triple": [
            { "tripleId": "number", "subject": "doc id",   "predicate": "hasSpouse",            "object": "person doc id"   },
            { "tripleId": "number", "subject": "doc id",   "predicate": "hasChild",             "object": "person doc id"   },
            { "tripleId": "number", "subject": "doc id",   "predicate": "hasChild",             "object": "person doc id"   },
            { "tripleId": "number", "subject": "doc id",   "predicate": "likesProduct",         "object": "product doc id" },
            { "tripleId": "number", "subject": "doc id",   "predicate": "accountRepForProduct", "object": "person doc id" },
            { "tripleId": "number", "subject": "doc id",   "predicate": "accountRepForCompany", "object": "person doc id"  },
            { "tripleId": "number", "subject": "doc id",   "predicate": "deliveryPersonFor",    "object": "person doc id"  },
            { "tripleId": "number", "subject": "doc id",   "predicate": "employeeOf",           "object": "company doc id",
                "tripleStatus": list.tripleStatus,                 "tripleCreatedOn": "date",
                "tripleEffectivityStartDate": "date",              "tripleEffectivityEndDate": "date or null"} ],

        "metadata":{
            "docUri": "doc id",    "docComment": "string",      "docKeywords": "string - comma delimited list or array?",
            "schemaUri": "string - enum",                       "schemaVersion": "double",
            // What is the purpose of the originHistory property?
            // what is the max and min
            // for now none
            "originHistory": [
                { "sourceOfOrigin":  "string - company name",       "hopsFromSource": "number",
                    "LoadedBy":        "string - department/company", "canBePropagated": "boolean",
                    "LoadDateTime":    "dateTime",                    "SourceRank": "number"    },
                { "sourceOfOrigin":  "string - company name",       "hopsFromSource": "number",
                    "LoadedBy":        "string - department/company", "canBePropagated": "boolean",
                    "LoadDateTime":    "dateTime",                    "SourceRank": "number"    }
            ],
            "docHistory": [
                { "docVersion":      "double",               "docEvent": list.docEvent,
                    "docEditor":       "string - name random", "docEditorUri":  "different person doc id",
                    "docEditDateTime": "dateTime",             "docEditorNote": "string",
                    "docHistoryId":    "number"  }
            ]
        }
    }
};