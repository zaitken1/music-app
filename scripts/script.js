var musixMatchAPIKey = "ad3a142fa0bfd7ef82851240e57a5429";

// var musicDataSearch = "rizzle";

// Varibales to target search button, search input & song lyrics section
var searchBtn = $(".search-btn");
var searchInput = $(".search-input");
var lyricsSection = $(".song-lyrics");

// var musicDataSearch = searchInput.val();

function getArtistNames(event) {
  event.preventDefault();
  var musicDataSearch = searchInput.val();

  if (musicDataSearch) {
    $.get(
      `
  https://api.allorigins.win/get?url=${encodeURIComponent(
    `https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${musicDataSearch}&page_size=5&apikey=ad3a142fa0bfd7ef82851240e57a5429`
  )}
`
    ).then(function (data) {
      data = JSON.parse(data.contents);
      lyricsSection.html("");

      lyricsSection.html(`
    <div>
      <h4 class="my-3">Similar to your search...</h4>
      <ul>
        <li>${data.message.body.artist_list[0].artist.artist_name}</li>
        <li>${data.message.body.artist_list[1].artist.artist_name}</li>
        <li>${data.message.body.artist_list[2].artist.artist_name}</li>
        <li>${data.message.body.artist_list[3].artist.artist_name}</li>
        <li>${data.message.body.artist_list[4].artist.artist_name}</li>
      </ul>
    </div>
    `);
    });
  } else {
    lyricsSection.html(`
    <div>
      <h4 class="my-3">Similar to your search...</h4>
      <p>Please enter a search value...</p>
    </div>
    `);
  }
}

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
  searchBtn.click(getArtistNames);
}

init();
