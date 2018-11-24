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
                .attr("id", results[i].id)
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

    $("#select-people").change(function(event)
    {   event.preventDefault();

        $(this).attr("disabled", true);
    })

    $("#select-animal").focus(function(event)
    {   event.preventDefault();

        $("#select-animal").val("");
    })

    $("#select-animal").change(function(event)
    {   event.preventDefault();

        var name = $("#select-animal").val().trim();

        var animal = animalData.find(function(data)
        {   return data.animal == name;
        })

        $("body").css("background", animal.color_code)
        $("#reasons").css("display", "inline")
        $("#signout").css("display", "inline")
        $("#public-notes").css("display", "none");
        $("#color-notes").css("display", "none");
    })

    $("#color-notes").click(function(event)
    {   event.preventDefault ();

        // This button should not de displayed until an animal has been returned to its cage

alert("#color-notes clicked");

        // COLOR NOTES should only display if the animal has been assigned a color code of "purple"
        // or "black".  These notes differ somewhat, so I suppose they need separate pages.
    })

    $("#public-notes").click(function(event)
    {   event.preventDefault ();

        // This button should not de displayed until an animal has been returned to its cage

alert("public-notes clicked");
    })

    $("#reasons").click(function(event)
    {   event.preventDefault ();

        // This button should not de displayed until an animal has been selected

alert("reasons clicked");
        // Retrieve and display the reasons the staff has assigned this color code to this animal.  This
        // will be displayed as a modal dialog on cagepage, and needs a button to close the dialog.
    })

    $("#signout").click(function(event)
    {   event.preventDefault ();

        // This button should not de displayed until an animal has been selected

alert("signout clicked");

        var button = $("#signout");

        // When the page first loads, this button should read SIGN OUT.  Its itended function is to create
        // a record in the EnrichmentSession table with the name of the person and the animal.  At that time,
        // the text of the button should be changed to SIGN BACK IN.

        if (button.attr("function") === "sign out")
        {   // Verify the volunteer is approved to handle this animal

            // and if okay, submit a POST to create an EnrichmentSession record

            // and if that is successful, reconfigure the screen
            // $("#select-people").attr("disabled", true)
            $("#select-animal").attr("disabled", true)

            button
                .attr("function", "sign in")
                .text("BACK IN CAGE");

            // $("#reasons").css("display", "none");
            // $("#public-notes").css("display", "inline");
            // $("#color-notes").css("display", "inline");
        }
        else
        {   // submit a PUT to update and close out the EnrichmentSession

            // and if that is successful, reconfigure the screen.
            // $("#select-people").attr("disabled", false)
            $("#select-animal").attr("disabled", false)

            button
                .attr("function", "sign out")
                .text("SIGN OUT OF CAGE");

            $("#signout").css("display", "none");
            $("#reasons").css("display", "none");
            $("#public-notes").css("display", "inline");
            $("#color-notes").css("display", "inline");
        }
        //
        // When the button text is SIGN BACK IN, the button should update the EnrichmentSession record created
        // above with the time the animal was returned to its cage.  It should also cause two additional buttons
        // to appear on the screen, NOTES FOR ADOPTERS and COLOR NOTES (COLOR NOTES should actually only appear
        // if the animal's color code is "purple" or "black").
        //
        // NOTES FOR THE PUBLIC are intended for the public -- potential adopters.  COLOR NOTES are for internal
        // use, notes on how the aniaml behaved and are for staff and volunteers.  I guess I need some way to
        // access these notes as well.  NOTES FOR THE PUBLIC may be problematic as the public doesn't have
        // access to this application.
    })
})