// This middleware collects the functions used to manipulate the KennelLog database

// Require the dependencies
const chalk = require("chalk");
const connection = require("./connection.js");

const colorCodes = [];              // color codes used in this app
const animalGroups = [];            // animal groups (cats, dogs, etc)
const userTypes = [];               // types of people using the application

function select (query)
{   // Generic handler for SQL SELECT.

    connection.query (query, function (error, results)
    {   if (error)
        {   // This could actually be a fatal error, and may require more than just throwing
            // the error.  But for now...
            throw error;
        }
        return (results);
    })
}

// Get a list of various values (animal groups, color codes and user types) used in the application.
// These arrays are used to validate data input and help ensure integrity of the daabase.  There was
// a time when these were actual FOREIGN KEY CONSTRAINTS in the database, but there isn't really a
// logical relationship between colors and animals (colors are a "property" of animals and not a 
// parent).  I was going to use them server-side in the modules, but I may even need to create a route
// in api.js so the browser can request them as well.

var query = "select color_code from AnimalColors;";
connection.query (query, function (error, results)
{   if (error)
    {   // This could actually be a fatal error, and may require more than just throwing
        // the error.  But for now...
        throw error;
    }

    var rLen = results.length;

    if (!results || rLen === 0)
    {   // Just because the SQL didn't puke doesn't mean that nothing went wrong!  No results
        // from this SELECT is a problem.

        // throw an error
        throw new Error ("INIT ERROR: No results from AnimalColors table");
    }

    // We have successfully executed the query and we have results.  .push() those results into
    // colors[]

    for (var i=0; i<rLen; i++)
    {   colorCodes.push(results[i].color_code);
    }
});

var query = "select animal_group from AnimalGroups;";
connection.query (query, function (error, results)
{   if (error)
    {   // This could actually be a fatal error, and may require more than just throwing
        // the error.  But for now...
        throw error;
    }

    var rLen = results.length;
    
    if (!results || rLen === 0)
    {   // Just because the SQL didn't puke doesn't mean that nothing went wrong!  No results
        // from this SELECT is a problem.

        // throw an error
        throw new Error ("INIT ERROR: No results from AnimalGroups table");
    }

    // We have successfully executed the query and we have results.  .push() those results into
    // groups[]

    for (var i=0; i<rLen; i++)
    {   animalGroups.push(results[i].animal_group);
    }
});

var query = "select user_type from UserTypes;";
connection.query (query, function (error, results)
{   if (error)
    {   // This could actually be a fatal error, and may require more than just throwing
        // the error.  But for now...
        throw error;
    }

    var rLen = results.length;
    
    if (!results || rLen === 0)
    {   // Just because the SQL didn't puke doesn't mean that nothing went wrong!  No results
        // from this SELECT is a problem.

        // throw an error
        throw new Error ("INIT ERROR: No results from UserTypes table");
    }

    // We have successfully executed the query and we have results.  .push() those results into
    // authorities[]

    for (var i=0; i<rLen; i++)
    {   userTypes.push(results[i].user_type);
    }
});

const orm =
{   getColorCodes: function ()
    {   // Return the list of colors codes used in this application
        return colorCodes;
    },

    getAnimalGroups: function ()
    {   // Return the list of functional groups used in this application
        return animalGroups;
    },

    getUserTypes: function ()
    {   // Return the list of authority levels used in this application
        return userTypes;
    },

    select: function (query, where, callback)
    {
        connection.query (query, where, function (error, results)
        {   if (error)
            {   console.log(error);
                callback (500, "An unspecified error occured on the server.  Please contact " +
                               "your IT support staff.");
            }
            else
                callback (200, results);
        })
    }
}

module.exports = orm;
