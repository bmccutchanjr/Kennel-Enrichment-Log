// api.js is the handler for the api routes.
//
// This is not the typical route handler that I am used to writing, and I'm not 100% sure why it has to
// be written this way.  This application uses socket.io so that it can push data from the server to the
// client.  socket.io does not work directly with Express.js and requires additional middleware (html).
// 
// To use a route handler like this now requires that I pass the reference to sockets.io to this module
// in the require statement, and that means I need a function to call.  Thus routerIO.  The module exports
// routerIO, which is then called by require("./app/routes/html").  routerIO then return a reference to
// router (const router = express.Router();) which is what server really needs.
//
// routerIO returns the reference to router that would normally be exported.  The more I learn about
// JavaScript the less impressed I am.

// Require the dependencies
const chalk = require("chalk");
const express = require("express");
const path = require("path");

// Configure express
const app = express();
const router = express.Router ();

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

		next();
	})
	.get("/api/animals/all", function(request, response)
	{	// Get all of the animals currently in the shelter for the specified animal type

		response.json(
            [   {   "name": "Geronimo",
                    "color": "blue",
                },
                {   "name": "Groot",
                    "color": "black",
                },
                {   "name": "Abby",
                    "color": "green",
                },
            ]);
	})
	.get("/api/animals/:animalID", function(request, response)
	{	// Get data for the animal with the specified id (animalID)

		response.send(
            {   "name": "Geronimo",
                "color": "blue",
            });
	})
	.post("/api/animals", function(request, response)
	{	// INSERT a new animal into the database

		// Call a database ORM with the data to INSERT

        // If there's a problem, send a status message back to the browser

        // if the INSERT was successful, tell the client.  
        
        // Send a push notification to any browser that is displaying the list of animals (this is not
        // likely to be the same machine that submitted the data, but could be).  I have a choice
        // here.  Push with the new record which the browser can append to the list of animals, sort 
        // and redisplay.  Push all of the animals which the browser will then sort and display.  Or
        // push a notification and have the browser do a GET request for all animals.  The last option
        // is exactly the same thing the browser does when the page first loads.
	})
	.put("/api/animals/:animalID", function(request, response)
	{	// UPDATE data in the database for the animal with animalID

		// Call a database ORM with the data to UPDATE

        // If there's a problem, send a status message back to the browser
        
        // if the UPDATE was successful, tell the client.  
        
        // Send a push notification to any browser that is displaying the list of animals (this is not
        // likely to be the same machine that submitted the data, but could be).  I have a choice
        // here.  Push with the new record which the browser can append to the list of animals, sort 
        // and redisplay.  Push all of the animals which the browser will then sort and display.  Or
        // push a notification and have the browser do a GET request for all animals.  The last option
        // is exactly the same thing the browser does when the page first loads.
	})
	.put("/api/log/out/:animalID/:volunteerID", function(request, response)
	{	// UPDATE data in the database to log the indicated animal out of its cage.  This animal is
        // currently with the indicated volunteer

		// Call a database ORM with the data to UPDATE

        // If there's a problem, send a status message back to the browser
        
        // if the UPDATE was successful, tell the client.  
        
        // Send a push notification to any browser that is displaying the list of animals (this is not
        // likely to be the same machine that submitted the data, but could be).  This is not as complicate
        // as most other updates.  Simply push a notification that the animal is out of its cage and
        // not available.  The browser just needs to "gray-out" the associated <div> on the screen.
	})
	.put("/api/log/in/:animalID/:volunteerID", function(request, response)
	{	// UPDATE data in the database to log the indicated animal back into of its cage.

		// Call a database ORM with the data to UPDATE

        // If there's a problem, send a status message back to the browser
        
        // if the UPDATE was successful, tell the client.  
        
        // Send a push notification to any browser that is displaying the list of animals (this is not
        // likely to be the same machine that submitted the data, but could be).  This is not as complicate
        // as most other updates.  Simply push a notification that the animal is back in its cage and
        // available.  The browser just needs to "gray-out" the associated <div> on the screen.
	})
	.delete("/api/animals/:animalID", function(request, response)
	{	// DELETE data from the database for the animal with animalID

		// Call a database ORM with the ID to DELETE

        // If there's a problem, send a status message back to the browser
        
        // if the DELETE was successful, tell the client.  
        
        // Send a push notification to any browser that is displaying the list of animals (this is not
        // likely to be the same machine that submitted the data, but could be).  I have a choice
        // here.  Push with the new record which the browser can append to the list of animals, sort 
        // and redisplay.  Push all of the animals which the browser will then sort and display.  Or
        // push a notification and have the browser do a GET request for all animals.  The last option
        // is exactly the same thing the browser does when the page first loads.
	});

	return router;
})

module.exports = routerIO;
