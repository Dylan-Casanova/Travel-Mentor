// declearing variables to use in fuctions and loops

// var key ='AIzaSyDD9MbkIVSzT2a3sOv97OecaqhyGdF174c';
var videoPlayer= $('#iframe');

var searchBoxEl = $('#searchBox');

//var searchButtonEl = $('#searchButton');
/*
searchButtonEl.click(function() {
  var input = $(searchBoxEl).val().trim();
  var ytLink = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q='+input+'+travel'+'&key=AIzaSyDD9MbkIVSzT2a3sOv97OecaqhyGdF174c';

  if(checkInput(input)){
    searchYoutube(ytLink);
    searchBooks(booksLink);
  }

})
*/

// getting the video id of youtube videos from youtube api
function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json()
    .then(function (data) {
        console.log(data.items[0].id.videoId);
        var videoId = (data.items[0].id.videoId);
        console.log(videoId);
        var embededId= 'https://www.youtube.com/embed/'+videoId;
        videoPlayer.attr('src', embededId)

    })
  }); 
} 

// getApi(requestUrl);


function searchBooks(url){
  fetch(url)
  .then( function(response) {
    return response.json();
  })
  .then( function(data) {
    var results = data.items;
    for(var i=0; i < results.length; i++){
      var title = results[i].volumeInfo.title;
      
      var authorsArr = results[i].volumeInfo.authors;
      var authorsString = authorsArr[0];
      for(var j = 1; j < authorsArr.length; j++){
        authorsString += (", " + authorsArr[j] );
      }
      console.log(i+1 + '. "' + title + '" by ' + authorsString);
    }

  })
}

var key = `AIzaSyDWNMiooGhkXMAhnoTL8pudTR83im36YPo`;
var searchTerm = `mexico+travel+guide`;
var url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${key}`;
searchBooks(url);