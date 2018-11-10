/*
 *
 * enums-product.js
 *
 * Purpose
 * This file contains all the enums required for generating a product document
 *
 */

let docHistory = require( './enums-metadata.js' );


module.exports = {
    "docEvent": docHistory.docEvent,
    "productCategories": [ "" ],
    "productStatus": [ "Active", "Inactive" ],
    "productTags": [ "" ],
    "supplierProductStatus": [ "" ],
    "productWeightUOM": [ "Gram", "Kilogram", "Pound", "Ounce", "Ton" ]
};