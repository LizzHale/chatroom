var express = require('express');
var socket_io = require('socket.io');
var http = require('http');

var app = express();
app.use(express.static('public'));

// wrap the express app in a Node http.Server object to allow socket.io to run alongside express
var server = http.Server(app);
// initialize an io object which is an EventEmitter
var io = socket_io(server);

// create a listener to the connection event
io.on('connection', function(socket) {
    console.log('Client connected');

    // handle the message that the client sends to the server
    socket.on('message', function(message) {
        console.log('Received message:', message);
        // broadcast the message to any other clients who are connected
        // this will send messages to all clients except the client whose socket object you are using
        socket.broadcast.emit('message', message);
    });
});

// we now call server.listen rather than app.listen
server.listen(8080);