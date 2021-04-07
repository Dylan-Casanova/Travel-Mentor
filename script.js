//getting input from text input and getting input
var searchBox = $('#textarea1');
M.textareaAutoResize($('#textarea1'));

// search query
var searchQ = ''
// function to get each key press and return it to the string
function keyPress(){
  
  var keyNum;
  
  $(searchBox).on("keypress" , function(e){
    
    keyNum = e.keyCode;
    keylet = String.fromCharCode(keyNum)
    keylet.concat(searchQ)

    console.log(keylet)
    
  })
}

var searchBtn = $('#searchBtn')

function searchFun(searchQ){
  
}

searchBtn.on('click' , searchFun() )

keyPress()

// declearing variables to use in fuctions and loops

// var key ='AIzaSyDD9MbkIVSzT2a3sOv97OecaqhyGdF174c';
var videoPlayer= $('#iframe');

var searchBoxEl = $('#searchBox');
var bookListEl = $('#bookList');
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
    console.log(data);
    var results = data.items;
    var booksArr = [];
    var titlesArr = [];
    var authorsStringArr = [];
    for(var i=0; i < 4; i++){
      var title = results[i].volumeInfo.title;
      
      var authorsArr = results[i].volumeInfo.authors;
      console.log(authorsArr);
      // put first author in string
      var authorsString = authorsArr[0];
      // add remaining authors (if any) to string
      for(var j = 1; j < authorsArr.length; j++){
        authorsString += (", " + authorsArr[j] );
      }
      // put string in arrays
      booksArr[i] = '"' + title + '" by ' + authorsString;
      titlesArr[i] = title;
      authorsStringArr[i] = authorsString;
    }

    // populate the list of books
    for(var i=0; i < 5 && i < booksArr.length; i++){
      // make elements
      var item = document.createElement('li');
      var linkEl = document.createElement('a');
      var divEl = document.createElement('div');
      var bookThumbnail = document.createElement('img');
      var textDivEl = document.createElement('div');
      var titleEl = document.createElement('p');
      var authorEl = document.createElement('p');
      
      // chain them together
      $(item).append(linkEl);
      $(linkEl).append(divEl);
      $(divEl).append(bookThumbnail, textDivEl)
      $(textDivEl).append(titleEl, authorEl);

      // assign img src for thumbnail
      $(bookThumbnail).attr('src', results[i].volumeInfo.imageLinks.smallThumbnail);
      // set title/author text
      $(titleEl).text(titlesArr[i]);
      $(titleEl).addClass('title');
      $(authorEl).text(authorsStringArr[i]);
      $(authorEl).addClass('author');
      // set other classes
      $(divEl).addClass('listItemContent');
      $(textDivEl).addClass('listText');
      // set link attributes to open in new tab
      $(linkEl).attr({
        href: results[i].volumeInfo.infoLink,
        target: '_blank',
        rel: 'noopener noreferrer'
      });
      $(item).addClass('collection-item');

      $(bookListEl).append(item);


     

    }
  })
}

var key = `AIzaSyDWNMiooGhkXMAhnoTL8pudTR83im36YPo`;
var searchTerm = `mexico+travel+guide`;
var url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${key}`;
searchBooks(url);
