//Exercise 2 - GetFirstChar
var Promise = require('bluebird');

// MAIN-------------------------------------

console.log("Start");

getFirstChar("Howdy").then( console.log );

getLastChar("Howdy").then( console.log );

getFirstAndLastChar("Astronaut").then( console.log );

getFirstAndLastCharParallel("Nathan").then( console.log );


// functions--------------------------------

function getFirstAndLastChar(str){
    var firstChar;
    return getFirstChar(str).then(
        function(value1){
            firstChar = value1;
            return getLastChar(str);
        }    
    ).then(
        function(value2){
            return firstChar+value2;
        }
    );
}

function getFirstChar(str){
        return delay(500).then(function(){
            return str[0];
        });
}

function getLastChar(str){
        return delay(500).then(function(){
            return str[str.length-1];
        });
}

function delay(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

function getFirstAndLastCharParallel(str){
    return Promise.join(getFirstChar(str), getLastChar(str), function(first, last){
       return first + last; 
    });
}