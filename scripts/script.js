//Get HTML elements
var searchInput = $('.search-input');
var searchBtn = $('.search-btn');

//YouTube API variables
var youtubeAPIKey = "AIzaSyBhdeehy9kV7bhAksU03KmAr4G0eOQT6io";
var scottAPIKey = 'AIzaSyDpZQjFuUjVyg0d3_NEya9n2oYEvm9nMCw';
var sophAPIKey = 'AIzaSyD5r9mHgGwHO-m77puQByqYHX7gYO-LIsg';
var baseYouTubeURL = `https://www.googleapis.com/youtube/v3/search?key=${scottAPIKey}&maxResults=1&order=relevance&`;

//YouTube API call based on user's search input
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
        }

    } else {
        console.log("empty");
    }

    inputSubmit(track);
}


//API
var musixMatchAPIKey = "ad3a142fa0bfd7ef82851240e57a5429";

console.log(musixMatchAPIKey);



// YouTube Video
var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '300',
          width: '550',
          videoId: 'M7lc1UVf-VE',
          playerVars: {
            'playsinline': 1
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
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
};

init();