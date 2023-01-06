// Global Variables
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
