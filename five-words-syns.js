var http = require('http');
var Promise = require('bluebird');
var request = Promise.promisify(require("request"));
var prompt = Promise.promisifyAll(require('prompt'));
var colors = require('colors');
var bigHugeKey = "41acd19c3639856d205e03a0c61fdb5b";


//      ------------------------- MAIN -------------------------


main();

function main(){
    var randomWords = [];
    var synsArray = [];
    // var currentWord = "";
    getRandomWords(5)
    .then( function(result){
        randomWords = result.map(function(ele,ind){
            return ele.word;
        });
        return randomWords;
    })
    .map(function(word){
        return getSynonyms(word)
        .then( function(syns){
           synsArray.push(syns); 
        });
    })
    .finally( function(){
        console.log(synsArray);
        // var wordsObject = [randomWords, synsArray];
        for(var i=0; i<randomWords.length; i++){
            outputSyns(randomWords[i],synsArray[i]);
        }
    }).catch(function(err){
        console.log("\n\nThere has been an error : " +err).bold;
    });
}

function getRandomWords(n){
    return request('http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=5000&maxCorpusCount=30000&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit='+n+'&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
    .then(function(result){
        var randomWords = JSON.parse(result [1]);

        return randomWords; 
    });
}

function getSynonyms(word){
    return request('http://words.bighugelabs.com/api/2/' + bigHugeKey + '/' + word + '/json')
    .then( function(resultsyns){
        //Parse the json string into an object.
        var synonyms = JSON.parse(resultsyns[1]);
        // console.log(synonyms);
        return synonyms;
    });
}
    
function outputSyns(word, synsArr){
    console.log( ("\nSome synonyms of "+word.yellow.bold+" are :").bold );
    if (synsArr) {
        if( synsArr.hasOwnProperty("verb") )       var verbs = synsArr.verb.syn;
        if( synsArr.hasOwnProperty("noun") )       var nouns = synsArr.noun.syn;
        if( synsArr.hasOwnProperty("adverb") )     var adverbs = synsArr.adverb.syn;
        if( synsArr.hasOwnProperty("adjective") )  var adjectives = synsArr.adjective.syn;
        
        //Output response to browser.
        
        if( verbs ){
            console.log( ("Verbs :   ").green + verbs);
        }
        if( nouns ){
            console.log( ("Nouns :   ").green + nouns);
        }
        if( adverbs ){
            console.log( ("Adverbs :   ").green + adverbs);
        }
        if( adjectives ){
            console.log( ("Adjectives :   ").green + adjectives);
        }
    }else{
        console.log( ("Sorry we did not find any synonyms...").bold.red );
    }
}    
