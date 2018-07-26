require("dotenv").config();
var textRead;
var fs = require("fs")
var request = require('request');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var params = {
    screen_name: 'testert02574865',
    count: 20
}
var command = process.argv[2];
var userInput = process.argv[3];

if (command === "my-tweets") {
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        for (i = 0; i < 20; i++) {
            console.log("Tweet " + [i] + ": " + tweets[i].text);
        }
    });
}

if (command === "movie-this") {
    if(userInput === undefined){
        userInput = "Mr.Nobody";
    }
    request('http://www.omdbapi.com/?apikey=trilogy&t=' + userInput + "&tomatoes=true&r=json", function (error, response, body) {
        newBody = JSON.parse(body);
        console.log("Movie: " + newBody.Title)
        console.log("Release Date: " + newBody.Year)
        console.log("IMDB: " + newBody.imdbRating)
        console.log("Tomato Rating: " + newBody.tomatoRating)
        console.log("Country: " + newBody.Country)
        console.log("Language: " + newBody.Language)
        console.log("Plot: " + newBody.Plot)
        console.log("Actors: " + newBody.Actors)
    });
}

if (command === "spotify-this-song"){
    spotify.search({ type: 'track', query: userInput, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
    var str = JSON.stringify(data, null, 2)

      console.log("Song: " + data.tracks.items[0].name);
      console.log("Artist: " + data.tracks.items[0].artists[0].name); 
      console.log("Album: " + data.tracks.items[0].album.name); 
      console.log("Preview: " + data.tracks.items[0].preview_url); 
      });
}

if (command === "do-what-it-says"){
    var text = fs.readFile('./random.txt',"utf8", function(err,data){
         textRead = data.split(",");
        console.log(textRead[1])
        spotify.search({ type: 'track', query: textRead[1], limit: 1 }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
        var str = JSON.stringify(data, null, 2)
    
          console.log("Song: " + data.tracks.items[0].name);
          console.log("Artist: " + data.tracks.items[0].artists[0].name); 
          console.log("Album: " + data.tracks.items[0].album.name); 
          console.log("Preview: " + data.tracks.items[0].preview_url); 
          });
    });
}