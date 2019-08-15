'use strict';

module.exports.model = {
    models:[
        {
            csvFile: "./csvs/Product",
            path: "product",
            fields: [
                {
                    label: "productId",
                    value: "product.metadata.docId",
                    usePath: false,
                },
                {
                    label: "vendorId",
                    value: "vendor.vendorId"
                },
                {
                    label: "code",
                    value: "productCode"
                },
                {
                    label: "status",
                    value: "productStatus"
                },
                {
                    label: "name",
                    value: "productName"
                },
                {
                    label: "description",
                    value: "productDescription"
                },
                {
                    label: "categories",
                    value: "productCategories"
                },
                {
                    label: "subcategories",
                    value: "productSubCategories"
                },
                {
                    label: "availabilityDate",
                    value: "productListPrice"
                },
                {
                    label: "listPrice",
                    value: "productListPrice"
                },
                {
                    label: "discountPrice",
                    value: "productDiscountPrice"
                },
                {
                    label: "standardCost",
                    value: "productStandardCost"
                },
                {
                    label: "inventoryReorderLevel",
                    value: "productInventoryReorderLevel"
                },
                {
                    label: "inventoryTargetLevel",
                    value: "productInventoryTargetLevel"
                },
                {
                    label: "fiveStar",
                    value: "productReviewSummary.fiveStar"
                },
                {
                    label: "fourStar",
                    value: "productReviewSummary.fourStar"
                },
                {
                    label: "threeStar",
                    value: "productReviewSummary.threeStar"
                },
                {
                    label: "twoStar",
                    value: "productReviewSummary.twoStar"
                },
                {
                    label: "oneStar",
                    value: "productReviewSummary.oneStar"
                },
                {
                    label: "reviewCount",
                    value: "productReviewSummary.reviewCount"
                }
            ]
        },
        {
            csvFile: "./csvs/triples",
            path: "product.metadata",
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
            csvFile: "./csvs/metadata",
            path: "product.metadata",
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
            path: "product.metadata.docHistory",
            fields: [
                {
                    label:"metadataId",
                    value:"product.metadata.docId",
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
        }
    ]
};