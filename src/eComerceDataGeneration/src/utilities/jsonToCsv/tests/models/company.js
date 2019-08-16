'use strict';

module.exports.model = {
    models:[
        {
            csvFile: "./csvs/Company",
            path: "company",
            fields: [
                {
                    label: "companyId",
                    value: "company.metadata.docId",
                    usePath: false,
                },
                {
                    label: "status",
                    value: "companyStatus"
                },
                {
                    label: "name",
                    value: "companyName"
                },
                {
                    label: "informalName",
                    value: "companyInformalName"
                },
                {
                    label: "doingBusinessAs",
                    value: "doingBusinessAs[0]"
                },
                {
                    label: "subsidiaryOf",
                    value: "subsidiaryOf[0]"
                },
                {
                    label: "parentCompanyOf",
                    value: "parentCompanyOf[0]"
                }
            ]
        },
        {
            csvFile: "./csvs/address",
            path: "company.address",
            fields: [
                {
                    label: "entityId",
                    value: "company.metadata.companyId",
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
            path: "company.phone",
            fields: [
                {
                    label: "entityId",
                    value: "company.metadata.companyId",
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
            path: "company.email",
            fields: [
                {
                    label: "entityId",
                    value: "company.metadata.companyId",
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
            path: "company.website",
            fields: [
                {
                    label: "entityId",
                    value: "company.metadata.companyId",
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
            path: "company.metadata",
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
            path: "company.metadata.docHistory",
            fields: [
                {
                    label:"metadataId",
                    value:"company.metadata.docId",
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
            path: "company.paymentMethod",
            fields: [
                {
                    label: "entityId",
                    value: "company.metadata.docId",
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
            path: "company.paymentMethod",
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