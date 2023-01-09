
//Global Variables & HTML elements
var songCard = $('.song-card');

// API Keys and base YouTube URL
var musixMatchAPIKey = "ad3a142fa0bfd7ef82851240e57a5429";
var youtubeAPIKey = "AIzaSyBhdeehy9kV7bhAksU03KmAr4G0eOQT6io";
var scottAPIKey = 'AIzaSyDpZQjFuUjVyg0d3_NEya9n2oYEvm9nMCw';
var sophAPIKey = 'AIzaSyD5r9mHgGwHO-m77puQByqYHX7gYO-LIsg';
var baseYouTubeURL = `https://www.googleapis.com/youtube/v3/search?key=${youtubeAPIKey}&maxResults=1&order=relevance&`;

//YouTube API call to create button to link to YouTube based on user search input
function getVideo (event) {
  event.preventDefault();
  var track = searchInput.val().trim().toLowerCase();

  if (track) {
      console.log('search submitted');

      function inputSubmit(trackName){
          $.get(baseYouTubeURL + `q=${trackName}`)
              .then(function (currentData){
                  console.log(currentData);
              })
              songCard.html('');

              songCard.html(`
              <button type="button" class="btn btn-primary btn-lg yt-btn"><i class="fab fa-youtube"></i>Watch song on YouTube</button>
              `)
      }

  } else {
      console.log("empty");
  }

  inputSubmit(track);
}

// var musicDataSearch = "rizzle";

// Variables to target search button, search input, YouTube button & song lyrics section
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
      <h4>Similar to your search...</h4>
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
  }
}

//Starting function on search button click
function init() {
  searchBtn.click(getArtistNames, getVideo);
}

init();
