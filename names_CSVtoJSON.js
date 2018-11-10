'use strict';

const csv = require("csvtojson");
const fs = require("fs");


const convertCsvToJson = function(sourceFilePath, dir, fileName, newLocation){
    let json = csv().fromFile(`${sourceFilePath}\\${dir}\\${fileName}.csv`)
        .then(
            (jsonObj) => {
                fs.writeFile( `${newLocation}\\${fileName}.json`, JSON.stringify( jsonObj ), (err) => {
                    if(err) throw err;
                    console.log(`${fileName}.json has been saved to ${newLocation}`)
                })
            }
        );
};

// convert surname.csv to surname.json.
convertCsvToJson( `D:\\_fakeData\\names\\Archive`, `last_names`, `surnames`, `D:\\_fakeData\\names\\data` );


// convert femaleFirstNames.csv to femaleFirstNames.json
convertCsvToJson( `D:\\_fakeData\\names\\Archive`, `first_names`, `femaleFirstNames`, `D:\\_fakeData\\names\\data` );


// convert maleFirstName.csv to maleFirstName.json
convertCsvToJson( `D:\\_fakeData\\names\\Archive`, `first_names`, `maleFirstNames`, `D:\\_fakeData\\names\\data` );