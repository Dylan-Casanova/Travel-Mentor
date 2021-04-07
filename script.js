// declearing variables to use in fuctions and loops
var videoPlayer= $('#iframe');
var searchBoxEl = $('#searchBox');
var bookListEl = $('#bookList');
var videoListEl = $('#videoList');

// getting the video id of youtube videos from youtube api
function searchVideos(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
        var outcome = (data.items);
        console.log(outcome);
        // for loop to get the video id from the data that the above function renders
        for (var i=0; i < 6; i++){
          var youtubeId = outcome[i].id.videoId;
          console.log(youtubeId);
        }
        // variable to add videoId to the youtube embeded link
        var embededId= 'https://www.youtube.com/embed/'+youtubeId;
        console.log(embededId)
        // videoPlayer.attr('src', embededId)
    })
  }; 
 
var requestUrl ='https://youtube.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=25&q='+input+'+travel'+'&key=AIzaSyDD9MbkIVSzT2a3sOv97OecaqhyGdF174c';
  var input = "mexico"
searchVideos(requestUrl);


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
    for(var i=0; i < 6; i++){
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
    for(var i=0; i < 6 && i < booksArr.length; i++){
      // make elements
      var item = document.createElement('li');
      var linkEl = document.createElement('a');
      var divEl = document.createElement('div');
      var bookThumbnail = document.createElement('img');
      var textDivEl = document.createElement('div');
      var titleEl = document.createElement('p');
      var authorEl = document.createElement('p');
      var favButtonEl = document.createElement('i');
      
      // chain them together
      $(item).append(linkEl);
      $(linkEl).append(divEl);
      $(divEl).append(bookThumbnail, textDivEl, favButtonEl);
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
      $(favButtonEl).addClass('far fa-plus-square');
      // set link attributes to open in new tab
      $(linkEl).attr({
        href: results[i].volumeInfo.infoLink,
        target: '_blank',
        rel: 'noopener noreferrer'
      });
      $(item).addClass('collection-item');
      
      // append the list item
      $(bookListEl).append(item);
      // add to favorites when the button is clicked
      $(favButtonEl).click( addToFavorites );

     

    }
  })
}



function addToFavorites(event) {
  event.preventDefault();
  // only add if not already in
  if($(event.target).hasClass('fa-plus-square')){
    // make the heart icon solid color
    $(event.target).addClass('fa-check-square');
    $(event.target).removeClass('fa-plus-square');
    // target the item associated with the button
    var item = $(event.target).closest('li');
    // copy it and append it the favs list
    var favItem = $(item).clone().prependTo('#favsList');
    // change the icon to a trash can
    var newIcon = $(favItem).find('i');
    $(newIcon).removeClass('fa-check-square').addClass('fa-trash-alt');
    // remove item upon clicking trash icon
    $(newIcon).click( removeFromFavorites );
  }
  
}

function removeFromFavorites(event) {
  event.preventDefault();
  var item = $(event.target).closest('li');
  $(item).remove();
}

var key = `AIzaSyDWNMiooGhkXMAhnoTL8pudTR83im36YPo`;
var searchTerm = `mexico+travel+guide`;
var url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${key}`;
searchBooks(url);
