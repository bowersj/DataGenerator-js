"use strict";

let minimist = require( "minimist" );


/**
 * parses command line arguments and returns a JS object
 * This will allow a batch script to pass in some generic properties, like
 *  - where the schema is located
 *  - docs/file
 *  - how many docs to be generated
 *  - the starting index of the source data
 *      - Question: how to handle multiple source starting positions
 *          - If  supposed to be random then this does not matter
 *          - If selection is supposed to be not random then it matters
 *              - names in typeAhead fake data
 *              - no repeated values with a random number of values with
 *              in each record like in person.address in side of Dad's
 *              person ecommerce model fake data.
 *              - Answer: calc
 *                  totalMax = max * totalNumOfRecords;
 *                  totalMin = min * totalNumOfRecords;
 *                  totalDiff = totalMax - totalMin;
 *
 *                  totalDiff is the maximum number of required documents
 *                  not all will be used but this ensures there are no repeats;
 *
 *                  if there are more required documents than unique items in
 *                  source data then throw error when building schema to ensure
 *                  the user knows the limitations of what we can generate.
 */
const args = minimist(
    process.argv.slice(2),
    {
        alias:{
            x: "threads",
            y: "docs"
        }
    }
);

console.log( "args object" );

console.log( JSON.stringify( args ) );

