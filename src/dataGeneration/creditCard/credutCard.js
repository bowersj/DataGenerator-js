const ccNum = require( "./creditCardNumbers" );
const ccv = require( "./ccv.js" );

module.exports = {
    visa: ccNum.visa,
    visaElectron: ccNum.visaElectron,
    masterCard: ccNum.masterCard,
    discoverCard: ccNum.discoverCard,
    americanExpress: ccNum.americanExpress,
    unionPay: ccNum.unionPay,
    maestro: ccNum.maestro,
    elo: ccNum.elo,
    mir: ccNum.mir,
    hiper: ccNum.hiper,
    hipercard: ccNum.hipercard,
    ccv
};
