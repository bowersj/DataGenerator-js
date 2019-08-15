module.exports.model = {
    models:[
        {
            csvFile: "./csvs/productOrder",
            path: "order.product",
            fields: [
                {
                    label:"orderId",
                    value:"order.metadata.docId",
                    usePath: false
                },
                {
                    value: "productId"
                },
                {
                    label: "qty",
                    value: "productOrderQty"
                },
                {
                    label: "unitPriceAtTimeOfPurchase",
                    value: "historicalProductUnitPrice"
                },
                {
                    value: "productWeight"
                },
                {
                    label: "weightUOM",
                    value: "productWeightUOM"
                },
                {
                    label: "shipDate",
                    value: "productShippedDate"
                },
                {
                    label: "condition",
                    value: "productCondition"
                },
                {
                    label: "orderStatus",
                    value: "productOrderStatus"
                }
            ]
        },
        {
            csvFile: "./csvs/metadata",
            path: "order.metadata",
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
            path: "order.metadata.docHistory",
            fields: [
                {
                    label:"metadataId",
                    value:"order.metadata.docId",
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
            csvFile: "./csvs/triples",
            path: "order.triple",
            fields: [
                {
                    label:"entityId",
                    value:"order.metadata.docId",
                    usePath: false
                },
                {
                    value: "tripleId"
                },
                {
                    value: "subject"
                },
                {
                    value: "predicate"
                },
                {
                    value: "object"
                }
            ]
        }
    ]
};