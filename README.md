# ListenAlongJS
A web app for listening what another Last.fm user is playing with Youtube

# Background
Inspired by the python program [LastFmListenAlong](https://github.com/Hexalyse/LastFmListenAlong) and the js web app [Draft.fm](https://tmthornhill.github.io/draft.html) (both found [here](https://www.reddit.com/r/lastfm/comments/b06wql/how_to_listen_along_a_lastfm_user_on_spotify/)), and [jakeledoux](https://github.com/jakeledoux)'s [live](https://github.com/jakeledoux/live), I came up with this really basic and portable webapp that allows you to listen what a [last.fm](https://last.fm) user is currently playing. Sort of.

# How it works
What the app really does is to invoke a Youtube player and peek the "Now Playing" attribute of an account. If it finds a song, then

1. It calls Youtube and asks for the top 30 results of "%Artists% - %Track%"
2. It tries to play the top one. 
3. If the first one fails (because of Vevo, because of location, etc, etc), it tries to play the next one and so on.
4. If the video that finally works is not good or if it is totally unrelated, you can press "Keep Seeking" and try with the next ones.

The song will change automatically when the user listens anything new, and it will scrobble the song when other user stops playing.

# Pros and Cons
 **Cons**:

* It is very buggy
* It requires to be a little tech-savy in order to generate API key for [Youtube](https://developers.google.com/youtube/v3/getting-started) (instructions in the links).
* It will scrobble what the other user listened to, not what you actually listened to.
* You can only listen to about 100 songs per day because of a limitation of how many times you can use the Youtube search API.
* You can't get the "playlink" Youtube video from the Last.fm website, if the search API finds it for you, it was pure good luck.
* You need to edit the js file to set the target user and the API keys.

**Pros**:

* You don't need premium *anything*, you only need a free Youtube account to generate the APIs and a Last.fm account to use it.
* It's totally portable. You don't need to mount servers or anything fancy, just open the index.html with your favourite browser and enjoy the music.
* It is a great companion for [Jakeledoux's Live](https://jakeledoux.com/live/fuestra), just go to https://jakeledoux.com/live/{YOUR\_USER} and see what friend will be your personal DJ today.

# Instructions of use:

1. Generate the [Youtube API key](https://developers.google.com/youtube/v3/getting-started) and paste it in `bundle.js` where it says `'GOOGLE_API_KEY'.`
2. Replace `'TARGET_USER'` with the username of the account you want to listen.
3. Open `index.html` with your browser. Allow it to open pop-ups (also allow autoplay if on Firefox). Refresh.
4. A pop up to [Last.fm](https://Last.fm) will open asking for authorization. Authorize it.
5. If you use Chrome, press play in the first video.

# Build instructions
The bundles are made with [Browserify](https://browserify.org/).

To instal Browserify globally, run:

```
npm install -g browserify
```

Then, clone this repo and in its root folder run

```
npm install
browserify src/index.js -o bundle.js
```
# Credits
This program couldn't be possible without these libraries:
* [Lastfm-node](https://github.com/jammus/lastfm-node)
* [Youtube-search](https://github.com/MaxGfeller/youtube-search)

# Afterwords
Honestly, I don't pretend to maintain this app too much, as ugly as it is, it satisfies my current needs. At least for now.

But hey! It's AGPL, so feel free to mess with the code.
