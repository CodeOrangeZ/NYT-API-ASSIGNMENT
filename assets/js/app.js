// variables to store api url and auth key, these are going to be global so they can be used later.
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

$("#nySearch").submit(function(event){
  event.preventDefault();
  var searchTerm = $("#nySearch > #searchTerm").val();
  var numRecords = $("#nySearch > #records").val();
  var startYear = $("#nySearch > #startYear").val();
  var endYear = $("#nySearch > #endYear").val();

  //creating a query object that will accept values based on fields
  let queryObj = {"api-key":authKey, q: searchTerm, limit: 10};
  //this is a check for if the fields have values
  if(numRecords != "") { //not an empty string
    queryObj.page = numRecords;
  }
  if(startYear!= ""){
    queryObj.begin_date = startYear + 0101;
  }
  if(endYear != ""){
    queryObj.end_date = endYear+ 0101;
  }
  queryURLBase += $.param(queryObj);

  $.ajax({url: queryURLBase, method:"GET"})
  .done((response) => {
    console.log(response);


    var res = response.response;
    // for loop that allows us to return as many values as we need to print specified by user input
    for(var i = 0; i < numRecords; i++){

      // ========= articleDiv

      var articleDiv = $("<div class='newarticles'>");

      // =========headline

      var headline = res.docs[i].headline.main;

      var headlineP = $("<h1 class='newH1'>").text(headline);

      articleDiv.append(headlineP);

      // =========author

      var author = res.docs[i].byline.original;

      var authorP = $("<p>").text(author);

      articleDiv.append(authorP);

      // ==========section

      var section = res.docs[i].source;

      var sectionP = $("<p>").text("Section: " +section)

      articleDiv.append(sectionP);

      // ==========date

      var date = res.docs[i].pub_date;

      var dateP = $("<p>").text(date);

      articleDiv.append(dateP);

      // ===========url
      var url = res.docs[i].web_url;

      var urlP = $('<a>').text(url).attr('href', url);

      articleDiv.append(urlP);

      // =========over all attachment to HTML

      $('#articles').append(articleDiv);

    }
  });
})
