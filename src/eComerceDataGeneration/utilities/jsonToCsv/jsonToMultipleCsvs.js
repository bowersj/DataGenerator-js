/*
 *
 * jsonToMultipleCsvs.js
 *
 * Purpose
 * Provide a simple to use function(s) to take a single json document and split it amongst many json files.
 *
 *
 * Reason for existence
 * Since E.F. Codd published his paper titled "A Relational Model of Data for Large Shared Data Banks" and the creation
 * of the relational database people have needed to create a flat world to represent there data in. Now, you can
 * represent many things in a flat world and by so doing you make querying your data fast but it comes at the cost of
 * shredding data down to the infinitesimal and then spreading it out amongst many tables. This, while providing a
 * powerful platform to store and write queries against, can become supper complicated when you have data based on
 * hierarchies, i.e. JSON and XML. While JSON and XML are not the only hierarchical languages out there they have become
 * popular lately, especially JSON. Therefore, it is not to much of a stretch to say that a vast majority of web
 * services return either JSON or XML and if you want to store that in a relational database, you must dissect the
 * hierarchies and turn them into flat structures. This is nothing new but because of the emergence of JSON and XML,
 * among other hierarchical languages, it is becoming a common task to convert JSON, or some other hierarchical format,
 * into a flat data structure. Now, many people have spent a significant amount of time coding solutions to convert flat
 * files into hierarchies but finding a solution to going the other way, i.e. JSON to a flat file is not as easy as one
 * would think for the simple reason that JSON can have, by definition, nesting which means it can, and often does,
 * contain what would be multiple rows in multiple tables. Yet, JSON to csv converters expect you to extract the data
 * for one csv at a time. This, while extensible and even performante, means I have to write a lot of code to get the
 * data into the desired structure and then run my conversion. So, enter json to multiple csv files. These functions
 * provide the necessary tooling to easily send the data from one JSON file to multiple csv files. With this
 * flexibility you don't have to worry about the minutiae which allows you to spend that saved time focusing on your
 * data models, which need more care than we tend to give them.
 *
 *
 */


/*
 *
 * convert
 *
 * parameters
 *   @models - Array of Objects: an array of objects where each object contains the following
 *     @data - Array: an array of either objects or numbers, strings, booleans to be converted to one or more rows in a
 *       csv file.
 *     @csvFile - String: the name of the file you want your csv data to be save. Note, do not include the .csv, that is
 *       appended for your convince. Note that if the file already exists the csv values will be appended to it and if
 *       it does not exist it will be created.
 *     @fields - Array of Objects: an array of objects where each object can contain the following
 *       @label - String: the desired name of the column within the csv file
 *       @value - String: the json path to where that column's data is located. This property is required.
 *         Note, the path must start from within the scope of the provided data otherwise you will have unexpected or null
 *         results.
 *       any other parameters to the json2csv package
 *     @opt - Object: an object with all the possibilities provided through the json2csv package.
 *
 *
 *
 */

const fs = require('fs');

const json2csvParser = require('json2csv').Parser;
const lodashGet = require('lodash.get');

function convert( models = [] ){

    // let data = [];

    for( let i = 0; i < models.length; ++i ){

        let options = models[i].model;

        let append = fs.existsSync(`./${models[i].csvFile}.csv`);

        if (append) {
            options.header = false;
        }

        // console.log( JSON.stringify( options, null, 2 ) );

        let json = new json2csvParser( options );
        // data[i] = json.parse( model.data );

        fs.appendFile(`./${models[i].csvFile}.csv`, json.parse( models[i].data ) + "\n", 'utf8', (err) => {
            if(err) console.log(err);
            console.log(`Your data has been saved to ${models[i].csvFile}.csv`);
        });
    }

}
// Test Cases

// convert([{
//         data: [
//             {
//                 prop1: "This is prop1.1's contents",
//                 prop2: "This is prop2.1's contents",
//                 prop3: "This is prop3.1's contents"
//             },
//             {
//                 prop1: "This is prop1.2's contents",
//                 prop2: "This is prop2.2's contents",
//                 prop3: "This is prop3.2's contents"
//             },
//             {
//                 prop1: "This is prop1.3's contents",
//                 prop2: "This is prop2.3's contents",
//                 prop3: "This is prop3.3's contents"
//             },
//             {
//                 prop1: "This is prop1.4's contents",
//                 prop2: "This is prop2.4's contents",
//                 prop3: "This is prop3.4's contents"
//             }
//         ],
//         csvFile: "myFirstTest",
//         model:{
//             fields:[
//                 {
//                     label: "Content 1",
//                     value: "prop1"
//                 },
//                 {
//                     label: "Content 2",
//                     value: "prop1"
//                 },
//                 {
//                     label: "Content 3",
//                     value: "prop1"
//                 }
//             ]
//         }
//     },
//     {
//         data: [
//             {
//                 name: "Johnny Bower",
//                 info: {
//                     email:[ "jbower@hotmail.com", "bower.johnny@gmail.com" ],
//                     phone: [ "801-989-9632", "789-654-1230" ]
//                 }
//             },
//             {
//                 name: "Jack Bower",
//                 info:{
//                     email:[ "jbower@gmail.com", "bower.jack@gmail.com" ],
//                     phone: [ "801-989-9632" ]
//                 }
//             },
//             {
//                 name: "Jacob Bower",
//                 info:{
//                     email:[ "jbower@yahoo.com", "bower.jacob@gmail.com" ],
//                     phone: [ "801-989-9632", "789-654-1230", "159-874-6230" ]
//                 }
//             },
//             {
//                 name: "Jill Bower",
//                 info:{
//                     email:[ "jbower@outlook.com" ],
//                     phone: [ "987-654-1230" ]
//                 }
//             }
//         ],
//         csvFile: "mySecondTest",
//         model:{
//             fields:[
//                 {
//                     label: "personName",
//                     value: "name"
//                 },
//                 {
//                     label: "personEmail",
//                     value: "info.email"
//                 },
//                 {
//                     label: "personPhone",
//                     value: "info.phone"
//                 }
//             ],
//             unwind: [ 'info.email', 'info.phone' ]
//         }
//     },
//     {
//         data: [
//             {
//                 name: "Johnny Bower",
//                 info: {
//                     email:[ "jbower@hotmail.com", "bower.johnny@gmail.com" ],
//                 }
//             },
//             {
//                 name: "Jack Bower",
//                 info:{
//                     email:[ "jbower@gmail.com", "bower.jack@gmail.com" ],
//                     phone: [ "801-989-9632" ]
//                 }
//             },
//             {
//                 name: "Jacob Bower",
//                 info:{
//                     email:[ "jbower@yahoo.com", "bower.jacob@gmail.com" ],
//                     phone: [ "801-989-9632", "789-654-1230", "159-874-6230" ]
//                 }
//             },
//             {
//                 name: "Jill Bower",
//                 info:{
//                     email:[ "jbower@outlook.com" ],
//                     phone: [ "987-654-1230" ]
//                 }
//             }
//         ],
//         csvFile: "myThirdTest",
//         model:{
//             fields:[
//                 {
//                     label: "name",
//                     value: "name"
//                 },
//                 {
//                     label: "email",
//                     value: "info.email"
//                 },
//                 {
//                     label: "phone",
//                     value: "info.phone",
//                     default: 'NULL'
//                 }
//             ],
//             unwind: [ 'info.email', 'info.phone' ]
//         }
//     },
//     {
//         data: [
//             {
//                 name: "Johnny Bower",
//                 info: {
//                     email:[ "jbower@hotmail.com", "bower.johnny@gmail.com" ],
//                 }
//             }
//         ],
//         csvFile: "myFourthTest",
//         model:{
//             fields:[
//                 {
//                     label: "name",
//                     value: "name"
//                 },
//                 {
//                     label: "email",
//                     value: "info.email"
//                 },
//                 {
//                     label: "phone",
//                     value: "info.phone",
//                     default: 'NULL'
//                 }
//             ],
//             unwind: [ 'info.email', 'info.phone' ]
//         }
//     }
// ]);

// convert([{
//         data: [
//             {
//                 "orderedProductId": "210062",
//                 "productId": "58",
//                 "productOrderQty": 1,
//                 "historicalProductUnitPrice": 5.06,
//                 "productWeight": 2,
//                 "productWeightUOM": "boxed",
//                 "productShippedDate": "2018-02-05",
//                 "productCondition": "Very Good",
//                 "productOrderStatus": "Returned"
//             },
//             {
//                 "orderedProductId": "210162",
//                 "productId": "51",
//                 "productOrderQty": 4,
//                 "historicalProductUnitPrice": 7.34,
//                 "productWeight": 11,
//                 "productWeightUOM": "boxed",
//                 "productShippedDate": "2018-02-05",
//                 "productCondition": "Like New",
//                 "productOrderStatus": "Shipped"
//             },
//             {
//                 "orderedProductId": "210262",
//                 "productId": "54",
//                 "productOrderQty": 2,
//                 "historicalProductUnitPrice": 4.32,
//                 "productWeight": 15,
//                 "productWeightUOM": "boxed",
//                 "productShippedDate": "2018-02-05",
//                 "productCondition": "Like New",
//                 "productOrderStatus": "Returned"
//             }
//         ],
//         csvFile: "productOrder",
//         model:{
//             fields:[
//                 {
//                     label: "orderProductId",
//                     value: "orderedProductId",
//                     usePath: false
//                 },
//                 {
//                     label: "productId",
//                     value: "productId"
//                 },
//                 {
//                     label: "qty",
//                     value: "productOrderQty"
//                 },
//                 {
//                     label: "unitPrice",
//                     value: "historicalProductUnitPrice"
//                 },
//                 {
//                     label: "productWeight",
//                     value: "productWeight"
//                 },
//                 {
//                     label: "productWeightUnitOfMeasure",
//                     value: "productWeightUOM"
//                 },
//                 {
//                     label: "shipDate",
//                     value: "productShippedDate"
//                 },
//                 {
//                     label: "condition",
//                     value: "productCondition"
//                 },
//                 {
//                     label: "orderStatus",
//                     value: "productOrderStatus"
//                 }
//             ]
//         }
//     }
// ]);


/*
 *
 * The purpose of this function is to generate a model where all the data goes the same csv
 *
 *
 */
function compileModels( data, baseData, fields, userDefinedModel, unwind, globalDefault ){

    // console.log( baseData );

    if( (baseData.length === 0) || ( Object.getOwnPropertyNames(baseData).length === 0 ) ){
        return { skip: true }
    }

    let obj = {
        data:[],
        csvFile: userDefinedModel.csvFile,
        model:{}
    };

    let modelSpecificUnwind = [];
    // console.log(fields);

    // generate subset of data to be sent to the convert function
    if(Array.isArray(baseData)){
        for(let k = 0; k < baseData.length; ++k){

            let dataObj = {};

            for(let j = 0; j < fields.length; ++j){

                let useBaseData = true;
                if(typeof fields[j].usePath !== 'undefined'){
                    useBaseData = fields[j].usePath;
                }

                let propertyName = fields[j].label || fields[j].value;

                let partialData = useBaseData ? lodashGet(baseData[k], fields[j].value) : lodashGet(data, fields[j].value);

                dataObj[propertyName] = partialData;

                if(Array.isArray(partialData) && unwind){
                    modelSpecificUnwind.push( propertyName )
                }

                if( k === baseData.length - 1 ){
                    if( typeof fields[j].label !== "undefined" ){ fields[j].value = fields[j].label } else { fields[j].label = fields[j].value }
                    if( fields[j].usePath === false ) delete fields[j].usePath;
                }
            }

            obj.data[k] = dataObj;

        }

    } else if(baseData.constructor.name === "Object") {
        // console.log("You passed in an Object");
        let dataObj = {};

        for(let j = 0; j < fields.length; ++j){

            let usePath = fields[j].usePath || true;

            let propertyName = fields[j].label || fields[j].value;

            let partialData = usePath ? lodashGet(baseData, fields[j].value) : lodashGet(data, fields[j].value);

            dataObj[propertyName] = partialData;

            if(Array.isArray(partialData) && unwind){
                modelSpecificUnwind.push( propertyName )
            }

            if( typeof fields[j].label !== "undefined" ){ fields[j].value = fields[j].label } else { fields[j].label = fields[j].value }
            if( fields[j].usePath === false ) delete fields[j].usePath;
        }

        obj.data[0] = dataObj;

    }

    obj.model.fields = userDefinedModel.fields;
    obj.model.unwind = modelSpecificUnwind;

    return obj;
}


/*
 *
 * The purpose of this function is to generate a model where the data goes in different csvs based
 * on a provided property.
 *
 *
 */
function compileConditionalModels( data, baseData, userDefinedModel, unwind, globalDefault ){

    if( (baseData.length === 0) || ( Object.getOwnPropertyNames(baseData).length === 0 ) ){
        return { skip: true }
    }

    let obj = {
        data:[],
        csvFile: userDefinedModel.csvFile,
        model:{}
    };

    // console.log( userDefinedModel );
    // console.log( baseData );

    let fields = [];
    let model = {};

    let modelSpecificUnwind = [];
    // console.log(fields);

    // generate subset of data to be sent to the convert function
    if(Array.isArray(baseData)){

        for(let k = 0; k < baseData.length; ++k){

            let desiredModelName = lodashGet( baseData[k], userDefinedModel.condition );
            // console.log( desiredModelName );

            model = userDefinedModel.options[ desiredModelName ];
            // console.log(model);

            fields = model.fields;
            // console.log( fields );

            let dataObj = {};

            for(let j = 0; j < fields.length; ++j){

                let useBaseData = true;
                if(typeof fields[j].usePath !== 'undefined'){
                    useBaseData = fields[j].usePath;
                }

                let propertyName = fields[j].label || fields[j].value;

                let partialData = useBaseData ? lodashGet(baseData[k], fields[j].value) : lodashGet(data, fields[j].value);

                dataObj[propertyName] = partialData;

                if(Array.isArray(partialData) && unwind){
                    modelSpecificUnwind.push( propertyName )
                }

                if( k === baseData.length - 1 ){
                    if( typeof fields[j].label !== "undefined" ){ fields[j].value = fields[j].label } else { fields[j].label = fields[j].value }
                    if( fields[j].usePath === false ) delete fields[j].usePath;
                }
            }

            obj.data[k] = dataObj;

        }

    } else if(baseData.constructor.name === "Object") {

        // console.log("You passed in an Object");
        let dataObj = {};

        let desiredModelName = lodashGet( baseData[0], userDefinedModel.condition );
        // console.log( desiredModelName );

        let model = userDefinedModel.options[ desiredModelName ];
        // console.log(model);

        let fields = model.fields;
        // console.log( fields );

        for(let j = 0; j < fields.length; ++j){

            let usePath = fields[j].usePath || true;

            let propertyName = fields[j].label || fields[j].value;

            let partialData = usePath ? lodashGet(baseData, fields[j].value) : lodashGet(data, fields[j].value);

            dataObj[propertyName] = partialData;

            if(Array.isArray(partialData) && unwind){
                modelSpecificUnwind.push( propertyName )
            }

            if( typeof fields[j].label !== "undefined" ){ fields[j].value = fields[j].label } else { fields[j].label = fields[j].value }
            if( fields[j].usePath === false ) delete fields[j].usePath;
        }

        obj.data[0] = dataObj;

    }

    // console.log(model);

    obj.model.fields = fields;
    obj.model.unwind = modelSpecificUnwind;
    obj.csvFile = model.csvFile;

    // console.log( JSON.stringify( obj ) );

    return obj;
}


function formatData( data={}, opts={} ){
    // TODO: determine when its faster or equivalent to nest for loops rather than doing them individually.

    let unwind = opts.unwind;
    let globalDefault = opts.globalDefault;

    // This way the user does not have to specify common things every time, just when it shouldn't happen
    let userDefinedModels = opts.models;


    let models = [];

    for(let i = 0; i < userDefinedModels.length; ++i){
        let userDefinedModel = userDefinedModels[i];

        let conditional = typeof userDefinedModel.condition !== "undefined";
        // console.log(conditional);

        // console.log( JSON.stringify( userDefinedModel, null, 2 ) );

        let baseData = lodashGet(data, userDefinedModel.path);

        // console.log(baseData);

        let fields = userDefinedModel.fields;
        let obj = {};

        if( conditional ){
            // console.log(userDefinedModel);
            // console.log( "conditional model\n" );
            obj = compileConditionalModels( data, baseData, userDefinedModel, unwind, globalDefault );
            console.log( JSON.stringify( obj, null, 2 ) );

            if( obj.skip ){ continue }
        } else {
            // console.log( "going to run compileModels" );
            // console.log(userDefinedModel);
            // console.log( "unconditional model\n" );
            obj = compileModels( data, baseData, fields, userDefinedModel, unwind, globalDefault );
            console.log( JSON.stringify( obj, null, 2 ) );

            if( obj.skip ){ continue }
        }

        models.push( obj );
    }

    return models;
}


/*
 *
 * getCsv
 *
 * Parameters
 * @data - Object or Array: a JSON object or array. If array then each entry will be a line in the resulting csv file. If
 *   Object then only one line will written to the resulting csv file.
 *
 * @opts - Object: an object contains properties specifying how to parse the json into either one or more csv files.
 *   @models - Array: an array of objects to define how to parse the json file into one or more csv files. Each object in
 *     this array will considered as the parameters for one csv file.
 *
 *     @csvFile - String: the name of the csv file to either be generated or appended to.
 *     @path - String: a string containing the json path to the data to be transformed into csv format.
 *     @fields - Array: an array of objects where you specify how you would like to handle the column in the specified csv
 *       file. You must provide the name of the csv file without the .csv extension.
 *
 *       @label - String: a string containing the column name for the specified csv.
 *       @value - String: a string containing the path to the value in the object.
 *       @usePath - Boolean: weather or not to use the path property. Default is true.
 *
 *     @opts - Object: an object with all the possibilities provided through the json2csv package.
 *     @unwind - Boolean: create multiple rows for values in an array. Default is true.
 *     @globalDefault - String: the default value to be used if a value does not exist.
 *
 *
 * Features
 * Include data from any part of data being passed in.
 * Automatically unwinds arrays of a primitive types ie strings, numbers, booleans, and nulls
 * Specify only the column headings you want changed
 *   This feature does require you to pass in null on the columns do not want to rename. This way the order can be
 *   maintained
 * Can set a global default. Default is NULL.
 *
 *
 */
function getCsv(data={}, opts={}){
    // possible optimization - if the number of models is less than 4 use a nested for loop other wise
    // use multiple for loops

    if( typeof opts.unwind === "undefined" ) opts.unwind = true;
    if( typeof opts.globalDefault === "undefined" ) opts.globalDefault = "NULL";

    // generate the json2csv model
    let models = formatData( data, opts );

    // console.log(JSON.stringify(models, null, 2));

    // call convert
    return convert(models);
}
// Test Cases
// getCsv({"order":{"orderNumber":62,"orderDate":"2018-02-03","orderStatus":"Backordered","customer":{"customerId":15,"historicalCustomerName":"Katelynn"},"orderShipment":{"shipmentTrackingNumber":7738853580347,"shipmentMethod":"UPS Standard","shipmentCost":27.55,"shipmentNotes":""},"orderShippingAddress":{"addressStreet":["27927 RAVEN CT"],"addressLocality":"Anchorage","addressRegion":"AK","addressPostalCode":99567,"addressCountry":"United States"},"product":[{"orderedProductId":"210062","productId":"58","productOrderQty":1,"historicalProductUnitPrice":5.06,"productWeight":2,"productWeightUOM":"boxed","productShippedDate":"2018-02-05","productCondition":"Very Good","productOrderStatus":"Returned"},{"orderedProductId":"210162","productId":"51","productOrderQty":4,"historicalProductUnitPrice":7.34,"productWeight":11,"productWeightUOM":"boxed","productShippedDate":"2018-02-05","productCondition":"Like New","productOrderStatus":"Shipped"},{"orderedProductId":"210262","productId":"54","productOrderQty":2,"historicalProductUnitPrice":4.32,"productWeight":15,"productWeightUOM":"boxed","productShippedDate":"2018-02-05","productCondition":"Like New","productOrderStatus":"Returned"}],"orderTotals":{"totalOrderItemCost":43.06,"orderShippingCost":27.55,"orderShippingCostCredit":1.53,"orderSalesTax":4.66,"totalOrderCost":73.74},"orderPayment":[{"orderPaymentAmount":73.74,"paymentMethodId":"220062","orderPaymentDate":"2018-02-04","orderPaymentType":"Cash","orderPaymentMethod":{"paymentMethodId":"50012","paymentMethodType":"Cash","paymentMethodStatus":"Active"}}],"triple":[{"tripleId":"190062","subject":19,"predicate":"ordered","object":62}],"metadata":{"docId":"62","docComment":"So, when they were within, they were bidden sit down and rest them; the which when they had done, those that attended upon the Pilgrims in the house, came into the room to see them. And one smiled, and another smiled, and they all smiled, for joy that Christiana was become a pilgrim. They also looked upon the boys. They stroked them over the faces with the hand, in token of their kind reception of them. They also carried it lovingly to Mercy, and bid them all welcome into their Masters house.[68]","docKeywords":["4","The","poor","soul,"],"schemaId":"orderSchema","schemaVersion":3,"docHistory":[{"docVersion":1,"docEditorId":23,"docEvent":"Insert","docEditDateTime":"2018-02-03T00:00:00.000Z","docHistoryId":"200062"},{"docVersion":1.1,"docEditorId":13,"docEvent":"Update","docEditDateTime":"2018-06-28T20:03:42.650Z","docHistoryId":"200162"}]}}},
//     {
//         models:[
//             {
//                 csvFile: "./csvs/productOrder",
//                 path: "order.product",
//                 fields: [
//                     {
//                         label:"orderId",
//                         value:"order.metadata.docId",
//                         usePath: false
//                     },
//                     {
//                         value: "productId"
//                     },
//                     {
//                         label: "qty",
//                         value: "productOrderQty"
//                     },
//                     {
//                         label: "unitPriceAtTimeOfPurchase",
//                         value: "historicalProductUnitPrice"
//                     },
//                     {
//                         value: "productWeight"
//                     },
//                     {
//                         label: "weightUOM",
//                         value: "productWeightUOM"
//                     },
//                     {
//                         label: "shipDate",
//                         value: "productShippedDate"
//                     },
//                     {
//                         label: "condition",
//                         value: "productCondition"
//                     },
//                     {
//                         label: "orderStatus",
//                         value: "productOrderStatus"
//                     }
//                 ]
//             },
//             {
//                 csvFile: "./csvs/metadata",
//                 path: "order.metadata",
//                 fields: [
//                     {
//                         label:"orderId",
//                         value:"docId"
//                     },
//                     {
//                         label: "comment",
//                         value: "docComment"
//                     },
//                     {
//                         label: "keywords",
//                         value: "docKeywords"
//                     },
//                     {
//                         value: "schemaId"
//                     },
//                     {
//                         value: "schemaVersion"
//                     }
//                 ]
//             },
//             {
//                 csvFile: "./csvs/history",
//                 path: "order.metadata.docHistory",
//                 fields: [
//                     {
//                         label:"metadataId",
//                         value:"order.metadata.docId",
//                         usePath: false
//                     },
//                     {
//                         label: "version",
//                         value: "docVersion"
//                     },
//                     {
//                         label: "event",
//                         value: "docEvent"
//                     },
//                     {
//                         label: "editorId",
//                         value: "docEditorId"
//                     },
//                     {
//                         label: "editDateTime",
//                         value: "docEditDateTime"
//                     },
//                     {
//                         label: "historyId",
//                         value: "docHistoryId"
//                     }
//                 ]
//             },
//             {
//                 csvFile: "./csvs/triples",
//                 path: "order.triple",
//                 fields: [
//                     {
//                         label:"entityId",
//                         value:"order.metadata.docId",
//                         usePath: false
//                     },
//                     {
//                         value: "tripleId"
//                     },
//                     {
//                         value: "subject"
//                     },
//                     {
//                         value: "predicate"
//                     },
//                     {
//                         value: "object"
//                     }
//                 ]
//             }
//         ]
//     }
// );

//test a person doc
// getCsv({"person":{"personStatus":"Inactive","personName":"Estel Rime","personOnlineName":"estel0","personFirstName":"Estel","personLastName":"Rime","personLegalName":"Estel Rime","personSortedName":"Rime, Estel","personInformalLetterName":"Estel","personFormalLetterName":"Estel Rime","personBirthDate":"1975-05-04","personGender":"Male","personEthnicity":"German","phone":[{"phoneId":"00","purpose":"Mobile","number":"7-365-285-4566"},{"phoneId":"10","purpose":"Work","number":"6-774-781-1338"}],"address":[{"addressId":"1000","addressCoordinates":[-149.4672014,61.4253086],"addressStreet":["22706 OAK KNOLL DR"],"addressLocality":"Anchorage","addressRegion":"AK","addressPostalCode":99567,"addressCountry":"United States","addressPurpose":"Company"},{"addressId":"1010","addressCoordinates":[-149.4806201,61.4253509],"addressStreet":["22700 KNIK VISTA ST"],"addressLocality":"Anchorage","addressRegion":"AK","addressPostalCode":99567,"addressCountry":"United States","addressPurpose":"Company"},{"addressId":"1020","addressCoordinates":[-149.4757954,61.4253268],"addressStreet":["22700 JUDD DR"],"addressLocality":"Anchorage","addressRegion":"AK","addressPostalCode":99567,"addressCountry":"United States","addressPurpose":"P.O. Box"}],"email":[{"emailId":"2000","purpose":"Company","address":"estel0@hotmail.com"},{"emailId":"2010","purpose":"Personal","address":"estel0@hotmail.com"},{"emailId":"2020","purpose":"Company","address":"estel0@yahoo.com"},{"emailId":"2030","purpose":"Family","address":"estel0@yahoo.com"}],"website":[{"websiteId":"3000","websitePurpose":"Blog","url":"glazer.com.tr"},{"websiteId":"3000","websitePurpose":"Twitter","url":"newguyattheoffice.com"},{"websiteId":"3000","websitePurpose":"Twitter","url":"alexbarclayconsultancy.org"},{"websiteId":"3000","websitePurpose":"FaceBook","url":"entrepreneursatlaw.com"}],"customer":{"customerId":"4000","status":"Active","customerJoinDate":"2009-12-01","customerReviewerRank":9},"paymentMethod":[{"paymentMethodId":"5000","paymentMethodType":"Check","paymentMethodStatus":"Active","bankRoutingNumber":17170031,"bankAccountNumber":96291268193,"checkNumber":8139}],"triple":[{"tripleId":"6000","subject":0,"predicate":"deliveryPersonFor","object":87},{"tripleId":"6000","subject":0,"predicate":"employeeOf","object":31},{"tripleId":"6000","subject":0,"predicate":"employeeOf","object":33},{"tripleId":"6000","subject":0,"predicate":"accountRepForProduct","object":22},{"tripleId":"6000","subject":0,"predicate":"deliveryPersonFor","object":85},{"tripleId":"6000","subject":0,"predicate":"employeeOf","object":37}],"metadata":{"docId":"0","docComment":"14:26. And when they were come and had assembled the church, they related what great things God had done with them and how he had opened the door of faith to the Gentiles.","docKeywords":["3:16.","And","he","made"],"schemaId":"personSchema","schemaVersion":3,"docHistory":[{"docVersion":1,"docEditorId":11,"docEvent":"Insert","docEditDateTime":"2018-01-22T02:17:24.165Z","docHistoryId":"7000"},{"docVersion":1.1,"docEditorId":28,"docEvent":"Update","docEditDateTime":"2018-02-16T20:31:48.634Z","docHistoryId":"7010"},{"docVersion":1.2,"docEditorId":10,"docEvent":"Update","docEditDateTime":"2018-08-19T20:54:16.878Z","docHistoryId":"7020"},{"docVersion":1.3,"docEditorId":17,"docEvent":"Update","docEditDateTime":"2018-10-21T14:45:09.604Z","docHistoryId":"7030"},{"docVersion":1.4,"docEditorId":11,"docEvent":"Update","docEditDateTime":"2018-11-11T05:13:21.328Z","docHistoryId":"7040"}]}}},
//     require('./tests/models/person.js').model
// );

// test a company
// getCsv({"company":{"companyStatus":"Inactive","companyName":"EMERICH KIRK J","companyInformalName":"EMERICH KIRK J","doingBusinessAs":["EMERICH KIRK J"],"subsidiaryOf":["FS EQUITY PARTNERS VII, L.P."],"parentCompanyOf":["SPENCER TRUST 2010 B"],"phone":[{"phoneId":"80030","purpose":"Customer Service","number":"1-396-893-5348"}],"address":[{"addressId":"90030","addressCoordinates":[-149.4614653,61.4241639],"addressStreet":["22502 SAMBAR LOOP"],"addressLocality":"Anchorage","addressRegion":"AK","addressPostalCode":99567,"addressCountry":"United States","addressPurpose":"IT"},{"addressId":"90130","addressCoordinates":[-149.4501259,61.4241177],"addressStreet":["22541 WHISPERING BIRCH CIR"],"addressLocality":"Anchorage","addressRegion":"AK","addressPostalCode":99567,"addressCountry":"United States","addressPurpose":"Shipping"}],"email":[{"emailId":"110030","purpose":["Shipping","Sales"],"address":"Shipping30@dooren.net"}],"website":[{"websiteId":"100030","websitePurpose":"Main Office","url":"dooren.net"},{"websiteId":"100030","websitePurpose":"Help Desk","url":"iacconference.com"},{"websiteId":"100030","websitePurpose":"Purchasing","url":"katrinapeluso.com"}],"paymentMethod":[],"triple":[{"tripleId":"130030","subject":30,"predicate":"hasCompanyRep","object":28},{"tripleId":"130030","subject":30,"predicate":"splitFrom","object":31},{"tripleId":"130030","subject":30,"predicate":"parentCompanyOf","object":37}],"metadata":{"docId":"30","docComment":"The Clemens family remained in Hartford that summer, with the exception of a brief season at Batemans Point, R. I., near Newport.By this time Mark Twain had taken up and finished the Tom Sawyer story begun two years before.Naturally he wished Howells to consider the MS.","docKeywords":["Wilson","[in","a","voice"],"schemaId":"companySchema","schemaVersion":3,"docHistory":[{"docVersion":1,"docEditorId":966,"docEvent":"Insert","docEditDateTime":"2001-06-17T13:12:00.056Z","docHistoryId":"27330"},{"docVersion":1.1,"docEditorId":566,"docEvent":"Update","docEditDateTime":"2016-07-31T22:08:38.782Z","docHistoryId":"27430"},{"docVersion":1.2,"docEditorId":124,"docEvent":"Update","docEditDateTime":"2017-05-25T08:26:18.030Z","docHistoryId":"27530"},{"docVersion":1.3,"docEditorId":75,"docEvent":"Update","docEditDateTime":"2017-09-14T03:16:56.143Z","docHistoryId":"27630"}]}}},
//     require('./tests/models/company.js').model
// );

// test a product
// getCsv({"product":{"productCode":"US09858855-20180102","productStatus":"Active","productName":"Wearable display device","productDescription":"1. A method of displaying video content on a wearable display device, the method comprising:                     receiving, by one or more processors, positioning data from position sensors in a wearable display device, wherein the wearable                        display device is worn by a user, wherein the position sensors provide positioning data that describe a physical three-dimensional                        orientation of the wearable display device in real time, and wherein the wearable display device comprises an exterior display                        surface that comprises multiple video display regions on a single continuous display;                                          displaying a video content on a dynamically adjusted display region of the single continuous display based on the physical                        three-dimensional orientation of the wearable display device, wherein the dynamically adjusted display region is a single                        display region that is dynamically moved on the single continuous display;                                          determining the positioning data that describe the physical three-dimensional orientation of the wearable display device by:                     receiving, by one or more processors, radio frequency (RF) readings from an array of RF detectors within the wearable display                        device, wherein the RF detectors detect a relative location and distance between the wearable display device and an RF transmitter                        that is positioned on a head of the user; and                                          determining, by one or more processors, a location, relative to the wearable display device, of a face of the user who is                        wearing the wearable display device based on the RF readings that are received by the array of RF detectors from the RF transmitter                        on the head of the user; and                                          displaying the video content on the dynamically adjusted display region of the single continuous display that is facing the                        face of the user.                                       ","productCategories":"Pet Supplies","productSubCategories":"Birds","productAvailabilityDate":"2013-11-08","productListPrice":46.34,"productDiscountPrice":29.08,"productStandardCost":49.43,"productInventoryReorderLevel":1,"productInventoryTargetLevel":1,"productImages":[{"alt":"OG exemplary drawing","src":"US09858855-20180102-D00000.gif"}],"vendor":{"vendorId":40},"productMeasure":[{"productMeasureId":"150140","productMeasurePurpose":"boxed","productWeight":1,"productWeightUOM":"boxed","productWidth":2,"productHeight":7,"productLength":7,"productSizeUOM":"mm"},{"productMeasureId":"150240","productMeasurePurpose":"boxed","productWeight":29,"productWeightUOM":"boxed","productWidth":1,"productHeight":2,"productLength":1,"productSizeUOM":"in"}],"productWebsite":[{"websiteId":"160040","websitePurpose":"Seller","url":"airportdataexplorer.com"},{"websiteId":"160040","websitePurpose":"Sales","url":"urideaccess.com"},{"websiteId":"160040","websitePurpose":"Reseller","url":"hnk007.com"},{"websiteId":"160040","websitePurpose":"Sales","url":"affinitydocumentsolutions.com"}],"productReviewSummary":{"fiveStar":1215,"fourStar":673,"threeStar":783,"twoStar":416,"oneStar":1731,"reviewCount":4818},"productQA":[{"questionId":"QA-Q000630115728222"},{"questionId":"QA-Q03017196930724296"},{"questionId":"QA-Q0406104426154669807"},{"questionId":"QA-Q037961008460465205502"},{"questionId":"QA-Q038181016481141189349"},{"questionId":"QA-Q038351022630685888913"},{"questionId":"QA-Q038391034986519590451"},{"questionId":"QA-Q038701046973885451780"},{"questionId":"QA-Q038911057940651245070"},{"questionId":"QA-Q039331065398240110648"},{"questionId":"QA-Q039631076625888027291"},{"questionId":"QA-Q0464116081587116143"},{"questionId":"QA-Q0491126153351121203"},{"questionId":"QA-Q0539138709679085298"},{"questionId":"QA-Q0587148052241624185"},{"questionId":"QA-Q0616158072240642450"},{"questionId":"QA-Q0655164530888736346"},{"questionId":"QA-Q06841748221675955"},{"questionId":"QA-Q0738182852132080244"},{"questionId":"QA-Q0801191932799440451"},{"questionId":"QA-Q07421206333467278"},{"questionId":"QA-Q0823205468753754579"},{"questionId":"QA-Q0855213316263301937"},{"questionId":"QA-Q0895225166908612695"},{"questionId":"QA-Q0903237584359678390"},{"questionId":"QA-Q0957247780125395028"},{"questionId":"QA-Q0991252099245052415"},{"questionId":"QA-Q0995266297261018056"},{"questionId":"QA-Q01060274110372707195"},{"questionId":"QA-Q01099286937005820548"},{"questionId":"QA-Q01135294479035348144"},{"questionId":"QA-Q08435682805491389"},{"questionId":"QA-Q01209303525156203830"},{"questionId":"QA-Q01280315578381896863"},{"questionId":"QA-Q01312325341268526974"},{"questionId":"QA-Q01341335747327212081"},{"questionId":"QA-Q01367345310636230846"},{"questionId":"QA-Q01409355750536747955"},{"questionId":"QA-Q01448365137788889424"},{"questionId":"QA-Q01501373626996000468"},{"questionId":"QA-Q01504385948014992534"},{"questionId":"QA-Q01550392313392781022"},{"questionId":"QA-Q014047484264010827"},{"questionId":"QA-Q0160540427272331756"},{"questionId":"QA-Q01624416020124337375"},{"questionId":"QA-Q01698424613861651047"},{"questionId":"QA-Q01708434245776771624"},{"questionId":"QA-Q01751441114815592835"}],"triple":[{"tripleId":"170040","subject":40,"predicate":"productsOftenSoldTogether","object":55}],"metadata":{"docId":"40","docComment":"It appears that you are mistaken with reference to Mademoiselle Belloni, said Captain Gambier.We hear on positive authority that she will not appear at La Scala to-night.Its a disappointment; though, from what you did me the honour to hint to me, I cannot allow myself to regret it.","docKeywords":["Franko","looked","naturally","astonished"],"schemaId":"productSchema","schemaVersion":3,"docHistory":[{"docVersion":1,"docEditorId":23,"docEvent":"Insert","docEditDateTime":"2014-05-17T15:46:51.210Z","docHistoryId":"18002"},{"docVersion":1.1,"docEditorId":21,"docEvent":"Delete","docEditDateTime":"2016-07-14T22:49:24.590Z","docHistoryId":"18012"},{"docVersion":1.2,"docEditorId":23,"docEvent":"Undelete","docEditDateTime":"2017-03-04T16:15:24.395Z","docHistoryId":"18022"}]}}},
//     require('./tests/models/product.js').model
// );

// test an order
// getCsv({"order":{"orderNumber":60,"orderDate":"2017-03-06","orderStatus":"Returned","customer":{"customerId":18,"historicalCustomerName":"Dreyken"},"orderShipment":{"shipmentTrackingNumber":4457989811619,"shipmentMethod":"UPS Overnight","shipmentCost":75.02,"shipmentNotes":""},"orderShippingAddress":{"addressStreet":["22536 DAVIDSON DR"],"addressLocality":"Anchorage","addressRegion":"AK","addressPostalCode":99567,"addressCountry":"United States"},"product":[{"orderedProductId":"210060","productId":"51","productOrderQty":7,"historicalProductUnitPrice":13.97,"productWeight":11,"productWeightUOM":"boxed","productShippedDate":"2017-03-14","productCondition":"Good","productOrderStatus":"Returned"},{"orderedProductId":"210160","productId":"44","productOrderQty":8,"historicalProductUnitPrice":6.37,"productWeight":8,"productWeightUOM":"boxed","productShippedDate":"2017-03-14","productCondition":"Very Good","productOrderStatus":"Backordered"},{"orderedProductId":"210260","productId":"56","productOrderQty":7,"historicalProductUnitPrice":4.22,"productWeight":5,"productWeightUOM":"boxed","productShippedDate":"2017-03-14","productCondition":"Acceptable","productOrderStatus":"Returned"}],"orderTotals":{"totalOrderItemCost":178.29,"orderShippingCost":75.02,"orderShippingCostCredit":8.27,"orderSalesTax":16.54,"totalOrderCost":261.58},"orderPayment":[{"orderPaymentAmount":261.58,"paymentMethodId":"220060","orderPaymentDate":"2017-03-13","orderPaymentType":"Bank Account","orderPaymentMethod":{"paymentMethodId":"50010","paymentMethodType":"Bank Account","paymentMethodStatus":"Active","bankRoutingNumber":49427860,"bankAccountNumber":2318645924,"nameOnBankAccount":"Dreyken Nyamekye","driversLicenseNumber":"51207459947585","driversLicenseState":"AK"}}],"triple":[{"tripleId":"190060","subject":1,"predicate":"ordered","object":60}],"metadata":{"docId":"60","docComment":"289. My great desire in my fulfilling my ministry was to get into the darkest places of the country, even amongst those people that were furthest off of profession; yet not because I could not endure the light, for I feared not to show my gospel to any, but because I found my spirit leaned most after awakening and converting work, and the Word that I carried did lead itself most that way also; yea, so have I strived to preach the gospel, not where Christ was named, lest I should build upon another mans foundation (Rom 15:20).","docKeywords":["SAM.","Then","said","Samuel,"],"schemaId":"orderSchema","schemaVersion":3,"docHistory":[{"docVersion":1,"docEditorId":11,"docEvent":"Insert","docEditDateTime":"2017-03-06T00:00:00.000Z","docHistoryId":"200060"},{"docVersion":1.1,"docEditorId":23,"docEvent":"Delete","docEditDateTime":"2018-01-26T06:21:24.685Z","docHistoryId":"200160"}]}}},
//     require('./tests/models/order.js').model
// );

module.exports.jsonToCsv = getCsv;