var topics = ["Happy", "Excited", "Sad", "Scared", "Bored"];

for (var i = 0; i < topics.length; i++) {
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode(topics[i]);
    btn.setAttribute("data-emotion", topics[i]);
    btn.appendChild(t);
    document.getElementById("buttonDiv").appendChild(btn);
};

$("#addEmotion").on("click", function() {
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode($("#emotion-input").val());
    btn.setAttribute("data-emotion", $("#emotion-input").val());
    topics.push($("#emotion-input").val())
    btn.appendChild(t);
    document.getElementById("buttonDiv").appendChild(btn);
})

$("button").on("click", function() {
    $("#gifs-appear-here").empty();
    var emotion = $(this).attr("data-emotion");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=RW1QyuECq4Fnm5ipPnUpI8aBL2iFPSMF&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function(response) {
        console.log(queryURL);

        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var emotionDiv = $("#gifs-appear-here");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var emotionImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            emotionImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the emotionDiv
            emotionDiv.append(p);
            emotionDiv.append(emotionImage);
        }
        });
    });

