require("dotenv").config();
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
            console.log(tweets[i].text);
        }
    });
}


