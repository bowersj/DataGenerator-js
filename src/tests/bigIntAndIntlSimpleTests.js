/**
 * See for simple examples https://v8.dev/blog/v8-release-76#localized-bigint
 * Note that bigint support for Intl is not in version 10.14 of node
 * Note new Intl features to hit Chrome, as of 8/8/19 https://v8.dev/features/intl-numberformat
 */
try{
    const formatter = new Intl.NumberFormat('en' );

    console.log( formatter.format( 123456789 ) );

    const dateFormatter = new Intl.DateTimeFormat( 'en', {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const start = new Date('2019-11-07T09:20:00');

    console.log( dateFormatter.formatToParts( start ) );

    const dateFormatter2 = new Intl.DateTimeFormat( "en",{
        timeStyle: 'medium',
        dateStyle: 'short'
    } );

    console.log( dateFormatter2.formatToParts( start ) );

    let bi = BigInt( "1234567894561324586978" );

    console.log( bi );

    console.log( "adding one" );
    console.log( bi + BigInt( 1 ) );

    console.log( "subtracting one" );
    console.log( bi - BigInt( 1 ) );

    console.log( "multiplying by two" );
    console.log( bi * BigInt( 2 ) );

    console.log( "dividing by two" );
    console.log( bi / BigInt( 2 ) );

} catch( err ){
    console.log( err );
}