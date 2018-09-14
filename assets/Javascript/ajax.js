
var topics = ["Charizard", "Mewtwo", "Blastoise", "Mew", "Dragonite", "Arcanine", "Lugia", "Gyarados", "Alakazam", "Zapdos", "Scyther", "Haunter", "Snorlax"];
var userTopics = $("#topicInput");



$(document).ready(function () {

    for (i = 0; i < topics.length; i++) {
     
        $("#topicButtons").append(`<button id="${topics[i]}" class="topicButtons">${topics[i]}</button>`)
    }


    $("#submitButton").click(userInput)

    function userInput (e) {
        e.preventDefault();

      
        if (topics.indexOf(userTopics.val()) === -1) {
            topics.push(userTopics.val())
            $("#topicButtons").append(`<button id="${userTopics.val()}" class="topicButtons">${userTopics.val()}</button>`)
  
        }

    }



    $(document).on('click', '.topicButtons', function(event) {
        $("#topicGIFs").empty()

    
     var pokemon = $(this).attr("id");

    
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
       pokemon + "+pokemon&api_key=dc6zaTOxFJmzC&limit=10";

    
        $.ajax({
            url: queryURL,
            method: "GET",
          }).then(function(response) {
            console.log(response)

            for (var i = 0; i < response.data.length; i++) {
                $("#topicGIFs").append(`<div class="gifDivs"><p>Rating: ${response.data[i].rating}</p><img src='${response.data[i].images.fixed_height_still.url}' data-still='${response.data[i].images.fixed_height_still.url}' data-animate='${response.data[i].images.fixed_height.url}' data-state='still' width='200px' height='200px' class='GIFs'></div>`)
            }


            $(".GIFs").on("click", function() {
                var state = $(this).attr("data-state");
    
                if (state === "still") {
                  var animateURL = $(this).attr("data-animate")
                  $(this).attr("src", animateURL);
                  $(this).attr("data-state", "animate");
                } 

                else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
            })

        })

    })

});