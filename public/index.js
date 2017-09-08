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
  localStorage.setItem('gif', gifs);
  console.log(gifs.data)
  loopThrough(gifs);
}

var loopThrough = function(gifs) {
  array = gifs.data;
  var singleGif = array.forEach(function(gif, index){
    createList(singleGif);
    console.log(singleGif)
  });
}

var createList = function(gif) {
  gifs = document.querySelector('#gif-list');
  li = document.createElement('li')
  li.classList = 'list-data'
  li.innerText = gif.source;
  gifs.appendChild('li')
}

window.addEventListener('load', app);
