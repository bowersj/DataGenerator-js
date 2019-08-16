/*
 * product.js
 *
 * Purpose
 * This is the schema for the product doc and is to be used to manually
 * build the template for generating a product document
 *
 */

'use strict';

let list = require( './../enums/enums-product.js' );

// Which properties are optional?
let product = {
    "product": {
        "productCode":                    "string",
        "productStatus":                  list.productStatus,
        "productName":                    "string",
        "productDescription":             "string",
        "productCategories":            [ list.productCategories ],
        "productSubCategories":         [ list.productCategories[ 'correlate with ProductCategories' ].subCategories ],
        "productAvailabilityDate":        "date",
        "productListPrice":               "number",
        "productDiscountPrice":           "number",
        "productStandardCost":            "number",
        "productInventoryReorderLevel":   "number", // when you should reorder. The target level should always be greater than the reorder level
        "productInventoryTargetLevel":    "number", // desired stock
        "productImages":                  "string - path to image",

        "vendor": { "vendorUri": "company id" },

        // What is the purpose of this property
        // It looks like the property below contains repeated values from company,
        // therefore should it just contain a company id?
        //
        // Intersection of the supplier metadata and product. Defines the relationship between supplier and the product
        //
        // For the first set of 50 do not worry about it bur afterword add it
        "supplier": [
            { "supplierUri": "company id",      "supplierProductStatus": list.productStatus,
                "supplierProductStandardPrice": "number", "supplierProductCurrentPrice": "number",         "supplierProductCurrency": "string - enum",
                "supplierProductQuantityPerUnit":     "string",             "supplierProductMinimumReorderQty":  "number" } ],

        "productMeasure": [
            { "productMeasureId":"number", "productMeasurePurpose":  "string - enum",     "productWeight": "number",  "productWeightUOM": list.productWeightUOM,
                "productWidth": "number",      "productHeight": "number",   "productLength": "number", "productSizeUOM":   "string - enum" },

            { "productMeasureId":"number", "productMeasurePurpose":  "string - enum",    "productWeight": "number",   "productWeightUOM": list.productWeightUOM,
                "productWidth": "number",        "productHeight": "number",  "productLength": "number",   "productSizeUOM": "string - enum" } ],

        "productWebsite": [
            { "websiteId":"number", "websitePurpose": "string",  "websiteUrl": "string" },
            { "websiteId":"number", "websitePurpose": "string",  "websiteUrl": "string" },
            { "websiteId":"number", "websitePurpose": "string",  "websiteUrl": "string" } ],

        "productReviewSummary": {
            "reviewCount": "number - sum of all reviews",
            "fiveStar": "number",
            "fourStar": "number",
            "threeStar": "number",
            "twoStar": "number",
            "oneStar": "number"
        },

        "productQA": [ { "questionId":"number", "question": "string",
            "answer": [
                { "answerId":"number", "answerText": "string", "answerPersonUri": "doc id", "answerDate": "date" } ] } ],


        "triple": [ { "tripleId": "number", "subject": "doc id",  "predicate": "productsOftenSoldTogether",  "object": "product id" } ],

        "metadata":{
            "docUri": "doc id",    "docComment": "string",     "docKeywords": "string - comma delimited list or array?",
            "schemaUri": "schema id",                          "schemaVersion": "double",
            "docHistory": [
                { "docVersion":      "double",               "docEvent":      list.docEvent,
                    "docEditor":       "string - person name", "docEditorUri":  "person doc id",
                    "docEditDateTime": "dateTime",             "docEditorNote": "string",
                    "docHistoryId": "number"  }
            ]
        }
    }
};