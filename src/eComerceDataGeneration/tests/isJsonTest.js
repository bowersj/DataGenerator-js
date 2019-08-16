/*
 * isJson.js
 * 
 * Purpose
 *   To see which approach is faster.
 * 
 */


function isJson(item) {
    // item = typeof item !== "string"
    //     ? JSON.stringify(item)
    //     : item;
    //
    // try {
    //     item = JSON.parse(item);
    // } catch (e) {
    //     return false;
    // }
    //
    // return typeof item === "object" && item !== null;

    return item.constructor.name === "Object" || item.constructor.name ===  "Array"


}

const itrs = 10000000;

let item  = { hi:"there" };            // true
let item2 = [];            // true
let item3 = "Hi there";    // false
let item4 = new Number(0); // false


let constructorStart = new Date().getTime();

for(let i = 0; i < itrs; i++){

    ( item.constructor.name === "Object"  || item.constructor.name ===  "Array" ) && item !== null;
    ( item2.constructor.name === "Object" || item2.constructor.name ===  "Array" ) && item !== null;
    ( item3.constructor.name === "Object" || item3.constructor.name ===  "Array" ) && item !== null;
    ( item4.constructor.name === "Object" || item4.constructor.name ===  "Array" ) && item !== null;
}

let constructorEnd = new Date().getTime();


let handleStart = new Date().getTime();

for( let i = 0; i < itrs; i++ ){
    item = typeof item !== "string" ? JSON.stringify(item) : item;
    try { item = JSON.parse(item) } catch (e) {  false }
    typeof item === "object" && item !== null;

    item2 = typeof item2 !== "string" ? JSON.stringify(item2) : item2;
    try { item2 = JSON.parse(item2) } catch (e) {  false }
    typeof item2 === "object" && item2 !== null;

    item3 = typeof item3 !== "string" ? JSON.stringify(item3) : item3;
    try { item3 = JSON.parse(item3) } catch (e) {  false }
    typeof item3 === "object" && item3 !== null;
    
    item4 = typeof item4 !== "string" ? JSON.stringify(item4) : item4;
    try { item4 = JSON.parse(item4) } catch (e) {  false }
    typeof item4 === "object" && item4 !== null;
}

let handleEnd = new Date().getTime();

console.log(JSON.stringify({
    constructor: ( ( itrs / ( constructorEnd - constructorStart ) ) * 1000 ).toLocaleString('en-US'),
    handle:    ( ( itrs / ( handleEnd - handleStart ) ) * 1000 ).toLocaleString('en-US'),
}));
