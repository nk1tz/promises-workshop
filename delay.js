// Exercise-1: Delay LIFTOFF!
var Promise = require('bluebird');

function delay(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

delay(1000).then(
    function(value) {
       console.log("ONE");
       return delay(1000);
    },
    function(error) {
        console.log(error.message);
    }        
).then( 
    function(value) {
       console.log("TWO");
       return delay(1000);
    },
    function(error) {
        console.log(error.message);
    }        
).then( 
    function(value) {
       console.log("THREE");
       return delay(1000);
    },
    function(error) {
        console.log(error.message);
    }        
).then( 
    function(value) {
       console.log("...LIFTOFF");
       return delay(1000);
    },
    function(error) {
        console.log(error.message);
    }      
);