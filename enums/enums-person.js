/*
 *
 * enums-person.js
 *
 * Purpose
 * This file contains all the enums required for generating a person document
 *
 */

let docHistory = require( './enums-metadata.js' );
let company = require( './enums-company.js' );

let status = [ "Active", "Inactive" ];

module.exports = {
    "docEvent": docHistory.docEvent,
    "personStatus": status,
    "personGender": [ "Male", "Female", "Other" ],
    "personEthnicity": [ "African American", "Jewish", "Romani", "American", "Indigenous", "Native Americans", "Hispanic", "Latino", "Hmong", "White", "Multiracial", "Arabs", "Asian", "Pacific Islander", "Black", "Turkic", "Slavs", "Italian", "Iranian", "Irish", "Kurds", "Koreans", "Vietnamese", "Russian", "Tibetan", "German", "Australian", "Egyptian", "French Canadian", "French" ],
    "phonePurpose": [ "Home", "Work", "Mobile" ],
    "addressPurpose": [ "Personal", "Company", "Family", "P.O. Box" ],
    "websitePurpose": ["Personal", "Company", "Family", "Blog", "FaceBook", "LinkedIn", "Twitter"],
    "emailPurpose": ["Personal", "Company", "Family", "Spam"],
    "tripleStatus": status,
    "paymentMethodType":[ "Credit card", "Bank Account", "Cash", "Check" ]
};
