// Collect the functions used to manipulate the KennelLog

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
console.log("select()");
console.log("results:\n", results);
console.log(typeof results);
        return (results);
    })
}

// Get initial values used throughout the application from the database.
//      Color Codes
//      Animal Groups
//      Authority Levels
//
// Since I have been volunteering at the shelter, both color codes and animal groups have changed, so I
// chose to store these values in the database.  Mostly these values are used to validate input, and I
// could just use SELECT query in the WHERE clause to do the same thing but it seems more appropriate
// to be able to catch invalid input before trying to update the database with invalid data.

// const data = new Promise (function (resolve, reject)
// {   var results = select("select color from colors;");
// console.log ("results:", results);
// console.log (typeof results);
//     // resolve (results);
// })
// .then (function (data)
// {
// console.log ("data:", data);
// console.log (typeof data);
//     var dLength = data.length;
//     if (!dLength)
//     {   // Just because the SQL didn't puke doesn't mean that nothing went wrong!  No results
//         // from this SELECT is a problem.
//         throw new Error ("INIT ERROR: No results from Colors table");
//     }
//     else
//     {   // We have successfully executed the query and we have results.  .push() those results into
//         // colors[]
//         for (var i=0; i<dLength; i++)
//         {   colors.push(data[0].color);
// console.log(chalk.yellow(colors));
//         }
//     }
    
//     var results = self.select("select type from groups;");
//     resolve (results);
// })
// .then(function (data)
// {
//     var rLength = results.length;
//     if (!rLength)
//     {   // Just because the SQL didn't puke doesn't mean that nothing went wrong!  No results
//         // from this SELECT is a problem.
//         throw new Error ("INIT ERROR: No results from Groups table");
//     }
//     else
//     {   // We have successfully executed the query and we have results.  .push() those results into
//         // colors[]
//         for (var i=0; i<rLength; i++)
//         {   groups.push(results[0].type);
// console.log(chalk.yellow(groups));
//         }
//     }
    
//     var results = self.select("select level from AuthorityLevels;");
//     resolve (results);
// })
// .then(function (data)
// {
//     var rLength = results.length;
//     if (!rLength)
//     {   // Just because the SQL didn't puke doesn't mean that nothing went wrong!  No results
//         // from this SELECT is a problem.
//         throw new Error ("INIT ERROR: No results from AuthorityLevels table");
//     }
//     else
//     {   // We have successfully executed the query and we have results.  .push() those results into
//         // colors[]
//         for (var i=0; i<rLength; i++)
//         {   authority.push(results[0].level);
// console.log(chalk.yellow(authority));
//         }
//     }
// })
// .catch (function (error)
// {   // Some error occured somewhere in this chain.  An error getting data from these files or
//     // no data returned is a problem for the app.  Throw the error

//     throw error;
// });

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

var query = "select auth_level from AuthorityLevels;";
connection.query (query, function (error, results)
{   if (error)
    {   // This could actually be a fatal error, and may require more than just throwing
        // the error.  But for now...
        throw error;
    }

    if (!results)
    {   // Just because the SQL didn't puke doesn't mean that nothing went wrong!  No results
        // from this SELECT is a problem.
        throw new Error ("INIT ERROR: No results from AuthorityLevels table");
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
    }
}

module.exports = orm;
