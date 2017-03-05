var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// submit function to store values of user input in variables
$("#nySearch").submit(function(event){
  // prevents the default event from happening which would refresh the page
  event.preventDefault();
  // variables to store user input(jquery selector is selecting the elements through the form
  // and then through the child of whater input is required)
  var searchTerm = $("#nySearch > #searchTerm").val().trim();
  var numRecords = $("#nySearch > #records").val().trim();
  var startYear = $("#nySearch > #startYear").val().trim();
  var endYear = $("#nySearch > #endYear").val().trim();

  //creating a query object that will accept values based on the search fields(limit is set to 10 to prevent lag)
  let queryObj = {"api-key":'779454ee4ad24dddbb1701b6a9505e46', 'q': searchTerm, 'limit': 10};
  //this is a check for if the fields have values
  if(numRecords != "") { //not an empty string
    queryObj.page = numRecords;
  }
  if(startYear!= ""){
    queryObj.begin_date = startYear + '0101';//makes the dates valid to search the api(adds a month and year)
  }
  if(endYear != ""){
    queryObj.end_date = endYear+ '0101';
  }
// adds everything together to give the ajax call the full url required to get specific data
  url += '?' + $.param(queryObj);
//  ajax call to get response from NYT API\
  $.ajax({url: url, method:"GET"})
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

      // ===========url
      var url = res.docs[i].web_url;

      var urlA = $('<a>').text(url).attr('href', url).attr('target', '_blank');

      articleDiv.append(urlA);

      // =========over all attachment to HTML

      $('#articles').append(articleDiv);

    }
  });
})
// party area 
