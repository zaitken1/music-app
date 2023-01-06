// Global Variables
var musixMatchAPIKey = "ad3a142fa0bfd7ef82851240e57a5429";

console.log(musixMatchAPIKey);

//api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&page_size=3&page=1&s_track_rating=desc

//api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=ad3a142fa0bfd7ef82851240e57a5429&page=1&page_size=1&country=england%22

$.get(
  `https://api.allorigins.win/get?url=${encodeURIComponent(
    "https://api.musixmatch.com/ws/1.1/artist.search?q_artist=prodigy&page_size=5&apikey=ad3a142fa0bfd7ef82851240e57a5429"
  )}
`
).then(function (data) {
  data = JSON.parse(data.contents);
  console.log(data);
});

// $.get(
//   `https://api.allorigins.win/get?url=${encodeURIComponent(
//     "https://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=ad3a142fa0bfd7ef82851240e57a5429&page=1&page_size=1&country=england%22"
//   )}
// `
// ).then(function (data) {
//   data = JSON.parse(data.contents);
//   console.log(data);
// });
