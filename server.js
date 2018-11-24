// Kennel Enrichment Log is a web based analog to the real world paper based method volunteers at the
// Summit County Humane Society use to log activity with the animals, primarily the dogs.  There are
// two forms that need to be filled out.
//
// First and most important is a sign-out sheet.  Volunteers are required to sign an animal out before
// taking it out of its cage, and sign them back in after returning it to its cage.
//
// There is another form, a table listing each animal with a space to indicate some volunteer has spent
// time with that animal on a given day.  Who that volunteer is, or how long they spent with an animal
// does not matter for this form, it's just a true/false.  Someone got this animal out for some amount
// of time on this date.  The purpose is to help volunteers make an informed decision on which animals
// are most in need of quality time.
//
// Problem is not everyone uses these forms every time.  And some volunteers don't use either form.  They
// also get quite messy and sometimes difficult to interpret as animals are added to or removed from the
// list.
//
// This application is not in use at the shelter.  It's a personal excersize for me.

// Require the dependencies
const express = require('express');
const http = require("http").Server(express);        // seems to be required for socket.io
const io = require("socket.io")(http);               // push content to the browser
const apiRoutes = require ("./app/data/api.js")(io);
const htmlRoutes = require ("./app/routes/html.js");

// Configure ExpressJS
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

io.on('connection', function(socket){
  console.log('A new WebSocket connection has been established');
});

// setInterval(function()
// {
//     var stockprice = Math.floor(Math.random() * 1000);
//     io.emit('stock price update', stockprice);
// }, 1000);
  
// Set the PORT to be used by the server.  If the Node.js process environment has a variable defined called
// PORT, this application is likely deployed on Heroku and it must use the server must use the port specified
// by Heroku.  If the process environment does not have a PORT variable defined it is probably running locally
// and can use pretty much whatever port I want.
const PORT = process.env.PORT || 8080;

app.listen(PORT, function()
{   // Start the server
    console.log("KennelLog listening on :", PORT);
});