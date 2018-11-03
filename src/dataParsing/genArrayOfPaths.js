const fs = require( 'fs' );

const genArrayOfPaths = function( pathToData, pathToWriteTo){
    if(typeof pathToData !== 'string')    throw TypeError('[genArrayOfPaths.js genArrayOfPaths] pathToData must be a string');
    if(typeof pathToWriteTo !== 'string') throw TypeError('[genArrayOfPaths.js genArrayOfPaths] pathToWriteTo must be a string');

    function readDirContents( err, directories ){
        if(err)throw err;

        
    }

    fs.readdir( pathToData,  )

};