/*
 *
 * genArrayOfPaths-rawData.js
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
    if(typeof pathToData !== 'string')    throw TypeError('[genArrayOfPaths-rawData.js genArrayOfPaths] pathToData must be a string');
    if(typeof pathToWriteTo !== 'string') throw TypeError('[genArrayOfPaths-rawData.js genArrayOfPaths] pathToWriteTo must be a string');

    function buildArrayOfPaths( err, directory ){
        if(err)throw err;

        let path = [];

        for( let i = 0; i < directory.length; i++ ){
            path[i] = `${pathToData}\\${directory[i]}`
        }

        return path;
    }

    const walk = function(dir, done) {
        let results = [];
        fs.readdir(dir, function(err, list) {
            if (err) return done(err);
            let pending = list.length;
            if (!pending) return done(null, results);
            list.forEach(function(file) {
                file = path.resolve(dir, file);
                fs.stat(file, function(err, stat) {
                    if (stat && stat.isDirectory()) {
                        walk(file, function(err, res) {
                            results = results.concat(res);
                            if (!--pending) done(null, results);
                        });
                    } else {
                        results.push(file);
                        if (!--pending) done(null, results);
                    }
                });
            });
        });
    };


    walk( pathToData, ( err, files ) => {
        if(err) throw err;

        let paths = buildArrayOfPaths( err, files );

        fs.writeFile( pathToWriteTo, JSON.stringify(paths), (err) => {
            if(err) throw err;

            console.log(`The File has been saved at ${pathToWriteTo}`);
        })
    })

};

module.exports.arrayOfPaths = persistArrayOfPaths;