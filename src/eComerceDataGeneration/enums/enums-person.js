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
    "personGender": [ "Male", "Female" ],
    "personEthnicity": [ "African American", "Jewish", "Romani", "American", "Indigenous", "Native Americans", "Hispanic", "Latino", "Hmong", "White", "Multiracial", "Arabs", "Asian", "Pacific Islander", "Black", "Turkic", "Slavs", "Italian", "Iranian", "Irish", "Kurds", "Koreans", "Vietnamese", "Russian", "Tibetan", "German", "Australian", "Egyptian", "French Canadian", "French" ],
    "phonePurpose": [ "Home", "Work", "Mobile" ],
    "addressPurpose": [ "Personal", "Company", "Family", "P.O. Box" ],
    "websitePurpose": ["Personal", "Company", "Family", "Blog", "FaceBook", "LinkedIn", "Twitter"],
    "emailPurpose": ["Personal", "Company", "Family", "Spam"],
    "tripleStatus": status,
    "customerStatus": status,
    "paymentMethodType": [ "Credit Card", "Bank Account", "Cash", "Check" ],
    "paymentMethodStatus": status,
    "creditCardType": [ "Visa", "Master Card", "American Express", "Discover", "Citi", "Capital One" ],
    "getDocEvent": function(){
        return {docEvent: this.docEvent[Math.floor(Math.random() * this.docEvent.length)]}
    },
    "getPersonStatus": function(){
        return {personStatus: this.personStatus[Math.floor(Math.random() * this.personStatus.length)]}
    },
    "getPersonGender": function(){
        return {personGender: this.personGender[Math.floor(Math.random() * this.personGender.length)]}
    },
    "getPersonEthnicity": function(){
        return {personEthnicity: this.personEthnicity[Math.floor(Math.random() * this.personEthnicity.length)]}
    },
    "getPhonePurpose": function(){
        return {phonePurpose: this.phonePurpose[Math.floor(Math.random() * this.phonePurpose.length)]}
    },
    "getAddressPurpose": function(){
        return {addressPurpose: this.addressPurpose[Math.floor(Math.random() * this.addressPurpose.length)]}
    },
    "getWebsitePurpose": function(){
        return {websitePurpose: this.websitePurpose[Math.floor(Math.random() * this.websitePurpose.length)]}
    },
    "getEmailPurpose": function(){
        return {emailPurpose: this.emailPurpose[Math.floor(Math.random() * this.emailPurpose.length)]}
    },
    "getTripleStatus": function(){
        return {tripleStatus: this.tripleStatus[Math.floor(Math.random() * this.tripleStatus.length)]}
    },
    "getPaymentMethodType": function(){
        return {paymentMethodType: this.paymentMethodType[Math.floor(Math.random() * this.paymentMethodType.length)]}
    },
    "getCustomerStatus": function(){
        return {customerStatus: this.customerStatus[Math.floor(Math.random() * this.customerStatus.length)]}
    },
    "getPaymentMethodStatus": function(){
        return {paymentMethodStatus: this.paymentMethodStatus[Math.floor(Math.random() * this.paymentMethodStatus.length)]}
    },
    "getCreditCardType": function(){
        return {creditCardType: this.creditCardType[Math.floor(Math.random() * this.creditCardType.length)]}
    }
};
