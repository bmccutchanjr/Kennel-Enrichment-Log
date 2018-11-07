// Connect to the MySQL database
const chalk = require("chalk");
const mysql = require("mysql");

const connection = mysql.createConnection(
{   server:     "localhost",
    port:       3306,
    user:       "root",
    password:   "root",
    database:   "KennelLog"    
});

connection.connect (function (error)
{   // Connect to the MySQL database

    if (error) throw error;

    console.log (chalk.green("Connected to KennelLog as", connection.threadId));
});

module.exports = connection;