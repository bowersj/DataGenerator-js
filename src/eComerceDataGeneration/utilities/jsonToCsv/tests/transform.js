'use strict';

const transform = require( './../jsonToMultipleCsvs.js' );

// Import models
const person  = require('./models/person.js');
const company = require('./models/company.js');
const product = require('./models/product.js');
const order   = require('./models/order.js');