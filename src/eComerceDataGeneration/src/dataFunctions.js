/*
 * dataFunctions.js
 *
 * Purpose
 * Provide all the functions need to generate fake data types
 * This is NOT where the documents are constructed, but where the individual data types are
 *
 * list of needed functions
 *   genRandomNumber, genDateTime, genDate, genTime,
 *   genPersonNameInfo, genCompanyName, genBillingTerms,  genShippingMethod,
 *   genShipmentNotes, genAddress, genProductInfo, genProductOrderStatus,
 *   genProductName, genOrderId, genProductCondition, genOrderTotals,
 *   genDocId, genDocComment, genDocKeywords, genSchemaReference,
 *   genDocHistory, genGender,
 *   genEthnicity, genShippingAddresses, genPhoneNumbers, genEmails,
 *   genWebsites, genCustomer, genPaymentMethods, genTriples,
 *   genOriginHistories, genProductMeasures, genProductReviewSummary, genProductQA,
 *   genCompanyInformalName, genDoingBusinessAs, genSubsidiaryOf, genParentCompanyOf,
 *   genSupplier, genSeller
 *
 *
 *
 *
 */
'use strict';

const jstat = require( 'jStat' ).jStat;
const {DateTime} = require('luxon');
const {Duration} = require('luxon');


/*
 * Helper Functions
 *
 * Credit for Regex.
 * https://stackoverflow.com/questions/27472010/replacing-only-whole-word-not-words
 *
 */
function getCompanyInformalName( companyName ){

    let companyLegalTerms = [ "llc", "inc", "co", "corp", "ltd", "llc.", "inc.", "co.", "corp.", "ltd.", "llc,", "inc,",
        "co,", "corp,", "ltd,", "llc?", "inc?", "co?", "corp?", "ltd?", "llc!", "inc!", "co!", "corp!", "ltd!", "llc*",
        "inc*", "co*", "corp*", "ltd*" ];

    for( let i  = 0; i < companyLegalTerms.length; i++ ){
        if( companyName.toLowerCase().includes( companyLegalTerms[i] ) ){
            let regex = new RegExp( '(\\s|^)(?:' + companyLegalTerms[i] + ')(?=\\s|$)', "gi" );
            companyName = companyName.replace( regex, "" );
            if(companyName.charAt( companyName.length - 1 ) === ','){
                companyName = companyName.slice( 0, companyName.length - 1 )
            }
        }
    }

    return companyName;
}
// Test Cases
// console.log( getCompanyInformalName( "Best Buy Inc." ) );
// console.log( getCompanyInformalName( "Electronic. Central" ) );
// console.log( getCompanyInformalName( "JCPenny's, LLC." ) );
// console.log( getCompanyInformalName( "!J INC" ) );
// console.log( getCompanyInformalName( "#1 A LIFESAFER HOLDINGS, INC." ) );
// console.log( getCompanyInformalName( "05 TRIPPI/PROLOGUE LLC" ) );
// console.log( getCompanyInformalName( "STYLE&GRAPHICS" ) );


/*
 * isJson
 *
 * Documentation
 *   Tests the input to see if it is json or not.
 *
 * Parameters
 *   required
 *     item - anyType: the value you want to see is json or not.
 *
 * Examples
 *   isJson( { hi: "there" } )   => true
 *   isJson( { "hi": "there" } ) => true
 *   isJson( "hi there" )        => false
 *   isJson( 1234567890 )        => false
 *   isJson( {} )                => true
 *   isJson( [] )                => true
 *   isJson( new Number(0) )     => false
 *   isJson( new Date() )          => false
 *   isJson( Symbol() )                => true
 *
 */
function isJson(item) {
    if( item === null ) return false;
    return item.constructor.name === "Object" || item.constructor.name ===  "Array";
}
// Test cases
// console.log(isJson( { hi: "there" } ));
// console.log(isJson( { "hi": "there" } ));
// console.log(isJson( "hi there" ));
// console.log(isJson( 1234567890 ));
// console.log(isJson( {} ));
// console.log(isJson( [] ));
// console.log(isJson( new Number(0) ));
// console.log(isJson( new Date() ));
// console.log(isJson( Symbol() ));


/*
 *
 * getRandomNums
 *
 * Documentation
 *   This function returns an array with random integers.
 *
 * Parameters - Note: only two Parameters, one value, one object.
 *     The list below shows what properties to include in that Object.
 *
 *
 *     optional
 *       numOfInts - Integer: a number indicating how integers you want return in the array
 *       options - object: contains any one or more of the following properties
 *         min - Integer: the smallest number possible
 *         max - Integer: the biggest number possible
 *         inclusive - boolean: weather it should be inclusive or exclusive default is true
 *         scale - Integer: This is to convert the random decimal provided to the provided numerical range, default
 *           value is 1000
 *         returnInteger - boolean: This specifies weather you want an Integer or Double returned. Default is true
 *         numberOfDecimals - +Integer: only for double random numbers. Specifies number of decimal places to return.
 *           Default is 2.
 *         roundType - string: must be from the following up, down, normal, truncate. Default truncate.
 *         negativeNumbers - boolean: Specify if you want negative number. Default is false
 *
 *         TODO: build functionality of round type into the decimal options.
 *         TODO: build functionality of negativeNumbers into the decimal options.
 *
 *
 * Examples
 *   getRandomNums()  => [randomInt]
 *   getRandomNums(5) => [randomInt,randomInt,randomInt,randomInt,randomInt,]
 *
 * TODO's:
 *   scale to be an array. Must be either same length as or less than number of random numbers generated.
 *     ex. getRandomNums( 5, { scale:[ 1000, 1000000, 10000000000 ] })
 *       => [ 1234, 6543210, 90807045632, 92877347649, 92977945235, ]
 *     ex. getRandomNums( 5, { scale:[ 1000, 1000000, 10000000000, 10, 100, 1000 ] })
 *       => ReferenceError('Too many scalar values provided. You must provide at most the number of scalar
 *         values as number of random number or less than the number of random numbers.')
 *
 *   provide many mins and maxs, just like the idea above
 *
 *   Test the double functions thoroughly.
 *
 */
function getRandomNums( numOfInts, options={} ){
    if(numOfInts === undefined || numOfInts === null) numOfInts = 1;
    if(typeof numOfInts !== "number") throw new TypeError('numOfInts must be an Integer.');
    if( !Number.isInteger( numOfInts ) ) throw new TypeError('numOfInts must be an Integer.');
    if( options.min ) {
        if (typeof options.min !== "number") throw new TypeError('options.min must be an Integer.');
        if (!Number.isInteger(options.min) && options.returnInteger) throw new TypeError('options.min must be an Integer.');
    }
    if(options.max){
        if (typeof options.max !== "number") throw new TypeError('options.max must be an Integer.');
        if (!Number.isInteger(options.max) && options.returnInteger) throw new TypeError('options.max must be an Integer.');
    }

    if( options.inclusive === undefined || options.inclusive === null ) options.inclusive = true;
    if(typeof options.inclusive !== "boolean") throw new TypeError('options.inclusive must be a boolean.');

    if(options.scale === undefined || options.scale === null) options.scale = 1000;
    if( typeof options.scale !== "number" ) throw new TypeError('options.scale must be an integer.');

    if(options.returnInteger === undefined || options.returnInteger === null ) options.returnInteger = true;
    if(typeof options.returnInteger !== "boolean") throw new TypeError('options.returnInteger must be a boolean.');

    if(options.numberOfDecimals === undefined || options.numberOfDecimals === null ) options.numberOfDecimals = 2;
    if(!Number.isInteger( options.numberOfDecimals ) && 0 < options.numberOfDecimals ) throw new TypeError('options.numberOfDecimals must be a positive Integer.');

    if(options.roundType === undefined || options.roundType === null ) options.roundType = 'normal';
    if( typeof options.roundType !== 'string' ) throw new TypeError('options.roundType must be a positive Integer.');

    let arr = [];

    if(options.returnInteger){
        let isMaxInt = Number.isInteger(options.max);
        let isMinInt = Number.isInteger(options.min);

        // Random number between and including a min and max
        if(isMinInt && isMaxInt && options.inclusive) {
            let min = Math.ceil(options.min);
            let max = Math.floor(options.max);

            for (let i = 0; i < numOfInts; i++) {
                arr[i] = Math.floor(Math.random() * (max + 1 - min)) + min;
            }

            // Random number between a min and max
        } else if(isMinInt && isMaxInt && !options.inclusive){
            let min = Math.ceil( options.min );
            let max = Math.floor( options.max );

            for(let i = 0; i < numOfInts; i++){
                arr[i] = Math.floor( Math.random() * (max - min + 1) ) + min;
            }

            // Random number greater than and including a min
        } else if(isMinInt && options.inclusive){
            for(let i = 0; i < numOfInts; i++){
                arr[i] =  Math.floor( Math.random() * Math.ceil( options.min ) );
            }

            // Random number greater than a min
        } else if(isMinInt && !options.inclusive){
            for(let i = 0; i < numOfInts; i++){
                arr[i] =  Math.floor( Math.random() * Math.ceil( options.min ) + 1 );
            }

            // Random number less than and including a max
        } else if(isMaxInt && options.inclusive){

            for(let i = 0; i < numOfInts; i++){
                arr[i] =  Math.floor( Math.random() * Math.floor( options.max ) );
            }

            // Random number less than a max
        } else if(isMaxInt && !options.inclusive){

            for(let i = 0; i < numOfInts; i++){
                arr[i] =  Math.floor( Math.random() * Math.floor( options.max ) - 1 );
            }

        } else {
            for(let i = 0; i < numOfInts; i++){
                arr[i] =  Math.floor( Math.random() * options.scale );
            }
        }
    } else {
        let isMinDouble = typeof options.min === "number" && options.min === options.min;
        let isMaxDouble = typeof options.min === "number" && options.min === options.min;

        // Random number between and including a min and max
        if(isMinDouble && isMaxDouble && options.inclusive) {
            let min = options.min;
            let max = options.max;
            for (let i = 0; i < numOfInts; i++) {
                arr[i] = +(Math.random() * (max + 1 - min) + min).toFixed(options.numberOfDecimals);
            }

            // Random number between a min and max
        } else if(isMinDouble && isMaxDouble && !options.inclusive){
            let min = options.min ;
            let max = options.max ;

            for(let i = 0; i < numOfInts; i++){
                arr[i] = +(Math.random() * (max - min + 1) + min).toFixed(options.numberOfDecimals);
            }

            // Random number greater than and including a min
        } else if(isMinDouble && options.inclusive){
            for(let i = 0; i < numOfInts; i++){
                arr[i] = +(Math.random() * Math.ceil( options.min )).toFixed(options.numberOfDecimals);
            }

            // Random number greater than a min
        } else if(isMinDouble && !options.inclusive){
            for(let i = 0; i < numOfInts; i++){
                arr[i] = +(Math.random() * Math.ceil( options.min ) + 1).toFixed(options.numberOfDecimals);
            }

            // Random number less than and including a max
        } else if(isMaxDouble && options.inclusive){
            for(let i = 0; i < numOfInts; i++){
                arr[i] =  +(Math.random() * options.max ).toFixed(options.numberOfDecimals);
            }

            // Random number less than a max
        } else if(isMaxDouble && !options.inclusive){
            for(let i = 0; i < numOfInts; i++){
                arr[i] = +(Math.random() * Math.floor( options.max ) - 1).toFixed(options.numberOfDecimals) ;
            }

        } else {
            for(let i = 0; i < numOfInts; i++){
                arr[i] =  +(Math.random() * options.scale).toFixed(options.numberOfDecimals);
            }
        }
    }

    return arr
}
// Test Cases
// console.log(getRandomNums(null, { scale: 100000 }));
// console.log(getRandomNums(null, { returnInteger: false }));
// console.log(getRandomNums(3));
// console.log(getRandomNums(1, { inclusive: false }));
// console.log(getRandomNums(3, { inclusive: false, max:25, min: 2 }));
// console.log(getRandomNums(3, { inclusive: true, max:25, min: 2 }));
// console.log(getRandomNums(3, { inclusive: true, max:25, min: 2, scale: 1000 }));
// console.log(getRandomNums(3, { inclusive: false, max:25, min: 2, scale: 1000 }));
// console.log(getRandomNums(3, { max: 1, min: 0 }));
// console.log(getRandomNums(3, { returnInteger: false }));
// console.log(getRandomNums(3, { returnInteger: false, numberOfDecimals: 5 }));
// console.log(getRandomNums(3, { returnInteger: false, numberOfDecimals: 5 }));
// console.log(getRandomNums(3, { returnInteger: false, scale: 50 }));


/*
 *
 * ucFirst
 *
 * Documentation
 *   This function returns a string with the first letter uppercased.
 *
 * Parameters - Note: only one Parameter, an Object.
 *     The list below shows what properties to include in that Object.
 *
 *     required
 *       type - string:    the type of the document, must be one of the following person, product, company, or order
 *
 *     optional
 *       version - Integer: a number indicating what iteration of the schema to use
 *
 *
 * Examples
 *
 */
function ucFirst( str ){
    if(str === undefined) throw new ReferenceError( 'str must be a string.' );

    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}
// Test Cases
// console.log(ucFirst('josh'));
// console.log(ucFirst('Josh'));
// console.log(ucFirst('McCormic'));
// console.log(ucFirst('mcCormic'));


/*
 *
 * genSchemaReference
 *
 * Documentation
 *   This function returns an object containing schemaId and schemaVersion.
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *     
 *     required
 *       type - string:    the type of the document, must be one of the following person, product, company, or order
 *       
 *     optional
 *       version - Integer: a number indicating what iteration of the schema to use
 *
 *
 * Examples
 *   genSchemaReference({ type: 'person', version: 39 }) => { schemaId: 'personSchema', schemaVersion: 39 }
 *   genSchemaReference({ type: 'person' })              => { schemaId: 'personSchema', schemaVersion: 0 }
 *   genSchemaReference({ version: 39 })                 => ReferenceError
 *
 */
function genSchemaReference( obj={} ){
    if(!obj.type) throw new ReferenceError( 'You must include a type property.' );
    if(!obj.version) obj.version = 0;

    return { schemaId: `${obj.type}Schema`, version: obj.version }
}
// Test cases
// console.log( JSON.stringify( genSchemaReference({ type:'person', version: 39 }) ) );
// console.log( JSON.stringify( genSchemaReference({ type:'person' }) ) );
// console.log( JSON.stringify( genSchemaReference({ version: 39 }) ) );


/*
 *
 * genPersonNameInfo
 *
 * Documentation
 *   This function returns the following,
 *       onlineName,
 *       firstName,
 *       lastName,
 *       middleName if it was passed in,
 *       maidenName if it was passed in,
 *       legalName,
 *       sortedName,
 *       informalLetterHead,
 *       formalLetterHead
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *     
 *     required
 *       id     - number: the person id for the document
 *       gender - string: the gender of the person, must be one of the following male or female
 *       data   - object: contains three properties maleFirstNames, femaleFirstNames, lastNames
 *         maleFirstNames   - array of strings, must be the same length as maleFirstNames
 *         femaleFirstNames - array of strings, must be the same length as femaleFirstNames
 *         lastNames        - array of strings, must be the same length as lastNames
 *
 *     optional
 *       middleName - boolean: specify if middle name is desired
 *       maidenName - boolean: specify if a maiden name is desired, WILL ONLY WORK if set to true and gender is female.
 *
 * Examples
 *   genPersonNameInfo({ id: 123456, gender:"male", data:{ maleFirstNames:[ "Joe" ], femaleFirstNames:[ "Ana" ],
 *      lastNames:[ "Smith" ] } })
 *     => { onlineName: "joe123456", firstName:"Joe", lastName:"Smith", legalName:"Joe Smith", sortedName: "Smith, Joe",
 *      informalLetterHead: "Joe", formalLetterHead:"Joe Smith"}
 *
 *   genPersonNameInfo({ id: 123456 })                => ReferenceError - gender required
 *   genPersonNameInfo({ gender:"male" })             => ReferenceError - id required
 *   genPersonNameInfo({ id: 123456, gender:"male" }) => ReferenceError - data required
 *
 *   genPersonNameInfo(data:{ femaleFirstNames:[ "Ana" ], lastNames:[ "Smith" ] })
 *     => ReferenceError - data.maleFirstNames required
 *
 *   genPersonNameInfo(data:{ maleFirstNames:[ "Joe" ], lastNames:[ "Smith" ] })
 *     => ReferenceError - data.femaleFirstNames required
 *
 *   genPersonNameInfo(data:{ maleFirstNames:[ "Joe" ], femaleFirstNames:[ "Ana" ] })
 *     => ReferenceError - data.lastNames required
 *
 *   genPersonNameInfo({ gender:"male" })             => ReferenceError - id required
 *
 *   genPersonNameInfo({ id: 123456, gender:"male", middleName:true, data:{ maleFirstNames:[ "Joe" ],
 *      femaleFirstNames:[ "Ana" ], lastNames:[ "Smith" ] } })
 *     => { onlineName: "joeAlbert123456", firstName:"Joe", lastName:"Smith", middleName:"Albert"
 *     legalName:"Joe Albert Smith", sortedName: "Smith, Joe Albert", informalLetterHead: "Joe",
 *     formalLetterHead:"Joe Smith"}
 *
 *   genPersonNameInfo({ id: 123456, gender:"male", maidenName:true })
 *     => TypeError - gender must be female for maidenName to be present
 *
 *   genPersonNameInfo({ id: 123456, gender:"male", data:{ maleFirstNames:[ "Joe" ], femaleFirstNames:[ "Ana" ],
 *      lastNames:[ "Smith" ] }, maidenName:true, middleName:true })
 *     => { onlineName: "anaAlbert123456", firstName:"Ana", lastName:"Smith", middleName:"Alberta"
 *     legalName:"Ana Alberta Smith", sortedName: "Smith, Ana Alberta", informalLetterHead: "Ana",
 *     formalLetterHead:"Ana Alberta Smith"}
 */
function genPersonNameInfo(obj={}){
    if(!Number.isInteger(obj.id)) throw new ReferenceError('You must provide an id.');
    if(!obj.gender) throw new ReferenceError('You must provide a gender');
    if(!obj.data) throw new ReferenceError('You must provide a data object containing femaleFirstNames, maleFirstNames, and lastNames.');
    if(!obj.data.femaleFirstNames) throw new ReferenceError('You must provide a data object containing femaleFirstNames.');
    if(!obj.data.maleFirstNames) throw new ReferenceError('You must provide a data object containing maleFirstNames.');
    if(!obj.data.lastNames) throw new ReferenceError('You must provide a data object containing lastNames.');

    //set defaults for optional arguments
    if(!obj.middleName) obj.middleName = false;
    if(!obj.maidenName) obj.maidenName = false;



    // get two random numbers
    let ranNum = getRandomNums( 5, {min: 0, max: obj.data.lastNames.length-1} );

    let fName = "";
    if(obj.gender.toLowerCase() === "male"){
        fName = obj.data.maleFirstNames[ Math.floor(Math.random()*(obj.data.maleFirstNames.length)) ].name
    } else {
        fName = obj.data.femaleFirstNames[ Math.floor(Math.random()*(obj.data.femaleFirstNames.length)) ].name
    }

    let lName = obj.data.lastNames[ Math.floor(Math.random()*(obj.data.lastNames.length)) ].name;

    let nameInfo = {
        name: `${fName} ${lName}`,
        firstName: fName,
        lastName: lName,
        informalLetterHead: `${fName}`
    };

    // middleName if it was passed in,
    if( obj.middleName ){
        let mName = "";
        if(obj.gender.toLowerCase() === "male"){
            mName = obj.data.maleFirstNames[ Math.floor(Math.random()*(obj.data.maleFirstNames.length)) ].name
        } else {
            mName = obj.data.femaleFirstNames[ Math.floor(Math.random()*(obj.data.femaleFirstNames.length)) ].name
        }
        nameInfo.middleName = mName;
        nameInfo.legalName = `${fName} ${mName} ${lName}`;
        nameInfo.sortedName = `${lName}, ${fName} ${mName}`;
        nameInfo.formalLetterHead = `${fName} ${mName} ${lName}`;
        nameInfo.onlineName = `${fName.toLowerCase()}${ucFirst(mName)}${obj.id}`
    } else {
        nameInfo.legalName = `${fName} ${lName}`;
        nameInfo.sortedName = `${lName}, ${fName}`;
        nameInfo.formalLetterHead = `${fName} ${lName}`;
        nameInfo.onlineName = `${fName.toLowerCase()}${obj.id}`
    }

    // maidenName if it was passed in,
    if(obj.maidenName){
        nameInfo.maidenName = obj.data.lastNames[ Math.floor(Math.random()*(obj.data.lastNames.length)) ];
    }

    return nameInfo
}
// test cases
// console.log( genPersonNameInfo({ id: 123456, gender:"male", data:{ maleFirstNames:[ "Joe" ], femaleFirstNames:[ "Ana" ], lastNames:[ "Smith" ] } }) );
// console.log( genPersonNameInfo({ id: 123456, gender:"male", middleName:true, data:{ maleFirstNames:[ "Joe" ], femaleFirstNames:[ "Ana" ], lastNames:[ "Smith" ] } }) );
// console.log( genPersonNameInfo({ id: 123456, gender:"male", data:{ maleFirstNames:[ "Joe" ], femaleFirstNames:[ "Ana" ], lastNames:[ "Smith" ] }, maidenName:true, middleName:true }) );


/*
 *
 * genPaymentMethod
 *
 * Documentation
 *     This function gets a company from a provided list.
 *
 * Parameters - Note: only one Parameter, an Object.
 *     The list below shows what properties to include in that Object.
 *
 * TODO: use the state to determine length and available characters of divers license number.
 * TODO: Internationalize this for each country and state with in each country... this will be a side objective...
 *
 *
 * Examples
 */
function genPaymentMethod(obj={}){
    let arr = [];

    let range = Math.floor(Math.random()*obj.maxPaymentMethods - 1) + 1;
    // console.log(range);

    for(let i = 0; i < range; ++i){
        let object = {};
        let type = obj.enums.getPaymentMethodType().paymentMethodType;

        object.paymentMethodId             = `${obj.baseObjectId + i}${obj.id}`;
        object.paymentMethodType           = type;
        object.paymentMethodStatus         = obj.enums.getPaymentMethodStatus().paymentMethodStatus;

        switch(type){
            case "Credit Card":
                let addressIndex = Math.floor(Math.random()*obj.address.length);
                let address = obj.address[addressIndex];

                object.creditCardNumber              = genCreditCardNumber();
                object.creditCardExperiationDate     = genDate({start: obj.expirationStartDate, end: obj.expirationEndDate});
                object.nameOnCreditCard              = `${obj.firstName.toUpperCase()} ${obj.lastName.toUpperCase()}`;
                object.creditCardValidationAddress   = genAddressString(address, addressIndex, obj.address);
                object.creditCardValidationAddressId = address.addressId;
                break;
            case "Bank Account":
                object.bankRoutingNumber = Math.floor(Math.random()*100000000);
                object.bankAccountNumber = Math.floor(Math.random()*100000000000);
                object.nameOnBankAccount = `${obj.firstName} ${obj.lastName}`;
                // TODO: need to match the format to the state
                object.driversLicenseNumber = `${Math.floor(Math.random()*(100000000000000 - 100000000))+100000000}`;
                // TODO: need to make all 50 states available
                object.driversLicenseState = "AK";
                break;
            case "Cash":
                break;
            case "Check":
                object.bankRoutingNumber = Math.floor(Math.random()*100000000);
                object.bankAccountNumber = Math.floor(Math.random()*100000000000);
                object.checkNumber = Math.floor(Math.random()*9999) + 1;
                break;
        }

        arr[i] = object
    }

    return arr
}
// Test Cases
// const enums = require('./../enums/enums-person.js');
// console.log(
//     JSON.stringify(
//         genPaymentMethod({
//             baseObjectId: 90,
//             id: 123456987,
//             maxPaymentMethods: 5,
//             enums: enums,
//             expirationStartDate: new Date(2010, 11, 21),
//             expirationEndDate: new Date(2038,11,21),
//             firstName: "Josh",
//             lastName: "Bowers",
//             address: [{"addressCoordinates":["-149.4672014","61.4253086"],"addressStreet":["22706 OAK KNOLL DR"],"addressLocality":"Anchorage","addressRegion":"AK","addressPostalCode":"99567","addressCountry":"United States","addressPurpose":"P.O. Box"},{"addressCoordinates":["-149.4806201","61.4253509"],"addressStreet":["22700 KNIK VISTA ST"],"addressLocality":"Anchorage","addressRegion":"AK","addressPostalCode":"99567","addressCountry":"United States","addressPurpose":"Family"}]
//         }), null, 2
//     )
// );


// genCreditCardNumber
// TODO: need to account for the different formats based on the type of credit card
function genCreditCardNumber(){

    let creditCardNumber = Math.floor(Math.random()*10000000000000000);
    if( creditCardNumber.length < 16 ){
        genCreditCardNumber();
    } else {
        return creditCardNumber;
    }
}


// genAddressString
function genAddressString(address, addressIndex, addresses){

    try{
        address.addressStreet.length
    } catch(err){
        console.log( JSON.stringify( address ) );
        console.log( JSON.stringify( addressIndex ) );
        console.log( JSON.stringify( addresses, null, 2 ) );
        throw err;
    }

    let multipleStreetLines = address.addressStreet.length > 1;
    let street = "";

    if(multipleStreetLines){
        for(let i = 0; i < address.addressStreet.length; ++i){
            street += `, ${address.addressStreet[i]}`;
        }
    } else {
        street = address.addressStreet[0]
    }

    return `${street}, ${address.addressLocality}, ${address.addressRegion}, ${address.addressPostalCode}, ${address.addressCountry}`
}


/*
 *
 * genCompanyNameInfo
 *
 * Documentation
 *     This function gets a company from a provided list.
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *     required
 *       data - array of strings: This must be an array of strings where each string is a company name to choose from
 *
 *
 * Examples
 *   genCompanyNameInfo({ data: [ "Best Buy Inc.", "Electronic Central", "JCPenny's" ] }) => get one of those names
 *     from the list
 */
function genCompanyNameInfo(obj={}){
    if(!obj.data) throw ReferenceError('You must provide a property named data.');
    if(!Array.isArray( obj.data ) ) throw TypeError('You must provide a property named data containing an Array.');

    let ranNums = getRandomNums(3, { scale: obj.data.length-1});

    // STYLE&GRAPHICS

    let cName = obj.data[ ranNums[0] ];
    // console.log(cName);
    let targetLevel = Math.ceil( Math.random()*100 );

    return {
        companyName: cName,
        companyInformalName: getCompanyInformalName( cName ),
        parentCompanyOf: obj.data[ ranNums[1] ],
        subsidiaryOf: obj.data[ ranNums[2] ]
    }
}
// Test Cases
// console.log( JSON.stringify( genCompanyNameInfo({ data: [ "Best Buy Inc.", "Electronic Central", "JCPenny's", "!J INC", "#1 A LIFESAFER HOLDINGS, INC." ] }) ) );


/*
 *
 * genProductInfo
 *
 * Documentation
 *   Return an object with general product information. The properties returned are,
 *     productCode,
 *     productName,
 *     productDescription,
 *     productKeywords,
 *     productImages
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *     required
*         name - string: The Name - it is not unique
*         code - string: A code from the source data uniquely identifying the product.
*         description - string: A string that is at least empty.
*         imgPath - string: A path to where an image is stored.
 *
 *     optional
 *       minInventory - Integer: a minimum number for productInventoryReorderLevel and productInventoryTargetLevel.
 *         Default is 0
 *       maxInventory - Integer: a maximum number for productInventoryReorderLevel and productInventoryTargetLevel.
 *       minDiscount  - Integer: a minimum number for productDiscountPrice. Default is 0.
 *       maxDiscount  - Integer: a maximum number for productDiscountPrice.
 *       minCost      - Integer: a minimum number for productStandardCost. Default is 0
 *       maxCost      - Integer: a maximum number for productStandardCost.
 *       minPrice     - Integer: a minimum number for productListPrice. Default is 0
 *       maxPrice     - Integer: a maximum number for productListPrice.
 *
 * Examples
 */
function genProductInfo(obj={}){
    // checking for valid values
    if(obj.minInventory !== undefined && !Number.isInteger(obj.minInventory)){
        throw new TypeError('minInventory must be an Integer.')
    }
    if(obj.maxInventory !== undefined && !Number.isInteger(obj.maxInventory)){
        throw new TypeError('maxInventory must be an Integer.')
    }
    if(obj.minDiscount !== undefined && !Number.isInteger(obj.minDiscount)){
        throw new TypeError('minDiscount must be an Integer.')
    }
    if(obj.maxDiscount !== undefined && !Number.isInteger(obj.maxDiscount)){
        throw new TypeError('maxDiscount must be an Integer.')
    }
    if(obj.minCost !== undefined && !Number.isInteger(obj.minCost)){
        throw new TypeError('minCost must be an Integer.')
    }
    if(obj.maxCost !== undefined && !Number.isInteger(obj.maxCost)){
        throw new TypeError('maxCost must be an Integer.')
    }
    if(obj.minPrice !== undefined && !Number.isInteger(obj.minPrice)){
        throw new TypeError('minPrice must be an Integer.')
    }
    if(obj.maxPrice !== undefined && !Number.isInteger(obj.maxPrice)){
        throw new TypeError('maxPrice must be an Integer.')
    }

    // setting default values
    if(obj.minInventory === undefined){obj.minInventory = 0}
    if(obj.minDiscount === undefined){obj.minDiscount = 0}
    if(obj.minCost === undefined){obj.minCost = 0}
    if(obj.minPrice === undefined){obj.minPrice = 0}

    const ranNum = getRandomNums( 2, { returnInteger:false, scale: 50 } );

    return {
        productCode: obj.code,
        productName: obj.name,
        productDescription: obj.description,
        productKeywords: obj.keywords,
        productImages: obj.images,
        productAvailabilityDate: genDate({ start: new Date(2008, 11, 1), end: new Date() }),
        productListPrice: ranNum[0],
        productDiscountPrice: +(Math.random()*ranNum[0]).toFixed(2),
        productStandardCost: +(ranNum[0] + (Math.random()*ranNum[0]/8)).toFixed(2),
        productInventoryReorderLevel: Math.ceil(ranNum[1]),
        productInventoryTargetLevel: Math.floor(Math.random()*Math.ceil(ranNum[1])) + Math.ceil(ranNum[1])
    }
}
// console.log(genProductInfo({ code: "89987654321-654987321", name: "Product Name", description:"Product Description", keywords:["keyword"], images:["./path/to/image.png"] }));


/*
 *
 * genProductMeasures
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *     required
 *       id - string: the Id of the product
 *       enums - Object: the object containing all the enums and their getter functions.
 *
 *
 * Examples
 */
function genProductMeasures(obj={}){

    let arr = [];

    let range =  Math.floor(Math.random()*obj.maxProductMeasurements) + 1;

    for(let i = 0; i < range; i++) {
        arr[i] = {
            productMeasureId: `${i + 1 + obj.baseObjectId}${obj.id}`,
            productMeasurePurpose: obj.enums.getProductMeasurePurpose().productMeasurePurpose,
            productWeight: Math.floor(Math.random()*30),
            productWeightUOM: obj.enums.getProductWeightUOM().productWeightUOM,
            productWidth: Math.floor(Math.random()*9) + 1,
            productHeight: Math.floor(Math.random()*9) + 1,
            productLength: Math.floor(Math.random()*9) + 1,
            productSizeUOM: obj.enums.getProductSizeUOM().productSizeUOM
        }
    }

    return arr
}
// Test Cases
// console.log(
//     JSON.stringify(
//         genProductMeasures({
//             id: "123456987",
//             enums: require("./../enums/enums-product.js"),
//             baseObjectId: 0,
//             maxProductMeasurements: 4
//         })
//     )
// );


/*
 *
 * genProductReviewSummary
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *     required
 *
 *     TODO: make it possible to define a distribution, using an array of numbers, to specify how to spread out the data
 *
 *
 * Examples
 */
function genProductReviewSummary(){
    let five = Math.floor( Math.random()*2500);
    let four = Math.floor( Math.random()*2500);
    let three = Math.floor( Math.random()*2500);
    let two = Math.floor( Math.random()*2500);
    let one = Math.floor( Math.random()*2500);

    return {
        fiveStar: five,
        fourStar: four,
        threeStar: three,
        twoStar: two,
        oneStar: one,
        reviewCount: one + two + three + four + five
    }
}
// Test Cases
// console.log(genProductReviewSummary());


/*
 *
 * genProductQA
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *
 *
 * TODO: Need to finish... This will be a difficult one...
 * TODO: Current thought is to parse some text data into the question format that this function then references.
 *
 * TODO: make it possible to define a distribution, using an array of numbers, to specify how to spread out the data
 *
 *
 * Examples
 */
// function genProductQA(obj={}){
//     if(!Number.isInteger( obj.questionUpperLimit )) obj.questionUpperLimit = 50;
//     if(!Number.isInteger( obj.answerUpperLimit )) obj.answerUpperLimit = 20;
//
//     let pathsToTexts = require("D:\\_fakeData\\guttenberg\\pathsToJson.js").data;
//     let currentPathIndex = 0;
//     let currentParaIndex = 0;
//
//     let numOfQuestions = Math.floor( Math.random()*obj.questionUpperLimit );
//     let qa = [];
//
//     for( let i = 0; i < numOfQuestions; ++i ) {
//         let srcData = require(pathsToTexts[currentPathIndex]).paragraph;
//
//         if(currentParaIndex >= srcData.length){
//             if( currentPathIndex >= pathsToTexts.length ){
//                 throw new RangeError('You have exceed the amount of available source data.')
//             } else {
//                 srcData = require(pathsToTexts[currentPathIndex + 1]);
//                 ++currentPathIndex
//             }
//
//             currentParaIndex = 0;
//         }
//
//         let object = {};
//         object.questionId = `1${i}${obj.id}`;
//
//         for(let j = currentParaIndex; j < Math.floor(Math.random()*obj.answerUpperLimit); ++j){
//             // building a question
//             let sentences = srcData[j].replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
//
//             if(sentences.length < 1){
//                 throw new RangeError('Your regex failed...')
//             } else if(sentences.length < 2){
//                 opbject.question = sentances[]
//             }
//
//             ++currentParaIndex;
//         }
//
//         object.question =
//         qa[i] = object;
//     }
//
//     let objCounter = 0;
//     let ans = [];
//
//     for(let j = 0; j < Math.floor(Math.random()*obj.answerUpperLimit); ++j){
//         let object = {};
//
//     }
//
//     return qa
// }


/*
 *
 * genOrderProductsInfo
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object.
 *     The list below shows what properties to include in that Object.
 *
 *     required
 *       maxProductId - Integer: the starting number of the product id space
 *       minProductId - Integer: the ending number of the product id space
 *       maxQty       - Integer: the maximum number of each item ordered
 *
 *
 * Examples
 */
function genOrderProductsInfo(obj={}){
    let arr = [];

    let total = 0;
    let shipCost = 0;

    for(let i = 0; i < Math.floor(Math.random()*7) + 1; ++i){

        let qty = Math.floor(Math.random()*(obj.maxQty-1)) + 1;
        let price = +(((Math.random()*50) + 2).toFixed(2));
        let shippingCost = +(((Math.random()*7)+1).toFixed(2));

        total += price * qty;
        shipCost += shippingCost * qty;

        arr[i] = {
            id: Math.floor(Math.random()*( obj.maxProductId - obj.minProductId)) + obj.minProductId,
            qty: qty,
            historicalProductPrice: price,
            shippingCost: shippingCost
        }
    }

    let shipCredit = +(((Math.random()*10).toFixed(2)));
    let salesTax = +((0.067 * total).toFixed(2));

    let totals = {};
    totals.totalOrderItemCost = +(total.toFixed(2));
    totals.totalShippingCost = shipCost;
    totals.totalShippingCredit = shipCredit;
    totals.salesTax = salesTax;
    totals.totalCost = +((salesTax + total + shipCost - shipCredit).toFixed(2));

    // TODO: when building script need to finish this portion of the function!
    // This is to generate the order payment section which means it will need access the person doc making the order.
    // This might be easier to do in the script rather than in a separate function
    // let orderPayment = [];
    //
    // let numOfPaymentMethods = Math.floor(Math.random()*obj.maxPaymentMethods - 1) + 1;
    //
    // let paymentMethod = "";
    //
    // if( numOfPaymentMethods === 1 ){
    //     paymentMethod = "Guest Checkout"
    // }
    //
    // for(let j = 0; j < numOfPaymentMethods; ++j){
    //     let object = {};
    //     object.orderPaymentAmount = '';
    //     object.paymentMethod = {};
    //     object.paymentMethod.paymentMethodType = numOfPaymentMethods === 1 ? paymentMethod : enums.getPaymentMethodType().paymentMethodType
    //
    // }


    // return {orderProducts: arr, orderTotals: totals, orderPayment: paymentMethod }
    return {orderProducts: arr, orderTotals: totals }
}
// Test Cases
// const enums = require('./../enums/enums-order.js');
// console.log(
//     JSON.stringify(
//         genOrderProductsInfo({
//             maxProductId: 2000,
//             minProductId: 1000,
//             maxQty: 10 ,
//             maxPaymentMethods: 5,
//             enums: enums
//         }),
//         null,
//         2
//     )
// );


/*
 *
 * genOrderInfo
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object.
 *     The list below shows what properties to include in that Object.
 *
 * Examples
 */
function genOrderInfo(obj={}){
    return {
        orderNumber: obj.id,
        orderDate: genDate({start: obj.startDate, end: obj.endDate}),
        orderStatus: obj.enums.getOrderStatus().orderStatus,
        customerId: obj.customerId,
        customerName: obj.name
    }
}
// Test Cases
// console.log(
//     JSON.stringify(
//         genOrderInfo({
//             id: 123456987,
//             startDate: new Date(2000, 0, 1),
//             endDate: new Date(),
//             enums: require("./../enums/enums-order.js"),
//             customerId: 321654789,
//             name: "Josh"
//         })
//     )
// );


/*
 *
 * genDocComment
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 * TODO: currently leaving out because requires access to all paragraphs in doc to be accurate.
 *
 * Examples
 */
// function genDocComment(obj={}){
//
// }


/*
 *
 * genDocKeywords
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 * TODO: currently leaving out because requires access to all paragraphs in doc to be accurate.
 *
 *
 * Examples
 */



/*
 *
 * genDocHistory
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *
 * Examples
 */
function genDocHistory(obj={}){

    if(!obj.startDateTime) obj.startDateTime = new Date(1970,0,1);
    if(!obj.fixedStartDate) obj.fixedStartDate = false;

    let arr = [];
    let range = Math.ceil(Math.random()*5);
    let dne = true;
    let minDate = obj.startDateTime;

    for(let i = 0; i < range; ++i){

        let object = {};

        let dateTime;

        if(obj.fixedStartDate){
            dateTime = obj.startDateTime;
            obj.fixedStartDate = false;
        } else {
            dateTime = genDateTime({start: new Date( minDate ), end: new Date()});
        }


        let event = obj.enums.getDocEvent().docEvent;

        if( i === 0 ){
            event = "Insert";
            dne = false;
        }
        else if( dne ){
            event = "Undelete";
            dne = false;
        }
        else if( event === "Insert" ){ event = "Update" }
        else if( event === "Delete" && i < range - 1 ){ dne = true }
        else if( event === "Undelete" && !dne ){ event = "Update" }
        else if( event === "Update" && dne ){ event = "Undelete" }


        object.docVersion = 1 + i/10;
        object.docEditorId = Math.floor(Math.random()*(obj.maxPersonId - obj.minPersonId)) + obj.minPersonId;
        object.docEvent = event;
        object.docEditDateTime = dateTime;
        object.docHistoryId = `${obj.baseObjectId + i}${obj.id}`;

        arr[i] = object;
        minDate = new Date(dateTime);
    }

    return arr

}
// Test Cases
// const productEnums = require("./../enums/enums-product.js");
// console.log(
//     JSON.stringify(
//         genDocHistory({
//             minPersonId: 0,
//             maxPersonId: 1000,
//             id: "123456987",
//             baseObjectId: 30,
//             enums: productEnums,
//             startDateTime: new Date(2016,1,2)
//         }),
//         null,
//         2
//     )
// );



/*
 *
 * genAddresses
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *     required
 *       address - Array: an array of objects to be used to generate address
 *       index   - Integer: the position in the array to get the address
 *
 * TODO: Currently going to use ~/us/ak/anchorage.json as my source since it has over 100,000 address.
 * TODO: Need to remove assumptions pertaining to previous statement.
 *
 *
 * Examples
 */
function genAddresses(obj={}){

    let address = [];

    let range = Math.floor( Math.random()*( obj.maxNumOfAddresses - 1 ) ) + 1;

    let i = 0;

    for(i; i < range; ++i ){
        let addressObj = obj.address[obj.index + i];

        let unit = "";
        let city = "";
        let district = "";
        let region = "";
        let postcode = "";

        if(addressObj.UNIT) unit = addressObj.UNIT;
        if(addressObj.CITY) city = addressObj.CITY;
        if(addressObj.DISTRICT) district = addressObj.DISTRICT;
        if(addressObj.REGION) region = addressObj.REGION;
        if(addressObj.POSTCODE) postcode = addressObj.POSTCODE;

        let street = [];

        if( unit !== "" ){
            street = [ `${addressObj.NUMBER} ${addressObj.STREET}`, unit ];
        } else {
            street = [ `${addressObj.NUMBER} ${addressObj.STREET}` ];
        }

        address.push({
            addressId: `${obj.baseObjectId + i}${obj.id}`,
            addressCoordinates:[ parseFloat( addressObj.LON ), parseFloat( addressObj.LAT ) ],
            addressStreet: street,
            addressLocality: city,
            addressRegion: region,
            addressPostalCode: parseInt( postcode ),
            addressCountry: "United States",
            addressPurpose: obj.enums.getAddressPurpose().addressPurpose
        });
    }

    // if( address.length === 0 ){
    //     console.log( `nextIteration: ${i + obj.index}` );
    //     console.log( `Range: ${range}` );
    //     console.log( `Address: ${JSON.stringify( obj.address.slice( obj.index, obj.index + range ) )}` );
    // }

    // nextIteration is important because it allows the script to not repeat addresses unless it is intentional.
    return {address: address, nextIteration: i + obj.index}
}
// Test Cases
// const addresses = require('./../_sourceData/addresses/us/ak/anchorage.json');
// const enums = require('./../enums/enums-person.js');
// console.log( JSON.stringify( genAddresses({ address: addresses, index: 10, enums: enums, baseObjectId: 190, id:123654789, maxNumOfAddresses: 5 }), null, 2 ) );


/*
 *
 * genPhoneNumbers
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *
 * Examples
 */
function genPhoneNumbers(obj={}){
    if(!obj.delimiter) obj.delimiter = " ";

    let arr = [];
    let range = Math.ceil(Math.random()*5);

    for(let i = 0; i < range; ++i){
        let phoneNumber =
            `${Math.floor(Math.random()*9)+ 1}`.concat(
                obj.delimiter,
                Math.floor(Math.random()*(999 - 100))+100,
                obj.delimiter,
                Math.floor(Math.random()*(999 - 100))+100,
                obj.delimiter,
                Math.floor(Math.random()*(9999 - 1000))+1000
            );

        arr[i] = {
            phoneId: `${obj.baseObjectId + i}${obj.id}`,
            purpose: obj.enums.getPhonePurpose().phonePurpose,
            number: phoneNumber
        }
    }

    return arr;
}
// Test Cases
// const enums = require('./../enums/enums-company.js');
// console.log( JSON.stringify( genPhoneNumbers({baseObjectId: 10, id: "123456789", enums: enums, delimiter: "-" }), null, 2 ) );


/*
 *
 * genEmails
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *
 *
 * Examples
 */
function genEmails(obj = {}) {

    if(!obj.maxEmails){ obj.maxEmails = 4 } else {--obj.maxEmails}

    let arr = [];

    let range = Math.floor(Math.random()*obj.maxEmails ) + 1;

    let domains = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];

    for(let i = 0; i < range; ++i){
        arr[i] = {
            emailId: `${obj.baseObjectId + i}${obj.id}`,
            purpose: obj.enums.getEmailPurpose(
                obj.numOfRecords*(obj.maxEmails-1),
                obj.percentages,
                obj.iteration + i
            ).emailPurpose,
            address: `${obj.name.toLowerCase()}${obj.id}@${ domains[ Math.floor(Math.random()*domains.length ) ] }`
        };
    }

    return arr
}
// Test Cases
// const enums = require('./../enums/enums-company.js');
// console.log(
//     JSON.stringify(
//         genEmails({
//             baseObjectId: 20,
//             id: 123456987,
//             enums: enums,
//             name:"Josh",
//             numOfRecords: 50,
//             percentages:[0.60,0.30,0.10],
//             iteration: 150
//         }), null, 2 ) );


/*
 *
 * genWebsites
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object.
 *     The list below shows what properties to include in that Object.
 *
 *
 * TODO: Need to figure out how to handle duplicate purposes. This should probably be done in the enums file.
 * TODO: Need to figure out how to handle two different email entries with the same purpose.
 *
 * Examples
 */
function genCompanyEmails(obj = {}) {

    if(!obj.maxEmails){ obj.maxEmails = 4 } else {--obj.maxEmails}

    let arr = [];

    let range = Math.floor(Math.random()*obj.maxEmails ) + 1;

   for(let i = 0; i < range; ++i){
       let purpose = obj.enums.getEmailPurpose( obj.percentages ).emailPurpose;

        arr[i] = {
            emailId: `${obj.baseObjectId + i}${obj.id}`,
            purpose: purpose,
            address: `${purpose[0]}${obj.id}@${ obj.domain }`
        };
    }

    return arr
}
// Test Cases
// const enums = require('./../enums/enums-company.js');
// console.log(
//     JSON.stringify(
//         genCompanyEmails({
//             baseObjectId: 20,
//             id: 123456987,
//             enums: enums,
//             domain: "i18next.com",
//             numOfRecords: 50,
//             percentages:[0.60,0.30,0.10],
//             iteration: 150
//         }), null, 2 ) );


/*
 *
 * genWebsites
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *
 * Examples
 */
function genWebsites(obj={}){
    let arr = [];

    let range = Math.floor(Math.random()*obj.maxWebsites) + 1;

    for(let i = 0; i < range; ++i){
        arr[i] = {
            websiteId: `${obj.baseObjectId}${obj.id}`,
            websitePurpose: obj.enums.getWebsitePurpose().websitePurpose,
            url: obj.domains[Math.floor(Math.random()*obj.domains.length)]
        }
    }

    return arr;
}
// Test Cases
// console.log(
//     JSON.stringify(
//         genWebsites({
//             baseObjectId: 60,
//             id: 123456987,
//             enums: require('./../enums/enums-person.js'),
//             domains: require( './../_sourceData/domainNames/domainNames_random.json' ),
//             scaler: 1000,
//             maxWebsites: 5
//         })
//     )
// );


/*
 *
 * genCustomer
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *
 * Examples
 */
function genCustomer(obj={}){
    return {
        customerId: `${obj.baseObjectId}${obj.personId}`,
        status: obj.enums.getCustomerStatus().customerStatus,
        customerJoinDate: genDate({ start: new Date(2008, 11, 1), end: new Date() }),
        customerReviewerRank: Math.floor(Math.random()*obj.reviewerRankScale)
    }
}
// Test Cases
// const enums = require('./../enums/enums-person.js');
// console.log( JSON.stringify( genCustomer({ enums:enums, personId: 123456987, baseObjectId:40, reviewerRankScale: 10 }) ) );


/*
 *
 * genTriples
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *
 * TODO: need to make parameters more generic like an array of objects with start and end... for id ranges.
 *
 *
 * Examples
 */
function genTriples(obj={}){

    // let personPredicates = [
    //     { subject: "thisPerson", predicate: "hasSpouse",            object: "person" },
    //     { subject: "thisPerson", predicate: "hasChild",             object: "person" },
    //     { subject: "thisPerson", predicate: "likesProduct",         object: "product" },
    //     { subject: "thisPerson", predicate: "accountRepForProduct", object: "person" },
    //     { subject: "thisPerson", predicate: "accountRepForCompany", object: "person" },
    //     { subject: "thisPerson", predicate: "deliveryPersonFor",    object: "order" },
    //     { subject: "thisPerson", predicate: "employeeOf",           object: "company" }
    // ];
    //
    // let orderPredicates = [ { subject: "person", predicate: "ordered", object: "thisOrder" } ];
    //
    // let productPredicates = [ { subject: "thisProduct", predicate: "productsOftenSoldTogether", object: "product" } ];
    //
    // let companyPredicates = [
    //     { subject: "thisCompany", predicate: "hasCompanyRep",   object: "person" },
    //     { subject: "thisCompany", predicate: "subsidiaryOf",    object: "company" },
    //     { subject: "thisCompany", predicate: "splitFrom",       object: "company" },
    //     { subject: "thisCompany", predicate: "parentCompanyOf", object: "company" },
    // ];

    let preds = [];

    switch(obj.docType){
        case "person":
            preds = [
                { subject: "thisPerson", predicate: "hasSpouse",            object: "person" },
                { subject: "thisPerson", predicate: "hasChild",             object: "person" },
                { subject: "thisPerson", predicate: "likesProduct",         object: "product" },
                { subject: "thisPerson", predicate: "accountRepForProduct", object: "person" },
                { subject: "thisPerson", predicate: "accountRepForCompany", object: "person" },
                { subject: "thisPerson", predicate: "deliveryPersonFor",    object: "order" },
                { subject: "thisPerson", predicate: "employeeOf",           object: "company" }
            ];
            break;
        case "product":
            preds = [ { subject: "thisProduct", predicate: "productsOftenSoldTogether", object: "product" } ];
            break;
        case "company":
            preds = [
                { subject: "thisCompany", predicate: "hasCompanyRep",   object: "person" },
                { subject: "thisCompany", predicate: "subsidiaryOf",    object: "company" },
                { subject: "thisCompany", predicate: "splitFrom",       object: "company" },
                { subject: "thisCompany", predicate: "parentCompanyOf", object: "company" },
            ];
            break;
        case "order":
            preds = [ { subject: "person", predicate: "ordered", object: "thisOrder" } ];
            break;
    }

    let range = Math.ceil(Math.random()*preds.length);

    let arr = [];

    for(let i = 0; i < range; ++i){

        let pred = Math.floor(Math.random()*preds.length);

        let subject = "";
        let object = "";

        switch(preds[pred].subject){
            case "thisPerson":
            case "thisCompany":
            case "thisProduct":
            case "thisOrder":
                subject = obj.id;
                break;
            case "person":
                subject = Math.floor(Math.random()*(obj.personIdEnd - obj.personIdStart)) + obj.personIdStart;
                break;
            case "product":
                subject = Math.floor(Math.random()*(obj.productIdEnd - obj.productIdStart)) + obj.productIdStart;
                break;
            case "company":
                subject = Math.floor(Math.random()*(obj.companyIdEnd - obj.companyIdStart)) + obj.companyIdStart;
                break;
            case "order":
                subject = Math.floor(Math.random()*(obj.orderIdEnd - obj.orderIdStart)) + obj.orderIdStart;
                break;
        }

        switch(preds[pred].object){
            case "person":
                object = Math.floor(Math.random()*(obj.personIdEnd - obj.personIdStart)) + obj.personIdStart;
                break;
            case "product":
                object = Math.floor(Math.random()*(obj.productIdEnd - obj.productIdStart)) + obj.productIdStart;
                break;
            case "company":
                object = Math.floor(Math.random()*(obj.companyIdEnd - obj.companyIdStart)) + obj.companyIdStart;
                break;
            case "order":
                object = Math.floor(Math.random()*(obj.orderIdEnd - obj.orderIdStart)) + obj.orderIdStart;
                break;
            case "thisPerson":
            case "thisCompany":
            case "thisProduct":
            case "thisOrder":
                object = obj.id;
                break;
        }

        arr[i] = {
            tripleId: `${obj.baseObjectId}${obj.id}`,
            subject: subject,
            predicate: preds[pred].predicate,
            object: object
        }
    }

    return arr;
}
// Test Cases
// console.log(
//     JSON.stringify(
//         genTriples({
//             baseObjectId: 50,
//             id: 132456987,
//             docType: "company",
//             personIdEnd: 999,
//             personIdStart: 0,
//             companyIdEnd: 1999,
//             companyIdStart: 1000,
//             productIdEnd: 2999,
//             productIdStart: 2000,
//             orderIdEnd: 3999,
//             orderIdStart: 3000
//         })
//     )
// );


/*
 *
 * genOriginHistories
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 * TODO: no need to worry about this now
 *
 * Examples
 */



/*
 *
 * genSupplier
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *
 * TODO: no need to worry about this now
 *
 * Examples
 */



/*
 *
 * genSeller
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object. 
 *     The list below shows what properties to include in that Object.
 *
 *
 * TODO: no need to worry about this now
 *
 * Examples
 */



/*
 *
 * genShipmentNotes
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object.
 *     The list below shows what properties to include in that Object.
 *
 *
 * TODO: will need to do this in the script since I need the text from the document to generate this.
 *
 *
 * Examples
 */
// function genShipmentNotes(obj={}){
//
// }


/*
 *
 * genDateTime
 *
 * Documentation
 *
 *
 * Parameters - Note: only one Parameter, an Object.
 *     The list below shows what properties to include in that Object.
 *
 *     optional
 *       start - JS Date Object: must be a valid ISO date.
 *       end  - JS Date Object: must be a valid ISO date.
 *
 * Examples
 */
function genDateTime(obj={}){
    return new Date(obj.start.getTime() + Math.random() * (obj.end.getTime() - obj.start.getTime())).toISOString();
}
// Test Cases
// console.log( genDateTime({ start: new Date(2004, 1, 32), end: new Date() }) );


/*
 *
 * genDate
 *
 * Documentation
 *   Returns a date in the ISO format as a string.
 *
 * Parameters - Note: only one Parameter, an Object.
 *     The list below shows what properties to include in that Object.
 *
 *     optional
 *       minDate - string: must be a valid ISO date.
 *       maxDate - string: must be a valid ISO date.
 *
 *     TODO: Need to make so if an invalid date is pass in it still works.
 *     Note: This function is really slow. Use the pure JS version unless you need different time zone and reliable
 *     offsets in your fake data.
 *
 *
 * Examples
 */
function genLuxonDate(obj={}){
    if(obj.start && obj.end){
        let minDate = DateTime.fromISO( obj.start );
        let maxDate = DateTime.fromISO( obj.end );

        let maxDuration = maxDate
            .diff( minDate, ["years", "months", "days"], { conversionAccuracy: 'longterm' } )
            .toObject();


        return minDate.plus(
            DateTime.fromObject({
                year: maxDuration.years === 0 ? 0 : Math.floor(Math.random()*maxDuration.years),
                month: maxDuration.months === 0 ? 0 : Math.floor(Math.random()*maxDuration.months),
                day: maxDuration.days === 0 ? 0 : Math.floor(Math.random()*maxDuration.days)
            }).toObject()
        ).toString();
    } else {

        // let year = Math.ceil(Math.random()*((new Date()).getFullYear()));
        // let month = Math.floor(Math.random()*12) + 1;
        let year = 2200;
        let month = 2;
        let day = 1;

        if( month === 2 ){
            if( year % 4 === 0 ){
                if(year % 400 === 0 ){
                    console.log('leap year');
                    day = Math.floor(Math.random()*29)
                } else if (year % 100 === 0 || year % 200 === 0 || year % 300 === 0 ){
                    console.log('not leap year');
                    day = Math.floor(Math.random()*28)
                } else {
                    console.log('leap year');
                    day = Math.floor(Math.random()*29)
                }
            } else {
                console.log('not leap year');
                day = Math.floor(Math.random()*28)
            }
        } else if( month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12 ){
            day = Math.floor(Math.random()*31)
        } else if( month === 4 || month === 6 || month === 9 || month === 11 ){
            day = Math.floor(Math.random()*30)
        }



        return DateTime.fromObject({
            year: year,
            month: month,
            day: day
        }).toString();
    }
}
// Test Cases
// console.log( genDate({ minDate: "2008-11-17", maxDate:"2018-08-27" }) );
// console.log( genDate() );


/*
 *
 * genDate
 *
 * Documentation
 *   Returns a date in the ISO format as a string.
 *
 * Parameters - Note: only one Parameter, an Object.
 *     The list below shows what properties to include in that Object.
 *
 *     required
 *       start - JS Date Object: The farthest back date you could want in your dataset
 *       end   - JS Date Object: The soonest date you could want in your dataset.
 *
 *
 * Examples
 *   genDate({ start: new Date(2004, 1, 29), end: new Date() }) => "2007-09-27T12:37:37.732519" a random date
 */
function genDate(obj={}){
    return new Date(obj.start.getTime() + Math.random() * (obj.end.getTime() - obj.start.getTime())).toISOString().split('T')[0]
}
// Test Cases
// console.log( genDate({ start: new Date(2004, 1, 29), end: new Date() }) );


function sortDate_desc(date1, date2) {
    if (date1 > date2) return -1;
    if (date1 < date2) return 1;
    return 0;
}


// Returns an array of strings where the dates are in sorted order from highest to lowest
function sortDates(dateArr){
    return dateArr.sort(sortDate_desc);
}

// Test Cases
// console.log(
//     typeof sortDates(
//         [
//             new Date(1985, 0, 9).toISOString(),
//             new Date(2001, 9, 21).toISOString(),
//             new Date(2001, 9, 22).toISOString(),
//             new Date(1991, 1, 6).toISOString()
//         ]
//     )
// );

// Exporting Functions to be used elsewhere
module.exports.personNameInfo = genPersonNameInfo;
module.exports.customer = genCustomer;

module.exports.companyNameInfo = genCompanyNameInfo;
module.exports.companyEmails = genCompanyEmails;

module.exports.productInfo = genProductInfo;
module.exports.productMeasures = genProductMeasures;
module.exports.productReviewSummary = genProductReviewSummary;

module.exports.orderProductInfo = genOrderProductsInfo;
module.exports.orderInfo = genOrderInfo;

module.exports.docHistory = genDocHistory;

module.exports.schemaReference = genSchemaReference;
module.exports.address = genAddresses;
module.exports.phoneNumbers = genPhoneNumbers;
module.exports.emails = genEmails;
module.exports.websites = genWebsites;
module.exports.triples = genTriples;
module.exports.dateTime = genDateTime;
module.exports.date = genDate;
module.exports.paymentMethod = genPaymentMethod;
module.exports.creditCardNumber = genCreditCardNumber;
module.exports.addressString = genAddressString;

module.exports.luxonDate = genLuxonDate;

module.exports.sortDates = sortDates;
