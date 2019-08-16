'use strict';

module.exports.model = {
    models:[
        {
            csvFile: "./csvs/Person",
            path: "person",
            fields: [
                {
                    label:"personId",
                    value: "person.personId",
                    usePath: false,
                },
                {
                    label: "status",
                    value: "personStatus"
                },
                {
                    label: "name",
                    value: "personName"
                },
                {
                    label: "onlineName",
                    value: "personOnlineName"
                },
                {
                    label: "firstName",
                    value: "personFirstName"
                },
                {
                    label: "lastName",
                    value: "personLastName"
                },
                {
                    label: "legalName",
                    value: "personLegalName"
                },
                {
                    label: "sortedName",
                    value: "personSortedName"
                },
                {
                    label: "informalLetterHeadName",
                    value: "personInformalLetterName"
                },
                {
                    label: "formalLetterHeadName",
                    value: "personFormalLetterName"
                },
                {
                    label: "birthDate",
                    value: "personBirthDate"
                },
                {
                    label: "gender",
                    value: "personGender"
                },
                {
                    label: "ethnicity",
                    value: "personEthnicity"
                }
            ]
        },
        {
            csvFile: "./csvs/address",
            path: "person.address",
            fields: [
                {
                    label: "entityId",
                    value: "person.personId",
                    usePath: false,
                },
                {
                    value: "addressId"
                },
                {
                    label: "addressLongitude",
                    value: "addressCoordinates[0]"
                },
                {
                    label: "addressLatitude",
                    value: "addressCoordinates[1]"
                },
                {
                    label: "addressStreet1",
                    value: "addressStreet[0]"
                },
                {
                    label: "addressStreet2",
                    value: "addressStreet[1]"
                },
                {
                    value: "addressLocality"
                },
                {
                    value: "addressRegion"
                },
                {
                    value: "addressPostalCode"
                },
                {
                    value: "addressCountry"
                },
                {
                    value: "addressPurpose"
                },
            ]
        },
        {
            csvFile: "./csvs/phoneNumber",
            path: "person.phone",
            fields: [
                {
                    label: "entityId",
                    value: "person.personId",
                    usePath: false,
                },
                {
                    value: "phoneId"
                },
                {
                    value: "purpose"
                },
                {
                    value: "number"
                }
            ]
        },
        {
            csvFile: "./csvs/email",
            path: "person.email",
            fields: [
                {
                    label: "entityId",
                    value: "person.personId",
                    usePath: false,
                },
                {
                    value: "emailId"
                },
                {
                    value: "purpose"
                },
                {
                    value: "address"
                }
            ]
        },
        {
            csvFile: "./csvs/website",
            path: "person.website",
            fields: [
                {
                    label: "entityId",
                    value: "person.personId",
                    usePath: false,
                },
                {
                    value: "websiteId"
                },
                {
                    label: "purpose",
                    value: "websitePurpose"
                },
                {
                    value: "url"
                }
            ]
        },
        {
            csvFile: "./csvs/metadata",
            path: "person.metadata",
            fields: [
                {
                    label:"entityId",
                    value:"docId"
                },
                {
                    label: "comment",
                    value: "docComment"
                },
                {
                    label: "keywords",
                    value: "docKeywords"
                },
                {
                    value: "schemaId"
                },
                {
                    value: "schemaVersion"
                }
            ]
        },
        {
            csvFile: "./csvs/history",
            path: "person.metadata.docHistory",
            fields: [
                {
                    label:"metadataId",
                    value:"person.metadata.docId",
                    usePath: false
                },
                {
                    label: "version",
                    value: "docVersion"
                },
                {
                    label: "event",
                    value: "docEvent"
                },
                {
                    label: "editorId",
                    value: "docEditorId"
                },
                {
                    label: "editDateTime",
                    value: "docEditDateTime"
                },
                {
                    label: "historyId",
                    value: "docHistoryId"
                }
            ]
        },
        {
            csvFile: "./csvs/paymentMethod",
            path: "person.paymentMethod",
            fields: [
                {
                    label: "entityId",
                    value: "person.metadata.docId",
                    usePath: false
                },
                {
                    value:"paymentMethodId"
                },
                {
                    label: "methodType",
                    value: "paymentMethodType"
                },
                {
                    label: "methodStatus",
                    value: "paymentMethodStatus"
                }
            ]
        },
        {
            path: "person.paymentMethod",
            condition: "paymentMethodType",
            options: {
                "Check":{
                    csvFile: "./csvs/checkPaymentMethod",
                    fields: [
                        {
                            value:"paymentMethodId"
                        },
                        {
                            label: "routingNumber",
                            value:"bankRoutingNumber"
                        },
                        {
                            label: "accountNumber",
                            value: "bankAccountNumber"
                        },
                        {
                            value: "checkNumber"
                        }
                    ]
                },
                "Bank Account":{
                    csvFile: "./csvs/bankPaymentMethod",
                    fields: [
                        {
                            value:"paymentMethodId"
                        },
                        {
                            label: "routingNumber",
                            value:"bankRoutingNumber"
                        },
                        {
                            label: "accountNumber",
                            value: "bankAccountNumber"
                        },
                        {
                            value: "nameOnBankAccount"
                        },
                        {
                            value: "driversLicenseNumber"
                        },
                        {
                            value:"driversLicenseState"
                        }
                    ]
                },
                "Credit Card": {
                    csvFile: "./csvs/creditCardPaymentMethod",
                    fields: [
                        {
                            value:"paymentMethodId"
                        },
                        {
                            label: "expirationDate",
                            value:"creditCardExperiationDate"
                        },
                        {
                            value:"nameOnCreditCard"
                        },
                        {
                            label: "validationAddress",
                            value: "creditCardValidationAddress"
                        },
                        {
                            label: "validationAddressId",
                            value: "creditCardValidationAddressId"
                        }
                    ]
                }
            }
        }
    ]
};