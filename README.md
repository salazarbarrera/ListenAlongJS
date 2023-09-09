# ListenAlongJS
[https://salazarbarrera.neocities.org/ListenAlongJS/](ListenAlongJS) is a web app for listening what another Last.fm user is playing with Youtube.

![imagen](https://github.com/salazarbarrera/ListenAlongJS/assets/68821455/43bffc57-8fdf-48f0-ac92-2d1098695917)


# Background
Inspired by the python program [LastFmListenAlong](https://github.com/Hexalyse/LastFmListenAlong) and the js web app [Draft.fm](https://tmthornhill.github.io/draft.html) (both found [here](https://www.reddit.com/r/lastfm/comments/b06wql/how_to_listen_along_a_lastfm_user_on_spotify/)), and [jakeledoux](https://github.com/jakeledoux)'s [live](https://github.com/jakeledoux/live), I came up with this really basic and portable webapp that allows you to listen what any [last.fm](https://last.fm) user is currently playing. Sort of.

# How it works
What the app really does is to invoke a Youtube player and peek the "Now Playing" attribute of the account. If it finds a song there, then it:

1. Calls Youtube and asks for the top 30 search results of "%Artists% - %Track%"
2. Tries to play the top one.
3. If the first one fails (because of Vevo, because of location, etc, etc), it tries to play the next one (and so on).
4. If the video that finally works has bad quality or if it is totally unrelated to the song, you can press "Keep Seeking" and try with the next ones.

The song will change automatically once the user listens to other songs, and the program will scrobble the songs as it takes you to the next one.

# Pros and Cons
 **Cons**:

* It is a bit buggy
* You will have to be a little tech-savy, since you will need to ~~edit a javascript file and~~ generate an API key for [Youtube](https://developers.google.com/youtube/v3/getting-started) (instructions in the link).
* It will scrobble what the other user listens to, not the videos you actually listened to.
* You can only listen to about 100 songs per day because of the quota limitation of the Youtube search API.
* You can't get the "playlink" of a track (the Youtube video from the Last.fm page of a track).
* ~~You need to edit the js file to hardcode the target user and the API key.~~ Not anymore! See pros.

**Pros**:

* You don't need premium *anything*, you only need a free Youtube account to generate the API and a Last.fm account to scrobble.
* It's totally portable. You don't need to mount servers or anything fancy, just open the index.html with your favourite browser and enjoy the music (it is optimized for Firefox, it's more buggy on Chrome).
* To increase privacy and make it easier to use, now it is possible to set the target user and Google API via text input (compatible with autocomplete).
* Dark mode!
* Since it's that portable, and all the process is made client-side or via third party APIs, you can upload instances to free basic hosting services like [https://neocities.org/](Neocities) without concerns of someone stealing your Google API key. [https://salazarbarrera.neocities.org/ListenAlongJS/](Visit my demo!)
* It is a great companion for [Jakeledoux's Live](https://jakeledoux.com/live/fuestra), just go to [https://jakeledoux.com/live/{YOUR\_USER}](https://jakeledoux.com/live/{YOUR_USER}) and see what friend will be your personal DJ today.

# Instructions of use:

1. Generate the [Youtube API key](https://developers.google.com/youtube/v3/getting-started). Paste it in `bundle.js` where it says `'GOOGLE_API_KEY'` or in the text input.
2. Replace `'TARGET_USER'` with the username of the account you want to listen, or paste it in the text input.
3. Open `index.html` with your browser. Allow it to open pop-ups (also allow autoplay if on Firefox).
4. A pop up to [Last.fm](https://Last.fm) will open asking for authorization. Give access.
5. If you use Chrome, press play in the first video to "consent" to the autoplay.

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
