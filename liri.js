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
    concertThis(input2);
    break;
  case "spotify-this-song":
    spotifySong(input2);
    break;
  case "movieThis":
    movieThis(input2);
    break;
  case "do-what-it-says":
    doThis(input2);
    break;
}

// Function that loops through bandsintown API and pulls Name, Date, Time, and Location of event

function concertThis(input2) {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        input2 +
        "/events?app_id=codingbootcamp"
    )
    // This will handle the response in a loop
    .then(function (response) {
      for (var i = 0; i < response.data.length; i++) {
        var datetime = response.data[i].datetime;
        var concertResults =
          "--------------------------------------------------------------------" +
          "\nVenue Name: " +
          response.data[i].venue.name +
          "\nVenue Location: " +
          response.data[i].venue.city +
          "\nDate of the Event: " +
          moment(datetime, "YYYY-MM-DD").format("MM/DD/YYYY");
        console.log(concertResults);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function spotifySong(input2) {
  if(!input2){
      input2 = "All the Small Things";
  }
  spotify
  .search({ type: 'track', query: input2 })
  .then(function(response) {
      for (var i = 0; i < 5; i++) {
          var spotifyResults = 
              "--------------------------------------------------------------------" +
                  "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                  "\nSong Name: " + response.tracks.items[i].name +
                  "\nAlbum Name: " + response.tracks.items[i].album.name +
                  "\nPreview Link: " + response.tracks.items[i].preview_url;
                  
          console.log(spotifyResults);
      }
  })
  .catch(function(err) {
      console.log(err);
  });
}


  
