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

var requestComplete = function(){
  console.log("Request Successfully Completed!");
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var gifs = JSON.parse(jsonString);
  console.log(gifs.data);
  localStorage.setItem('gifs', gifs.data);
  loopThrough(gifs.data);
}

var loopThrough = function(gifs) {
  gifs.map(function(gif){
    createList(gif);
  });
}

var createList = function(gif) {
  var section = document.querySelector('#gif-list');
  img = section.appendChild(document.createElement('a'));
  img.outerHTML = '<a href="'+ gif.url +'" target="_blank"><img class="gifs" src="'+ gif.images.fixed_height.webp +'" alt="'+gif.slug+'"></a>'

  console.log(img.outerHTML);
}

window.addEventListener('load', app);
