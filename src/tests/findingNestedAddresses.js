const fs = require( "fs" );

// const pathToAddress = "D:\\fakeData\\_fakeData\\address";
// const fullPath = `${ pathToAddress }\\${ country }`;
const fullPath = "D:\\fakeData\\_fakeData\\address";

let dirs = [];
let files = [];

let potentialDirs = fs.readdirSync( fullPath, { withFileTypes: true } );

// console.log( potentialDirs );

for( let i = 0; i < potentialDirs.length; ++i ){
    processFiles({ file: potentialDirs[i], level: -1, path: fullPath });
}

// console.log( dirs );

let dir = { level: -1, dir:{ name: "" } };
let contents = [];
let temp = [];
let current = "";

while( dirs.length > 0 ){
    dir = dirs.pop();
    contents = fs.readdirSync( dir.path, { withFileTypes: true } );
    temp = dir.path.split( "\\" );
    current = temp[ temp.length - 1 ];

    // console.log( current );
    // console.log( temp );
    // console.log( dir.path );
    // console.log( contents );

    for( let i = 0; i < contents.length; ++i ){
        if( contents[i].name !== current )
            processFiles({ file: contents[i], level:dir.level, path: dir.path })
    }
}

let list = [];


for( let i = 0; i < files.length; ++i ){
    if( files[i].level > 2 )
        console.log( files[i].path );
        // list.push( files[i].path );
}

// fs.writeFileSync(  )

function processFiles({ file, level, path }){
    if( file.isDirectory() ){
        dirs.push({ path: `${path}\\${file.name}`, level: level + 1 });
    } else if( file.isFile() ){
        files.push({ path: `${path}\\${file.name}`, level });
    }
}
