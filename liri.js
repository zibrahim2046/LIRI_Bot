require("dotenv").config();

var keys = require("./keys.js");

// Spotify API that pulls from keys.js
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Acessing moment through Node
var moment = require("moment");
moment().format();

// This will use Axios to pull info from OMDB and BandsInTown API
var axios = require("axios");

// This will read the random.txt file for do-what-it-says function
var fs = require("fs");

// This will read the first input (concert-this, movie-this, etc..)
var input1 = process.argv[2];

// This will read second input which is actual movie title, band name, etc..
var input2 = process.argv[3];

// Using a switch statement with different cases for possible inputs
switch (input1) {
  case "concert-this":
    concertThis(value);
    break;
  case "spotify-this-song":
    spotifySong(value);
    break;
  case "movieThis":
    movieThis(value);
    break;
  case "do-what-it-says":
    doThis(value);
    break;
}
