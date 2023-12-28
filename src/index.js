/********************************************************************************** *
* ListenAlongJS
*
* Diego Salazar Barrera, @ 05 September 2023
* Latest Revision: 05 Sep 2023
*
*
* Little web app for listening what other Last.fm users are playing.
* Powered by Youtube. This authorization is necessary to allow the app to 
* scrobble the tracks you listen.
* 
* write to me at:
*
* do.salazarbarrera@gmail.com
*
* send issues to
* 
* https://github.com/salazarbarrera/ListenAlongJS
*  
* End Of Comments
* ********************************************************************************* */


////////////////////_HARDCODED_VARIABLES////////////////////
var GOOGLE_KEY = 'GOOGLE_API_KEY';
var USER = 'TARGET_USER';
////////////////////////////////////////////////////////////


////////////////////_IMPORTS_&_CONSTANTS////////////////////
const search = require('youtube-search');
const LastFmNode = require('lastfm').LastFmNode;
const MAX_RESULTS = 30;
const lastfmSecret = 'd93696111a9e0618b674a327f666be5e'
const lastfmApi = 'c6428f3b317e769153c76688dee205ad'
////////////////////////////////////////////////////////////


var player;
var oldDate;
var oldTrack;

var videoResults;
var videoIndex;
var lastfm

function resumeLoadVideo(){
  if (videoIndex < MAX_RESULTS)
    loadVideo(videoResults, videoIndex+1)
}

function loadVideo(results, index) {
  videoResults = results;
  videoIndex = index;
  if (player != null) {
    player.destroy();
  }
  window.YT.ready(function() {
    var player = new window.YT.Player("yt-iframe", {
      height: "390",
      width: "640",
      videoId: results[index].id,
      playerVars: {
        "autoplay": 1,
        "controls": 0,
        "showinfo": 0,
        "rel": 0,
        "iv_load_policy": 3,
        "disablekb": 1
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  });

  function onPlayerReady(event) {
    if (player.getPlayerState() == -1 && index < MAX_RESULTS){
      loadVideo(results, index+1);
    } else {
      player.playVideo();
    }
  }

  function onPlayerStateChange(event) {
    var videoStatuses = Object.entries(window.YT.PlayerState)
    console.log(videoStatuses.find(status => status[1] === event.data)[0])


  }
}


let token_url = "http://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=" + lastfmApi + "&format=json";

var mytoken;
var mySession;


function auth(){
    lastfm = new LastFmNode({
      api_key: lastfmApi,
      secret: lastfmSecret
    });

    //alert('Please allow popups for this website and authorize it to scrobble in your name.');
    $.getJSON( token_url, function( data ) {
    mytoken = data.token;

    let authUrl = "https://www.last.fm/api/auth?api_key=" + lastfmApi + "&token=" + mytoken;
    var win = window.open(authUrl, '_blank', 'toolbar=yes,scrollbars=yes,width=500,height=400');
    $("#lobby").hideV();
    $("#launch").showV();

  });
}

function launch(){
  var opts = {
    maxResults: MAX_RESULTS,
    key: GOOGLE_KEY
  };


  mySession = lastfm.session({
   token: mytoken,
   handlers: {
      success: function(session) {
        console.log("Success!");
      }
   }
  });

  var trackStream = lastfm.stream(USER);

  var titulo = "";

  console.log(trackStream.name);

  trackStream.on('lastPlayed', function(track) {
  /*  console.log('Last played: ' + (track.artist)['#text'] + " - " + track.name);
  */});

  trackStream.on('nowPlaying', function(track) {
    console.log('Now playing: ' + (track.artist)['#text'] + " - " + track.name);

    document.getElementById("song").innerHTML = 'Now playing: ' + (track.artist)['#text'] + " - " + track.name;

    search((track.artist)['#text'] + " - " + track.name, opts , function (err, results) {
    if(err) return console.log(err);

    console.dir("ID: " + results[0].id);
      loadVideo(results, 0);
      if (oldDate != null){
        lastfm.update('scrobble', mySession, { track: oldTrack, timestamp: oldDate });
      }
      oldDate = Math.floor(Date.now() / 1000);
      oldTrack = track;
      lastfm.update('nowplaying', mySession, { track: track } );
    });
  });

  trackStream.on('scrobbled', function(track) {
  /*  console.log('Scrobbled: ' + track.name);
  */});

  trackStream.on('stoppedPlaying', function(track) {
    console.log('Stopped playing: ' + track.name);
    if (oldDate != null){
        lastfm.update('scrobble', mySession, { track: oldTrack, timestamp: oldDate });
    }
  });

  trackStream.on('error', function(error) {
    console.log('Error: '  + error.message);
  });

  trackStream.start();

}

jQuery.fn.showV = function() {
    this.css('display', 'block');
}

jQuery.fn.hideV = function() {
    this.css('display', 'none');
}


$(document).ready(function() {
    $("#auth").click(function() {
        GOOGLE_KEY = document.getElementById("googleKeyUI").value == "" ? GOOGLE_KEY : document.getElementById("googleKeyUI").value ;
        USER = document.getElementById("targertUserGUI").value == "" ? USER : document.getElementById("targertUserGUI").value;
        setTargetUser();
        document.querySelector('form button').click();
        auth();
    });
});

$(document).ready(function() {
    $("#launch").click(function() {
        launch();
        $("#launch").hideV();
        $("#player").showV();
    });
});

$(document).ready(function() {
    $("#skipper").click(function() {
        resumeLoadVideo();
    });
});


function setTargetUser(){
  let targetUserUrl = "https://www.last.fm/user/" + USER;
  document.getElementById("targetuser").innerHTML = targetUserUrl;
  $(document).ready(function() {
      $("#targetuser").click(function() {
        window.open(targetUserUrl, '_blank');
      });
  });  
}

setTargetUser();