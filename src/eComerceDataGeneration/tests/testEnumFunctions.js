/*
 * testProductEnum.js
 *
 * Purpose
 *   To make sure that all functions work as required
 *
 */
'use strict';

const productEnums= require( './../enums/enums-product.js' );
const personEnums= require( './../enums/enums-person.js' );
const companyEnums= require( './../enums/enums-company.js' );
const orderEnums= require( './../enums/enums-order.js' );

// Product enums
console.log('Product Document Enums\n');
console.log( productEnums.getProductCategoriesAndSubCategories() );
console.log( productEnums.getDocEvent());
console.log( productEnums.getProductStatus());
console.log( productEnums.getSupplierProductStatus());
console.log( productEnums.getProductWeightUOM());

// Person Enums
console.log('\nPerson Document Enums\n');
console.log( personEnums.getDocEvent() );
console.log( personEnums.getPersonStatus() );
console.log( personEnums.getPersonGender() );
console.log( personEnums.getPersonEthnicity() );
console.log( personEnums.getPhonePurpose() );
console.log( personEnums.getAddressPurpose() );
console.log( personEnums.getWebsitePurpose() );
console.log( personEnums.getEmailPurpose() );
console.log( personEnums.getTripleStatus() );
console.log( personEnums.getPaymentMethodType() );

// Company Enums
console.log('\nCompany Document Enums\n');
console.log( companyEnums.getDocEvent() );
console.log( companyEnums.getCompanyStatus() );
console.log( companyEnums.getSupplierStatus() );
console.log( companyEnums.getSellerStatus() );
console.log( companyEnums.getAddressPurpose() );
console.log( companyEnums.getEmailPurpose(1000, [ 0.60, 0.30, 0.10 ], 900) );
console.log( companyEnums.getPhonePurpose() );
console.log( companyEnums.getWebsitePurpose() );
console.log( companyEnums.getPaymentMethodType() );

// Order Enums
console.log('\nOrder Document Enums\n');
console.log( orderEnums.getDocEvent() );
console.log( orderEnums.getOrderStatus() );
console.log( orderEnums.getBillingTerms() );
console.log( orderEnums.getShipmentMethod() );
console.log( orderEnums.getProductOrderStatus() );
console.log( orderEnums.getProductCondition() );
console.log( orderEnums.getPaymentMethodType() );
