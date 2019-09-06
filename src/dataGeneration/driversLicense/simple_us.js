
module.exports = {
    alabama: numericLicense_helper.bind( null, 7 ),
    alaska: numericLicense_helper.bind( null, 7 ),
    // arizona:
};

function numericLicenseRange_helper( min, max ){

}


function numericLicense_helper( numOfDigits ){
    let license = [ Math.floor( Math.random() * 9 ) + 1 ];

    for( let i = 0; i < numOfDigits - 1; ++i ){
        license.push( Math.floor( Math.random() * 10 ) );
    }

    return license;
}