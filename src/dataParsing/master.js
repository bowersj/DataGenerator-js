/*
 *
 * worker.js
 *
 * Purpose
 * To provide multi threaded process to handle data generation
 *
 * History
 * Josh Bowers 11/1/2018T18:10:00.00
 */

const cluster = require('cluster');
const os = require('os');


// check if this is the master process
if( cluster.isMaster ){
    // get the number of cpus on the installed machine
    //TODO: get from config document
    const cores = os.cpus().length;

    // console.log( `forking for ${cores} CPU's` );
    // forking the maximum times
    // TODO: set a default and allow the user to change through a config object
    for( let i = 0; i < cores; i++ ){
        cluster.fork();
    }
} else {
    require('./worker.js')
}