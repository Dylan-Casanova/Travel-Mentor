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

getApi(requestUrl);


