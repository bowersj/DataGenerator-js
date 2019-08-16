/*
 *
 * enums-order.js
 *
 * Purpose
 * This file contains all the enums required for generating an order document
 *
 */

let docHistory = require( './enums-metadata.js' );

let status = [ "Ordered", "Backordered", "Shipped", "Returned" ];


module.exports = {
    "docEvent": docHistory.docEvent,
    "orderStatus": status,
    "billingTerms": [ "Cash", "Net30Days", "Net60Days" ],
    "shipmentMethod": [ "UPS Standard", "UPS Overnight", "FedEx 2 day", "FedEx Overnight", "USPS 2 day air", "USPS 1 day air", "USPS Overnight", "USPS Priority" ],
    "productOrderStatus": status,
    "productCondition": [ "Like New", "Very Good", "Good", "Acceptable" ],
    // guest checkout while I understand what we were going for does not make sense.
    "paymentMethodType": [ "Credit Card", "Bank Account", "Cash", "Check" ],
    "getDocEvent": function(){
        return {docEvent: this.docEvent[Math.floor(Math.random() * this.docEvent.length)]}
    },
    "getOrderStatus": function(){
        return { orderStatus: this.orderStatus[Math.floor(Math.random() * this.orderStatus.length)] }
    },
    "getBillingTerms": function(){
        return { billingTerms: this.billingTerms[Math.floor(Math.random()*this.billingTerms.length)] }
    },
    "getShipmentMethod": function(){
        return { shipmentMethod: this.shipmentMethod[Math.floor(Math.random()*this.shipmentMethod.length)] }
    },
    "getProductOrderStatus": function(){
        return { productOrderStatus: this.productOrderStatus[Math.floor(Math.random()*this.productOrderStatus.length)] }
    },
    "getProductCondition": function(){
        return { productCondition: this.productCondition[Math.floor(Math.random()*this.productCondition.length)] }
    },
    "getPaymentMethodType": function(){
        return { paymentMethodType:this.paymentMethodType[Math.floor(Math.random()*this.paymentMethodType.length)] }
    },
    "getPaymentMethodStatus": function(){
        return { paymentMethodStatus: "Active" }
    }
};