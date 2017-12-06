//Globally defined variable

var animals = ["puppy", "dog", "cat", "kitten"];

/*This was from the button activity where we added a button buy just adding to html. 
*/


$("button").on("click", function() {
  var animal = $(this).attr("data-animal");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=7hr69g7olKv0dv9Tnz7RTHzvd6ol8tI2&q=" +
        animal + "&limit=25&offset=0&rating=PG&lang=en";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + results[i].rating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });


/*      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {

        var movie = $(this).attr("data-name");
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        });

      }*/


function renderButtons() {

// Deletes the deletes animal prior to adding and stops repeat buttons)
  $("#buttonsView").empty();
        // Loops through the array
    for (var i = 0; i < animals.length; i++) {
      var a =$("<button>");
      a.attr("data-animal", animals[i])
      a.text(animals[i])
      $("#buttonsView").append(a);
    }
 
  console.log(animals);
}

      
// This function handles events where the add movie button is clicked


$("#addGif").on("click", function(event) {
  event.preventDefault();
    // This line of code will grab the input from the textbox
    var animal = $("#gifInput").val().trim();
      animals.push(animal);
        renderButtons();
     });

/*giphy API Key:7hr69g7olKv0dv9Tnz7RTHzvd6ol8tI2 */

