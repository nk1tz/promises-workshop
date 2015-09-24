// Exercise-1: Delay

var Promise = require('bluebird');


function delay(ms, str) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            console.log(str);
            resolve();
        }, ms);
    });
}





delay(1000, "ONE").then(
    function(value) {
       return delay(1000, "TWO");
    },
    function(error) {
        console.log(error.message);
    }        
).then( 
    function(value) {
       return delay(1000, "THREE");
    },
    function(error) {
        console.log(error.message);
    }        
).then( 
    function(value) {
       return delay(1000, "...LIFTOFF");
    },
    function(error) {
        console.log(error.message);
    }      
);



// var delayPart1 = delay.then(
//     function(value) {
//         console.log("ONE");
//         return "HELLO FROM FIRST PROMISE!";
//     },
//     function(error) {
//         console.log(error.message);
//     }        
// )







// var myNewPromise = myPromise.then(
//     function(value) {
//         console.log("First promise: " + value);
//         return "HELLO FROM FIRST PROMISE!";
//     },
//     function(error) {
//         console.log(error.message);
//     }
// );