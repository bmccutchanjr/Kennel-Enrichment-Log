// Kennel Enrichment Log

var tableData = {};

function enrichmentTable (data)
{   // This function is formats data received from the api for display on the screen.  It is called by
    // getAll(), which in turn is called when the page first loads, or when the page receives a push
    // notification from the server.

    $("#enrichment-table").empty();

    var dLength = data.length;
    for (var i=0; i<dLength; i++)
    {
        var animalDiv = $("<div>");

        var nameDiv = $("<div>");
        nameDiv
            // .addClass("et-name")
            .addClass("table-name")
            .text (data[i].animal);

        var colorDiv = $("<div>");
        colorDiv
            // .addClass("et-color")
            .addClass("table-color")
            .text (data[i].color_code);
            
        var cageDiv = $("<div>");
        cageDiv
            // .addClass("et-cage")
            .addClass("table-cage")
            .text (data[i].cage);
                
        animalDiv
            .append(nameDiv)
            .append(colorDiv)
            .append(cageDiv);
            
        for (var j=0; j<28; j++)
        {   var insideDiv = $("<div>");
            insideDiv
                .addClass("et-day-inside")
                .text("x");

            var weekClass = "week-four";

            if (j < 21) weekClass = "week-three";
            if (j < 14) weekClass = "week-two";
            if (j < 7) weekClass = "week-one";
        
            var detailDiv = $("<div>");
            detailDiv
                // .addClass("et-day " + weekClass)
                .addClass("table-day " + weekClass)
                .append(insideDiv);
            
            animalDiv.append(detailDiv);
        }
            
        var colorClass = data[i].color_code + "-theme";

        animalDiv
            .addClass ("animal-row " + colorClass);
            
        $("#enrichment-table")
            .append(animalDiv);
    }
}

function sortByCalendar ()
{   // I don't have the data to implement this right now...

    enrichmentTable (tableData);
}

function sortByColor ()
{
    tableData.sort(function(a, b)
    {
        const colorOrder = ["green", "orange", "blue", "purple", "red", "black"];
        var aCompare = colorOrder.indexOf (a.color_code) + a.animal;
        var bCompare = colorOrder.indexOf (b.color_code) + b.animal;

        if (aCompare < bCompare)
            return -1;
        if (aCompare > bCompare)
            return 1;
        return 0;
    })

    enrichmentTable (tableData);
}

function sortByName ()
{
    tableData.sort(function(a, b)
    {
        if (a.animal < b.animal)
            return -1;
        if (a.animal > b.animal)
            return 1;
        return 0;
    })

    enrichmentTable (tableData);
}

function getAnimals (animalGroup = "dogs")
{   // Get the list os animals to include on the screen

    $.get("/api/animals/allactive/" + animalGroup)
    .then (function(results)
    {   
        enrichmentTable (results);
        tableData = results;
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

$(document).ready(function()
{   
    var cookie = document.cookie;

    getAnimals (cookie["animal-cookie"]);

    $(".sort-by-calendar").click(function(event)
    {   event.preventDefault();

    })

    $(".sort-by-color").click(function()
    {   event.preventDefault();
        sortByColor();        
    })

    $(".sort-by-name").click(function()
    {   event.preventDefault();
        sortByName();        
    })
})