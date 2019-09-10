const fs = require( "fs" );
const path = require( "path" );
const utils = require( "../dataGeneration/utils.js" );

module.exports = buildBatches;


function buildBatches({ dir, filesPerBatch, filesToIgnore }){

    if( !filesPerBatch )
        throw new ReferenceError( "filesPerBatch must exist" );

    if( filesPerBatch < 1 )
        throw new TypeError( "filesPerBatch must be a positive number" );

    if( !Array.isArray( filesToIgnore ) )
        throw new TypeError( "filesToIgnore must be a positive number" );

    if( filesToIgnore ){
        for( let i = 0; i < filesToIgnore.length; ++i ){
            filesToIgnore[i] = path.parse( filesToIgnore[i] ).name;
        }
    }

    let paths = _buildPathToFilesInDir( dir, filesToIgnore );
    let batches = [];
    let batch = [];

    for( let i = 0; i < paths.length; ++i ){

        if( i % filesPerBatch > 0 ){
            batch.push( paths[i] )
        } else {
            batches.push( batch );
            batch = [ paths[i] ];
        }

    }
// remove empty array
    batches.shift();
// account for last batch
    batches.push( batch );

    return batches;
}


function _buildPathToFilesInDir( dir, filesToIgnore ){
    let files =
        filesToIgnore === undefined ?
            fs.readdirSync( dir ) :
            utils.filterArrayByArray(
                fs.readdirSync( dir ),
                filesToIgnore,
                function(e){
                    e = path.parse( e ).name;
                    return this.indexOf( e ) === -1;
                }
            );
    let paths = [];

    for( let i = 0; i < files.length; ++i ){
        paths.push( `${dir}/${files[i]}` );
    }

    let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

    return paths.sort( collator.compare );
}