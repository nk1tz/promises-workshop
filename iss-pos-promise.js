// Exercse-3:   ISS position program with promises
var Promise = require('bluebird');
var request = Promise.promisify(require("request"));
var prompt = Promise.promisifyAll(require('prompt'));


// -----------------------------------------------
//                      MAIN
// -----------------------------------------------




getUserDistanceToIss()
.then(function(distance){
    console.log("\nThe distance between you and the ISS is: " + Math.round(distance / 1000) + " kilometers\nOr approximately " + Math.round(distance / 1000000) + " times the width of France.");
});





     //-------Functions--------\\
    //__________________________\\
                        
function getUserDistanceToIss (){
    return Promise.join(getUserLocation(), getIssLocation(), function(user, iss){
        var distance = distanceToISS(user, iss);
        return distance;
    });
}
                        
function getIssLocation(){
    return request('http://api.open-notify.org/iss-now.json')
    .then(function(result) {
        var iss = {};
        var body = result[1];
        var issInfo = JSON.parse(body);
        iss.lat = issInfo.iss_position.latitude;
        iss.lon = issInfo.iss_position.longitude;
        return iss;
    }).catch(function(err){
        console.log(err, "error");
    });
}
                        
function getUserLocation(){
    return prompt.getAsync('location')
    .then( function(result){
        return request('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCqB6bDHnvEmYxcRm5qg6yso2V9Q4MbOiE&address=' + result.location);
    })
    .then(function(result2) {
        var user = {};
        var body = result2[1];
        var userLocationInfo = JSON.parse(body);
        user.lat = userLocationInfo.results[0].geometry.location.lat;
        user.lon = userLocationInfo.results[0].geometry.location.lng;
        return user;
    }).catch(function(err){
        console.log(err, "error");
    });
}

function distanceToISS(user, iss){
    var R = 6371000; // metres
    var φ1 = toRadians(user.lat);
    var φ2 = toRadians(iss.lat);
    var Δφ = toRadians(iss.lat - user.lat);
    var Δλ = toRadians(iss.lon - user.lon);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    var d = R * c;
    
    return d;
}

function toRadians(x){
   return x * Math.PI / 180;
}
