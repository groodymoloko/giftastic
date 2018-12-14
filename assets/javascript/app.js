// Initial array of plants
var plants = ["cacti", "trees", "flowers", "marijuana"];

// displayPlantInfo function re-renders the HTML to display the appropriate content
function displayPlantInfo() {

  var plant = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + plant + "&apikey=x0LgLZIX4T9duY5Wu3ZllliSbezt15IS&limit=10";

  // Creating an AJAX call for the specific plant button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      //looping through i number of gifs to grab info and still pictures
      for(var i = 0; i < 10; i++) {
        console.log(response);

        // Creating a div to hold the plant
        var plantDiv = $("<div class='plant'>");

        // Storing the rating data
        var rating = response.data[i].rating;

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text(" Rating: " + rating);

        // Displaying the rating
        plantDiv.append(pOne);

        // Retrieving the URL for the still image
        var imgURL = response.data[i].images.fixed_height_still.url;
        var dataStill = imgURL;
        
        //Retrieving the URL for the animated image
        var animateURL = response.data[i].images.fixed_height.url;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL).attr("data-state", "still").attr("class", "plantImage").attr("data-animate", animateURL).attr("data-still", dataStill);

        // Appending the image
        plantDiv.append(image);

        // Putting the plant above the previous plants
        $("#plant-view").prepend(plantDiv);
      }
    });
}

// Function for displaying plant data
function renderButtons() {

  // Deleting the plants prior to adding new plants
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of plants
  for (var i = 0; i < plants.length; i++) {


    // Then dynamically generating buttons for each plant in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a boostrap button class and unique class to our buttons
    a.addClass("btn btn-outline-success my-2 my-sm-0 plant-style");
    a.addClass("plant-style");
    // Adding a data-attribute
    a.attr("data-name", plants[i]);
    // Providing the initial button text
    a.text(plants[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

//This function animates or stops the gifs when clicked
$(document).on("click", ".plantImage", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  console.log(state);
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

// This function handles events where a plant button is clicked
$("#add-plant").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var plant = $("#plant-input").val().trim();

  // Adding plant from the textbox to our array
  plants.push(plant);

  // Calling renderButtons which handles the processing of our plant array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "plant-style"
$(document).on("click", ".plant-style", displayPlantInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();