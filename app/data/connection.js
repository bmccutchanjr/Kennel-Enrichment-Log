// This middleware is used to connect to (and maybe in the future) manage the connection to the MySQL
// database

// Require the dependencies
const chalk = require("chalk");
const mysql = require("mysql");

// declare the connection variable
var connection;

if (process.env.JAWSDB_URL)
{   // If this application is running in a Heroku ????, the information required to connect to the
    // database is in an environment variable called JAWSDB_URL.  Use that information to connect
    // to the database.

    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else
{   // If the environment variable JAWSDB_URL does not exist, the application is running locally.
    // Need to provide information to connect to the database.

    connection = mysql.createConnection(
    {   server:     "localhost",
        port:       3306,
        user:       "root",
        password:   "root",
        database:   "KennelLog"    
    });
}

connection.connect (function (error)
{   // And finally, establish the connection to the MySQL database

    if (error) throw error;

    console.log (chalk.green("Connected to KennelLog as", connection.threadId));
});

module.exports = connection;