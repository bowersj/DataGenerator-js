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
            file.push( path.basename(filename) );
        }
    }

    return file;
}

function getRemainingPaths( pathFile, directory ){
    let files = fromDir(directory, ".csv");

    let allFiles = fs.readFileSync( pathFile, 'utf8' );
    allFiles = allFiles.split('\r\n');

    let frequency = {};

    for(let i = 0; i < allFiles.length; i++){
        let fileName = path.basename( allFiles[i] );
        frequency[ fileName ] ? ++frequency[ fileName ] : frequency[ fileName ] = 1
    }

    for(let i = 0; i < files.length; i++){
        if( frequency[ files[i] ] ){
            delete frequency[ files[i] ]
        }
    }

    return Object.getOwnPropertyNames( frequency );
}

const csvLocation = `D:\\_fakeData\\address\\us\\addresses.txt`;

let paths = getRemainingPaths( csvLocation, 'D:\\_fakeData\\address\\_json\\data' );

console.log(paths.length);
console.log( `\n${1638-261}` );

fs.writeFileSync(`D:\\_fakeData\\address\\us\\addresses1.json`, JSON.stringify( paths ));
