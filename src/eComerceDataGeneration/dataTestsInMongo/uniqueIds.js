/*
 *
 * uniqueIds.js
 *
 * Purpose
 * make sure all ids in every document and sub document are unique.
 *
 *
 */
'use strict';

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;