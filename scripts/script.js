var musixMatchAPIKey = "ad3a142fa0bfd7ef82851240e57a5429";

var artistSearch = "punk";

$.get(
  `
  https://api.allorigins.win/get?url=${encodeURIComponent(
    `https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${artistSearch}&page_size=5&apikey=ad3a142fa0bfd7ef82851240e57a5429`
  )}
`
).then(function (data) {
  data = JSON.parse(data.contents);
  console.log(data);
});

// YouTube Video
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "300",
    width: "550",
    videoId: "M7lc1UVf-VE",
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

//Starting function on search button click
function init() {
  searchBtn.click(getVideo);
}

init();
