        var heroes = ["Superman", "Batman", "Spiderman"];
        
        function makeButtons() {
            $("#heroButtons").empty();
            for(var i=0; i<heroes.length; i++){
            var b = $("<button>");
            b.addClass("hero");
            b.addClass("btn btn-success");
            b.attr("data-sp", heroes[i]);
            b.text(heroes[i]);
            $("#heroButtons").append(b);
            }
        }
        makeButtons();
        
        $("#B1").on("click", function(event){
            
            event.preventDefault();
            var hero = $("#text1").val();
            heroes.push(hero);
            makeButtons();
            $("#heroes").empty();
        });

        function showGifs() {
            var hero = $(this).attr("data-sp");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
                url:queryURL,
                method: "GET"
            }).then(function(response){
                console.log(queryURL);
                console.log(response);

                var results = response.data;

                for (var i=0; i < results.length; i++){

                    var heroDiv= $("<div>");

                    heroDiv.attr('class', 'gif');

                    var p = $("<p>").html("Rating: " + results[i].rating);
                        
                    var heroImg = $("<img>");

                    heroImg.attr("src", results[i].images.fixed_height.url);

                    heroImg.attr("data-animate", results[i].images.fixed_height.url);

                    heroImg.attr("data-still", results[i].images.fixed_height_still.url);

                    heroImg.attr("data-state", "animate");

                    heroImg.attr("class", "imgGif");

                    heroDiv.append(p);

                    heroDiv.append(heroImg);

                    $("#heroes").append(heroDiv);

                    $(".hero").on("click", function(){
                        $("#heroes").empty();
            
                    });
                    

                }
            click();


            })

        }
       

        function click() {
            $(".gif").on("click", '.imgGif', function() {
                // alert("hello");
                var state = $(this).attr("data-state");
                // console.log(state);
    
                if (state === "animate") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                } else {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }
                console.log('hi');
            });
        }

        $(document).on("click", ".hero", showGifs);