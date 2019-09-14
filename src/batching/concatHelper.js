/**
 * run the following for tests
 * node --max-old-space-size=15360 testConcat.js
 *
 */

const fs = require( "fs" );
const path = require( "path" );
const es = require( "event-stream" );
const batch = require( "./batch.js" );


let moduleExport = Object.create(null);

moduleExport.batches = concatBatches;
moduleExport.filesInDir = concatFilesInDir;

module.exports = moduleExport;

/**
 * @function concatFilesInDir
 * @version 1.0.1
 * @public
 *
 * Takes the contents of a directory and puts the contents of every file
 * in that directory into one file.
 *
 * @param {String} dir - the path to a directory that contains the files to be batched
 * @param {String} saveFile - the name of the file to be saved. Should include extension.
 *
 * @return {Promise}
 *
 */
function concatFilesInDir({ dir, saveFile }){
    let files = fs.readdirSync( dir );
    return concatFiles_raw( files, dir, saveFile );
}


/**
 * @function concatBatches
 * @version 1.1.3
 * @public
 *
 * Generates files based on the content of other files.
 *  Utilizes streaming for low memory consumption
 *
 * @param {Object} concatenation parameters
 * @param {String} dir - the path to a directory that contains the files to be batched
 * @param {Number} filesPerBatch - the number of files per batch
 * @param {Array} filesToIgnore - the names of files to ignore. Extensions are removed
 *
 * @return {Promise}
 *
 */
function concatBatches({ dir, filesPerBatch, filesToIgnore }){
    let batches = batch({ dir, filesPerBatch, filesToIgnore });
    // console.log( batches );
    return _concatBatches( batches )
}


// batches are meant to contain arrays of arrays
async function _concatBatches( batches, opts = {} ){

    opts = Object.assign({
        saveFilePrefix: "batch",
        extension: "csv",
    }, opts);

    for( let batchNum = 0; batchNum < batches.length; ++batchNum ){
        await concatFiles_parsed( batches[ batchNum ], `${path.dirname( batches[ batchNum ][0] )}/${opts.saveFilePrefix}${batchNum}.${opts.extension}` )
    }

}

/**
 * @function concatFiles_parsed
 * @version 1.2.1
 * @private
 *
 * @param {Array} files - an array of strings where each string is a path to a file.
 * @param {String} saveFile - a string containing the name of the new file being generated.
 *
 * @return {Promise}
 *
 */
function concatFiles_parsed( files, saveFile ){
    return new Promise( resolve => {
        let streams = [];

        for( let i = 0; i < files.length; ++i ){
            streams.push( fs.createReadStream( files[i] ) )
        }

        // merge files
        es.merge( streams )
            .pipe(
                fs.createWriteStream( saveFile )
                    .on( 'close', function(){
                        resolve( "" );
                    } )
            )
    } )
}


/**
 * prepends the directory to the file.
 *
 */
function concatFiles_raw( files, dir, saveFile ){
    return new Promise( resolve => {
        let streams = [];

        for( let i = 0; i < files.length; ++i ){
            streams.push( fs.createReadStream( `${dir}/${files[i]}` ) )
        }

        // merge files
        es.merge( streams )
            .pipe(
                fs.createWriteStream( saveFile )
                    .on( 'close', function(){
                        resolve( "" );
                    } )
            )
    } )
}
