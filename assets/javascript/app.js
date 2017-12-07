//Globally defined variable

var animals = ["puppy", "dog", "cat", "kitten","walrus", "elephant"];

$(document).ready(function() {

$("#addGif").on("click", clickEventHandler);


//shows the animals already in the array
function showCurrentButtons() {
  $("#buttonsView").empty();

  for (var i = 0; i < animals.length; i++){
    var gifButton = $("<button>");
    gifButton.addClass("animal");
    gifButton.addClass("btn btn-primary");
    gifButton.attr("data-animal", animals[i]);
    gifButton.text(animals[i]);
    gifButton.on("click", animalButtonClick);
    $("#buttonsView").append(gifButton);

  }
}

//actually adds the button to the div

function renderButtons() {

  $("#buttonsView").empty();
        // Loops through the array
    for (var i = 0; i < animals.length; i++) {
      var a =$("<button>");
      a.attr("data-animal", animals[i]);
      a.text(animals[i]);
      a.on("click", animalButtonClick);
      $("#buttonsView").append(a);
    }
 
  console.log(animals);
}

// This function handles events where the add movie button is clicked

 function clickEventHandler(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var animal = $("#gifInput").val().trim();
    
  if(animal === ""){
    return false; //stops blank buttons
  }

  animals.push(animal);

  renderButtons();
};

function playOrStop(event) {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
  } else {
    $(this).attr("src", $(this).attr("data-still"));
  }
};

//Connects to the API to display gifs
//$(window).on('click', 'button', function)
function animalButtonClick (event){

  var animal = $(this).attr("data-animal");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=7hr69g7olKv0dv9Tnz7RTHzvd6ol8tI2&q=" +animal + "&limit=25&offset=0&rating=PG&lang=en";
console.log(queryURL);

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
        console.log(response)
          $("#gifs-appear-here").empty();

          var results = response.data;
          if (results == ""){
            alert("Sorry, no gifs for this button!");
          }

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv")

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + results[i].rating);
              gifDiv.append(rating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifImage.on("click", playOrStop);
            gifDiv.append(gifImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
      });
  };

showCurrentButtons();

});
  


      



