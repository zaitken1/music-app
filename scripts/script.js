//Get HTML elements
var songCard = $('.song-card');
var searchBtn = $(".search-btn");
var searchInput = $(".search-input");
var lyricsSection = $(".song-lyrics");
var searchHist = $('.search-hist');

// API Keys and base YouTube URL
var musixMatchAPIKey = "ad3a142fa0bfd7ef82851240e57a5429";
var youtubeAPIKey = "AIzaSyBhdeehy9kV7bhAksU03KmAr4G0eOQT6io";
var scottAPIKey = 'AIzaSyDpZQjFuUjVyg0d3_NEya9n2oYEvm9nMCw';
var sophAPIKey = 'AIzaSyD5r9mHgGwHO-m77puQByqYHX7gYO-LIsg';
var baseYouTubeURL = `https://www.googleapis.com/youtube/v3/search?key=${youtubeAPIKey}&maxResults=1&order=relevance&`;

//Check localStorage for items
var searchHistory = JSON.parse(localStorage.getItem("track")) || [];

//Add localStorage items to page on page load
searchHist.html('');

//Creates buttons with class history-btn for each item in localStorage
function createBtns() {
  for (let i = 0; i < searchHistory.length; i++) {
    var create = $("<button>");
    create.attr("type", "submit");
    create.attr("class", "history-btn");
    create.text(searchHistory[i]);
    searchHist.append(create);
  }
}

createBtns();

var historyBtn = $('.history-btn');
var track;
var trackUpperCase;

//YouTube API call to create button to link to YouTube based on user search input
function getVideoLink(event) {
  event.preventDefault();
  console.log('hello');
  //save users search input to variables
  track = searchInput.val().trim().toLowerCase();
  trackUpperCase = searchInput.val().trim();

  if (track) {

    //Calls YouTube API and dynamically creates YouTube button and search history
    function inputSubmit(trackName) {
      $.get(baseYouTubeURL + `q=${trackName}`)
        .then(function (currentData) {
          console.log(currentData);

          //if localStorage value doesn't already contain search input text, add button, setitem to localSotrage and display forecast data, else just show 
          //pushes users input to localStorage array and creates new search history button if item doesn't already exist in localStorage
          if (searchHistory.indexOf(trackUpperCase) == -1) {
            searchHistory.push(trackUpperCase);
            console.log("that doesn't exist");
          }
          
          searchInput.val('');
          songCard.html('');
          searchHist.html('');

          for (let i = 0; i < searchHistory.length; i++) {
            var create = $("<button>");
            create.attr("type", "submit");
            create.attr("class", "history-btn-two");
            create.text(searchHistory[i]);
            searchHist.append(create);
          }

          var searchHistoryTwo = $('.history-btn-two');

          searchHistoryTwo.click(function(event){
            event.preventDefault();
            var text = $(this).text();
            searchInput.val(text);
            getVideoLink(event);
          });

          localStorage.setItem("track", JSON.stringify(searchHistory));

          var videoID = currentData.items[0].id.videoId;

          songCard.html(`
              <a href="https://www.youtube.com/watch?v=${videoID}" target="_blank"><button type="button" class="btn btn-primary btn-lg yt-btn"><i class="fab fa-youtube"></i>Watch song on YouTube</button></a>
              `);
        })
    }
  }

  inputSubmit(track);
}

// var musicDataSearch = "rizzle";

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

//Function to add search history button text to input field on click
function hist() {
  $(document).ready(function () {
      historyBtn.click(function (event) {
          event.preventDefault();
          var text = $(this).text();
          searchInput.val(text);
          getVideoLink(event);
      });
  });
}

hist();

//Starting function on search button click
function init() {
  searchBtn.click(getArtistNames);
  searchBtn.click(getVideoLink);
}

init();
