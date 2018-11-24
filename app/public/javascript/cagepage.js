var animalData = [];
var peopleData = [];

function getAnimals (animalGroup = "dogs")
{   // Get all active volunteers allowed to interact with the selected animal group

    $.get ("/api/animals/allactive/" + animalGroup)
    .then (function(results)
    {   
        var aList = $("#animal-list");

        for (var i=0; i<results.length; i++)
        {
            var option = $("<option>");
            option
                .addClass("animal-options")
                .text(results[i].animal);

            aList.append (option);
        }

        animalData = results
    })
    .catch (function(error)
    {   // An error occured, let the users know.

        // This error handling is not quite complete.  It assumes the error happened on the server and
        // is responding in kind, but the error could be (probably is not) a run time error in this script.
        // In the latter case, there isn't enough information here to trouble shoot it.  You need to open
        // the console to see a more detailed error.

        if (error.responseText)
            $(".server-message").text(error.responseText)
        else
            $(".server-message")
            .text("An unspecified run time error occured in this script.  Please contact " +
                  "your IT staff for support.  More details may be available on the console.");

        $(".message-wrapper").css("display", "block");
    })
}

function getPeople (animalGroup = "dogs")
{   // Get all active volunteers allowed to interact with the selected animal group

    $.get ("/api/people/allactive/" + animalGroup)
    .then (function(results)
    {   
        var pList = $("#people-list");

        for (var i=0; i<results.length; i++)
        {
            var option = $("<option>");
            option
                .addClass("people-options")
                .text(results[i].surname + ", " + results[i].given);

            pList.append (option);
        }
    })
    .catch (function(error)
    {   // An error occured, let the users know.

        // This error handling is not quite complete.  It assumes the error happened on the server and
        // is responding in kind, but the error could be (probably is not) a run time error in this script.
        // In the latter case, there isn't enough information here to trouble shoot it.  You need to open
        // the console to see a more detailed error.

        if (error.responseText)
            $(".server-message").text(error.responseText)
        else
            $(".server-message")
            .text("An unspecified run time error occured in this script.  Please contact " +
                  "your IT staff for support.  More details may be available on the console.");

        $(".message-wrapper").css("display", "block");
    })
}

$(document).ready (function()
{
    var cookie = document.cookie;

    getAnimals (cookie["animal-cookie"]);

    getPeople (cookie["animal-cookie"]);

    $("#select-animals").change(function(event)
    {
        var selected = $("#select-animals option:selected").val();
        var animal = animalData.find(function(data)
        {
            return data.id == selected;
        })
        $("body").css("background", animal.color_code)
    })

    $("#reasons").click(function(event)
    {   event.preventDefault ();

alert("reasons clicked");
    })

    $("#signout").click(function(event)
    {   event.preventDefault ();

alert("signout clicked");
    })
})