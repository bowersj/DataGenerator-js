/*
 *
 * genArrayOfPaths.js
 *
 * Purpose
 * To generate a json file containing an array of paths to the text data
 *
 * Arguments
 *   @pathToData - a path to the directory containing the raw data. It may also contain directories
 *   @patToWriteTo - a path to where you would like the array of paths to be stored on disk. Note,
 *   you must have an extension on the provided filename at the end of the path, one will not be added.
 *
 * Examples
 * persistArrayOfPaths( "D:\\guttenbergText\\iso image\\combinedValues\\text", "./pathsToText.json" )
 *
 * History
 * Josh Bowers 11/3/2018T17:00:00.00
 */

'use strict';

const fs = require( 'fs' );

const persistArrayOfPaths = function( pathToData, pathToWriteTo){
    if(typeof pathToData !== 'string')    throw TypeError('[genArrayOfPaths.js genArrayOfPaths] pathToData must be a string');
    if(typeof pathToWriteTo !== 'string') throw TypeError('[genArrayOfPaths.js genArrayOfPaths] pathToWriteTo must be a string');

    function buildArrayOfPaths( err, directory ){
        if(err)throw err;

        let path = [];

        for( let i = 0; i < directory.length; i++ ){
            path[i] = `${pathToData}\\${directory[i]}`
        }

        return path;
    }

    fs.readdir( pathToData, ( err, files ) => {
        if(err) throw err;

        let paths = buildArrayOfPaths( err, files );

        fs.writeFile( pathToWriteTo, JSON.stringify(paths), (err) => {
            if(err) throw err;

            console.log(`The File has been saved at ${pathToWriteTo}`);
        })
    })

};

module.exports.arrayOfPaths = persistArrayOfPaths;