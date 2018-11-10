/*
 * address_CSVtoJSON.js
 *
 * It is probably a good idea to run
 *
 *         node --max_old_space_size=8192 addresses_CSVtoJSON.js
 *
 * The reason is that javascript will run out of memory
 *
 *
 */

'use strict';

const csv = require("csvtojson");
const fs = require("fs");
const path = require('path');

function fromDir(startPath,filter){

    let file = [];
    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    let files=fs.readdirSync(startPath);
    for(let i=0;i<files.length;i++){
        let filename=path.join(startPath,files[i]);
        let stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            // console.log('-- found: ',filename);
            file.push( filename );
        }
    }

    return file;
}


async function saveJson( csvDir, saveLocation ){
    // let paths = fs.readFileSync( csvDir, 'utf8' );
    // paths = paths.split('\r\n');

    let paths = fromDir( csvDir, '.csv' );

    // console.log(paths);

    for ( let p of paths ){

        let fileName = path.basename(p, ".csv");
        // let json = await csv().fromFile(p);

        // fs.writeFileSync( `${saveLocation}\\${fileName}.json`, JSON.stringify( json ) )
        let readStream = fs.createReadStream( p );
        let writeStream = fs.createWriteStream( `${saveLocation}\\${fileName}.json` );

        let stream = await readStream.pipe( csv() ).pipe( writeStream )

    }
}


const csvLocation = `D:\\_fakeData\\address_clean\\csv`;
const saveLocation = `D:\\_fakeData\\address_clean\\json`;


saveJson(csvLocation, saveLocation)
    .then( () => {
        console.log( `The files have been converted to json and saved in ${saveLocation}` );
    })
    .catch( (err) =>{
        if(err)throw err;
    });