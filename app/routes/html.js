// html.js is the handler for the static routes.
//
// This is not the typical route handler that I am used to writing, and I'm not 100% sure why it has to
// be written this way.  This application uses socket.io so that it can push data from the server to the
// client.  socket.io does not work directly with Express.js and requires additional middleware (html).
// 
// To use a route handler like this now requires that I pass the reference to sockets.io to this module
// in the require ststement, and that means I need a function to call.  Thus routerIO.  The module exports
// routerIO, which is then called by require("./app/routes/html").  routerIO then return a reference to
// router (const router = express.Router();) which is what server really needs.
//
// routerIO returns the reference to router that would normally be exported.  The more I learn about
// JavaScript the less impressed I am.

// Require the dependencies
const chalk = require("chalk");
const express = require("express");
// const device = require("express-device");
const path = require("path");

// Configure express
const app = express();
const router = express.Router ();
app.use(express.static("../../../app/public"));

// Configure express-device
// app.use(device.capture());
// var clientDevice = "!";

const routerIO = (function(io)
{	// To use socket.io with this module I need to pass a reference to it.  That can only be done by
	// wrapping my routes in a function.

	app.use ("/", router);

	router
	.use (function (request, response, next)
	{   // I'm still having trouble debugging my routes.  I need somethng that always happens to log the
		// request URL to the console.
		// console.log(chalk.yellow("A ", request.device.type, " is requesting a file"));
		console.log(chalk.blue("requesting: ", request.url));

		// clientDevice = request.device.type.toLowerCase();
		next();
	})
	.get("/audio/:audio", function(request, response)
	{
		response.sendFile(path.join(__dirname + "../../../app/public/audio/" + request.params.audio));
	})
	.get("/images/:image", function(request, response)
	{
		response.sendFile(path.join(__dirname + "../../../app/public/images/" + request.params.image));
	})
	.get("/javascript/:script", function(request, response)
	{
		response.sendFile(path.join(__dirname + "../../../app/public/javascript/" + request.params.script));
	})
	.get("/style/:style", function(request, response)
	{
console.log(chalk.yellow("serving style.css"));
		response.sendFile(path.join(__dirname + "../../../app/public/style/" + request.params.style));
	})
	.get('/', function(request, response)
	{
		// if (clientDevice === "phone")
		// 	response.sendFile(path.join(__dirname + '/app/public/cage-page.html'));
		// else
		// 	response.sendFile(path.join(__dirname + '/app/public/index.html'));
		response.sendFile(path.join(__dirname + '../../../app/public/index.html'));
	});

	return router;
})

module.exports = routerIO;
