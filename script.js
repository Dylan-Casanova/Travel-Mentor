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
        var outcome = (data.items);
        console.log(outcome);
        // created an array to stored the incoming data and use it later
        var youtubeIdArr = []
        // for loop to get the video id from the data that the above function renders
        for (var i=0; i < 6; i++){
          var youtubeId = outcome[i].id.videoId;
          youtubeIdArr[i]= youtubeId;
        }
        console.log(youtubeIdArr)
        // variable to add videoId to the youtube embeded link
        var embededId= 'https://www.youtube.com/embed/'+youtubeId;
        console.log(embededId)
        // creating for loop to populate video's list
        for (var d=0; d < 6 && d < youtubeIdArr.length; d++){
        var entry =document.createElement('li');
        var display =document.createElement('iframe');
        $(entry).append(display);
        $(videoListEl).append(entry);
    }})
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
      $(favButtonEl).addClass('far fa-heart');
      // set link attributes to open in new tab
      $(linkEl).attr({
        href: results[i].volumeInfo.infoLink,
        target: '_blank',
        rel: 'noopener noreferrer'
      });
      $(item).addClass('collection-item');

      $(bookListEl).append(item);

      $(favButtonEl).click( function(event){
        event.preventDefault();
        if($(event.target).hasClass('far')){
          $(event.target).addClass('fas');
          $(event.target).removeClass('far');
        }
        else {
          $(event.target).addClass('far');
          $(event.target).removeClass('fas');
        }
      })

     

    }
  })
}

var key = `AIzaSyDWNMiooGhkXMAhnoTL8pudTR83im36YPo`;
var searchTerm = `mexico+travel+guide`;
var url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${key}`;
searchBooks(url);
