// Collect the functions used to manipulate the KennelLog database

const chalk = require("chalk");
const connection = require("./connection.js");

const colors = [];                                 // The color codes used in this app
const groups = [];                                 // The animal function groups (cats, dogs, etc) used
const authority = [];                              // authority levels used in this app

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

var query = "select color_code from AnimalColors;";
connection.query (query, function (error, results)
{   if (error)
    {   // This could actually be a fatal error, and may require more than just throwing
        // the error.  But for now...
        throw error;
    }

    if (!results)
    {   // Just because the SQL didn't puke doesn't mean that nothing went wrong!  No results
        // from this SELECT is a problem.
        throw new Error ("INIT ERROR: No results from AnimalColors table");
    }

    if (results.length === 0)
    {   // Just because the SQL didn't puke doesn't mean that nothing went wrong!  No results
        // from this SELECT is a problem.
        throw new Error ("INIT ERROR: No results from AnimalColors table");
    }

    // We have successfully executed the query and we have results.  .push() those results into
    // colors[]

    var rLength = results.length;
    
    for (var i=0; i<rLength; i++)
    {   colors.push(results[i].color_code);
    }
});

var query = "select animal_group from AnimalGroups;";
connection.query (query, function (error, results)
{   if (error)
    {   // This could actually be a fatal error, and may require more than just throwing
        // the error.  But for now...
        throw error;
    }

    if (!results)
    {   // Just because the SQL didn't puke doesn't mean that nothing went wrong!  No results
        // from this SELECT is a problem.
        throw new Error ("INIT ERROR: No results from AnimalGroups table");
    }

    if (results.length === 0)
    {   // Just because the SQL didn't puke doesn't mean that nothing went wrong!  No results
        // from this SELECT is a problem.
        throw new Error ("INIT ERROR: No results from AnimalGroups table");
    }

    // We have successfully executed the query and we have results.  .push() those results into
    // groups[]

    var rLength = results.length;
    
    for (var i=0; i<rLength; i++)
    {   groups.push(results[i].animal_group);
    }
});

var query = "select auth_type from AuthorityTypes;";
connection.query (query, function (error, results)
{   if (error)
    {   // This could actually be a fatal error, and may require more than just throwing
        // the error.  But for now...
        throw error;
    }

    if (!results)
    {   // Just because the SQL didn't puke doesn't mean that nothing went wrong!  No results
        // from this SELECT is a problem.
        throw new Error ("INIT ERROR: No results from AuthorityTypes table");
    }

    if (results.length === 0)
    {   // Just because the SQL didn't puke doesn't mean that nothing went wrong!  No results
        // from this SELECT is a problem.
        throw new Error ("INIT ERROR: No results from AuthorityLevels table");
    }

    // We have successfully executed the query and we have results.  .push() those results into
    // authorities[]

    var rLength = results.length;
    
    for (var i=0; i<rLength; i++)
    {   authority.push(results[i].auth_level);
    }
});

const orm =
{   getColors: function ()
    {   // Return the list of colors codes used in this application
        return colors;
    },

    getGroups: function ()
    {   // Return the list of functional groups used in this application
        return groups;
    },

    getAuthority: function ()
    {   // Return the list of authority levels used in this application
        return authority;
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
