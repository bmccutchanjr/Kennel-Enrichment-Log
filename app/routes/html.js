// html.js is the handler for the static routes and their auxillary files.

// Require the dependencies
const chalk = require("chalk");
const express = require("express");
const path = require("path");

// Configure express
const app = express();
const router = express.Router ();

app.use ("/", router);

router
.use (function (request, response, next)
{   // This always happens always happens whenever any route is served in this module.  At the moment
	// I use it to debug routes, but it could be something more useful.

	console.log(chalk.blue("html.js"));
	console.log(chalk.blue("requesting: ", request.url));

	next();
})
.get("/cagepage", function(request, response)
{	// A request has been made for the '/cagepage' endpoint.  Respond with the file 'cagepage.html'.

	response.sendFile(path.join(__dirname, "../public/cagepage.html"));
})
.get("/log", function(request, response)
{	// A request has been made for the '/log' endpoint.  Respond with the file 'log.html'.

	response.sendFile(path.join(__dirname, "../public/log.html"));
})
.use(express.static(path.join(__dirname, "../public")))
.use(function (request, response)
{	// default route to handle 404 errors
	response.sendFile(path.join(__dirname, "../public/404.html"));
});

module.exports = router;