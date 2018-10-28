const express = require('express')();
const http = require("http").Server(express);
const io = require("socket.io")(http);

// const app = express();
// app.use ("/");

express.get('/', function(req, res) {
  res.sendFile(__dirname + '/server.html');
});

io.on('connection', function(socket){
  console.log('A new WebSocket connection has been established');
});

setInterval(function()
{
    var stockprice = Math.floor(Math.random() * 1000);
    io.emit('stock price update', stockprice);
}, 1000);
  

http.listen(8000, function() {
  console.log('Listening on *:8000');
});