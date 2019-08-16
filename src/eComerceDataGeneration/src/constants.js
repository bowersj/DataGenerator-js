/*
 *
 * constants.js
 *
 * Purpose
 * List out the items that will not change as the generation process is moving forward
 *
 */

module.exports = {

    desiredBatchSizeInMB: 100,

    avgPersonSizeInKB:   3.5292317708333,
    avgCompanySizeInKB:  2.6275390625,
    avgProductSizeInKB:  4.4617706564360,
    avgQuestionSizeInKB: 15.929466051417,
    avgOrderSizeInKB:    2.6560546875,

    maxNumOfAddresses: 5,
    addressPriority: [ "maxPersonAddresses", "maxCompanyAddresses" ],

    maxNumberOfProductsInEachOrder: 5,
    maxQty: 20,
    minQty: 1,
    baseShippingPrice: 5.99,
    shippingVarianceScaler: 0.3,
    avgSalesTax: 0.0675,

    numOfRecords: 5355000,

    startPersonId: 0,
    endPersonId: 999999,

    startCompanyId: 1000000,
    endCompanyId: 1004999,

    startProductId: 1005000,
    endProductId: 1354999,

    startOrderId: 1355000,
    endOrderId: 5354999,

    startQuestionID: 10000000

    // startProductId: 1005000,
    // endProductId: 1354999,
    //
    // startOrderId: 1355000,
    // endOrderId: 5354999
};