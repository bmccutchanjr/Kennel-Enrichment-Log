// html.js is the handler for the static routes.
//
// 03 // This is not the typical route handler that I am used to writing, and I'm not 100% sure why it has to
// 03 // be written this way.  This application uses socket.io so that it can push data from the server to the
// 03 // client.  socket.io does not work directly with Express.js and requires additional middleware (html).
// 03 // 
// 03 // To use a route handler like this now requires that I pass the reference to sockets.io to this module
// 03 // in the require statement, and that means I need a function to call.  Thus routerIO.  The module exports
// 03 // routerIO, which is then called by require("./app/routes/html").  routerIO then return a reference to
// 03 // router (const router = express.Router();) which is what server really needs.
// 03 //
// 03 // routerIO returns the reference to router that would normally be exported.  The more I learn about
// 03 // JavaScript the less impressed I am.

// 01 remove cookie-parser.

// 02 remove code to test for client device type...that seems better suited to the client anyway.

// 03 html.js doesn't need sockets.io -- that's required by api.js

// Require the dependencies
const chalk = require("chalk");
// 01 const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

// Configure express
const app = express();
const router = express.Router ();
// 01 app.use(cookieParser());

// 02 var isMobile = false;

// 03 const routerIO = (function(io)
// 03 {   // To use socket.io with this module I need to pass a reference to it.  That can only be done by
// 03	  // wrapping my routes in a function.

	app.use ("/", router);

	router
	.use (function (request, response, next)
	{   // I'm still having trouble debugging my routes.  I need somethng that always happens to log the
		// request URL to the console.
		// console.log(chalk.yellow("A ", request.device.type, " is requesting a file"));
console.log(chalk.blue("requesting: ", request.url));

		next();
	})
	.get("/cagepage/:folder/:what", function(request, response)
	{	// serve auxiliary files for /logs endpoint.
		
		response.sendFile(path.join(__dirname, "../public/" + request.params.folder + "/" + request.params.what));
	})
	.get("/cagepage/:animal", function(request, response)
	{	// set a cookie indicating the animal type from this request (the client will need that value in
		// several pages) and serve the enrichment log page.

		response.sendFile(path.join(__dirname, "../public/cagepage.html"));
	})
	.get("/log/:folder/:what", function(request, response)
	{	// serve auxiliary files for /logs endpoint.
		
		response.sendFile(path.join(__dirname, "../public/" + request.params.folder + "/" + request.params.what));
	})
	.get("/log/:animal", function(request, response)
	{	// set a cookie indicating the animal type from this request (the client will need that value in
		// several pages) and serve the enrichment log page.

		response.sendFile(path.join(__dirname, "../public/log.html"));
	})
	.use(express.static(path.join(__dirname, "../public")));

// 03 	return router;
// 03 })
// 
// 03 module.exports = routerIO;
module.exports = router;