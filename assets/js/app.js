//Psuedocode
//Top of the page has buttons with city names. -- append buttons to the page upon search.

//Upon click, the page fills with 10 GIFS that relate to the city. --search the Giphy API to find the GIFS related to the city. -- search function, use limit in the search query.

//Each GIF has a rating associated with it that is displayed. GIFs are displayed as still pictures until the user clicks the image. -- clickImage function

//When user clicks another button, the page is cleared prior to the new GIFs being displayed. --.hide or .empty function

//Users can also add a button to the row by using the form to add a new location.

//cities = tokyo, rome, new york, denver, vancouver, barcelona, johannesburg, melbourne, berlin, dubai
$(document).ready(function () {

    var cities = ["London", "Tokyo", "Rome", "New York", "Denver", "Vancouver", "Barcelona", "Melbourne", "Berlin", "Dubai"]
    // var currentGif;
    // var pausedGif;
    // var animatedGif;
    // var stillGif;

    //create buttons
    function createButtons() {
        $("#button-row").empty();
        for (var i = 0; i < cities.length; i++) {
            var newButton = $("<button>");
            newButton.attr("class", "btn btn-primary button");
            newButton.attr("id", "input");
            newButton.attr("data-name", cities[i]);
            newButton.text(cities[i]);
            $("#button-row").append(newButton);

        }
    }
    $("#addLocation").on("click", function (event) {
        event.preventDefault();
        var newLocation = $("#newLocationInput").val().trim();

        //change user input to title case

        cities.push(newLocation.charAt(0).toUpperCase() + newLocation.slice(1).toLowerCase());

        // cities.push(newLocation);
        console.log(newLocation);

        createButtons();
    })

    function displayImg() {
        $(".display").empty();
        var input = $(this).attr("data-name");

        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            for (var j = 0; j < limit; j++) {

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");

                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif img-thumbnail");
                displayDiv.append(image);

                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating);

                $(".display").append(displayDiv);

            }
        })
    }

    function imageAnimate() {
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageAnimate);
    createButtons();

});