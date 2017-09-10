var app = function(){
  var url = 'https://api.giphy.com/v1/gifs/trending?api_key=77f26d5aac2243618618a35dee280226&limit=25&rating=G';
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var makeSearchRequest = function(callback) {
  var searchData = document.getElementById("input").value;
  var apiUrl = 'https://api.giphy.com/v1/gifs/search?api_key=77f26d5aac2243618618a35dee280226&q=' + searchData + '&limit=5&offset=0&rating=G&lang=en';
  var request = new XMLHttpRequest();
  request.open('GET', apiUrl);
  console.log(apiUrl);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){
  console.log("Request Successfully Completed!");
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var gifs = JSON.parse(jsonString);
  console.log(gifs.data);
  localStorage.setItem('gifs', gifs.data);
  loopThrough(gifs.data);
}

var searchComplete = function(){
  console.log("Request Successfully Completed!");
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var gifs = JSON.parse(jsonString);
  console.log(gifs.data);
  localStorage.setItem('gifs', gifs.data);
  loopSearch(gifs.data);
}

var loopSearch = function(gifs) {
  gifs.map(function(gif){
    createSearchList(gif);
  });
}

var loopThrough = function(gifs) {
  gifs.map(function(gif){
    createList(gif);
  });
}

var createSearchList = function(gif) {
  var newSection = document.querySelector('#search-data');
  console.log(newSection);
  searchImg = newSection.appendChild(document.createElement('a'));
  searchImg.outerHTML = '<a href="'+ gif.url +'" target="_blank"><img class="gifs" src="'+ gif.images.fixed_height.webp +'" alt="'+gif.slug+'"></a><br><br>'
  // var container = document.querySelector("#chart")
  // new Highcharts.Chart({
  //   chart: {
  //     type: 'pie',
  //     renderTo: container
  //   },
  //   text: "Ratings"
  //   },
  //   // series: [
  //   // {
  //   // name: "Rating",
  //   // data: [gif.rating]
  //   // }
  // // ]
  // });
  console.log(gif.rating);
}

var createList = function(gif) {
  var section = document.querySelector('#gif-list');
  img = section.appendChild(document.createElement('a'));
  img.outerHTML = '<a href="'+ gif.url +'" target="_blank"><img class="gifs" src="'+ gif.images.fixed_height.webp +'" alt="'+gif.slug+'"></a><br><br>'
  console.log(img.outerHTML);
}

window.addEventListener('load', app);
