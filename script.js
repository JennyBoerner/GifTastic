var topics = ["Cheerful", "Excited", "Somber", "Scared", "Bored"];

// Add buttons to page
function addButtons() {
    $("#buttonDiv").empty();
    for (var i = 0; i < topics.length; i++) {
    var btn = $("<button>");
    btn.text(topics[i]);
    btn.attr("data-emotion", topics[i]);
   $("#buttonDiv").append(btn);
    }
};

// Display buttons to page
addButtons();

// Add new search text to the array and create all new buttons
$("#addEmotion").on("click", function() {
    var newbtn = $("#emotion-input").val();
    topics.push(newbtn);
    addButtons();
})

// Display the gif on click of the button
$("button").on("click", function() {
    $("#gifs-appear-here").empty();
    var emotion = $(this).attr("data-emotion");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=RW1QyuECq4Fnm5ipPnUpI8aBL2iFPSMF&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
    console.log(queryURL);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
        var emotionDiv = $("#gifs-appear-here");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var emotionImage = $("<img>");
        emotionImage.attr("src", results[i].images.fixed_height_still.url);
        emotionImage.attr("data-still", results[i].images.fixed_height_still.url);
        emotionImage.attr("data-animate", results[i].images.fixed_height.url);
        emotionImage.attr("data-state", "still");
        emotionImage.addClass("gif");
        emotionDiv.append(p);
        emotionDiv.append(emotionImage);
        }
    });
});

// Display the animiated version or the still version on click
$(document).on("click",".gif",function(){
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

