var http = require('http');
var Promise = require('bluebird');
var request = Promise.promisify(require("request"));
var prompt = Promise.promisifyAll(require('prompt'));
var bigHugeKey = "41acd19c3639856d205e03a0c61fdb5b";


//      ------------------------- MAIN -------------------------

main();

function main(){
    getWord()
    .then( getSynonyms )
    .then( outputSyns );
}

function getWord(){
    return prompt.getAsync('word')
    .then(function(result){
        return result.word;
    });
}

function getSynonyms(word){
    return request('http://words.bighugelabs.com/api/2/' + bigHugeKey + '/' + word + '/json')
    .then( function(result){
        //Parse the json string into an object.
        var synonyms = JSON.parse(result[1]);
        return synonyms;
    });
}
    
function outputSyns(syns){
    if( syns.hasOwnProperty("verb") )       var verbs = syns.verb.syn;
    if( syns.hasOwnProperty("noun") )       var nouns = syns.noun.syn;
    if( syns.hasOwnProperty("adverb") )     var adverbs = syns.adverb.syn;
    if( syns.hasOwnProperty("adjective") )  var adjectives = syns.adjective.syn;
    
    if (syns) {
        //Output response to browser.
        console.log("\nSome synonyms are :");
        if( verbs ){
            console.log("\n\nVerbs:   " + verbs);
        }
        if( nouns ){
            console.log("\n\nNouns:   " + nouns);
        }
        if( adverbs ){
            console.log("\n\nAdverbs:   " + adverbs);
        }
        if( adjectives ){
            console.log("\n\nAdjectives:   " + adjectives);
        }
    }else{
        console.log("Sorry we did not find any synonyms...");
    }
}    
