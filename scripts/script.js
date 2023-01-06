var musixMatchAPIKey = "ad3a142fa0bfd7ef82851240e57a5429";

console.log(musixMatchAPIKey);

var youtubeAPIKey = "AIzaSyBhdeehy9kV7bhAksU03KmAr4G0eOQT6io";
var baseYouTubeURL = `https://www.googleapis.com/youtube/v3/search?key=${youtubeAPIKey}`;
var video = $.get(baseYouTubeURL + '&maxResults=1&order=relevance&q=heroes%20david%20bowie');

console.log(video);

