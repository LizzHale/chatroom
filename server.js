var express = require('express');
var socket_io = require('socket.io');
var http = require('http');

var app = express();
app.use(express.static('public'));

// wrap the express app in a Node http.Server object to allow socket.io to run alongside express
var server = http.Server(app);
// initialize an io object which is an EventEmitter
var io = socket_io(server);
var people = {};
var clients = [];

// create a listener to the connection event
io.on('connection', function(socket) {
    socket.on('join', function(name) {
        people[socket.id] = name;
        clients.push(socket.id);
        var connection = name + " connected";
        socket.emit('message', 'You have connected to the server');
        socket.broadcast.emit('message', connection);
        io.emit('users', clients.length);
    });

    // handle the message that the client sends to the server
    socket.on('message', function(message) {
        console.log('Received message:', message);
        // broadcast the message to any other clients who are connected
        // this will send messages to all clients except the client whose socket object you are using
        socket.broadcast.emit('message', message);
    });

    socket.on('typing', function() {
        socket.broadcast.emit('typing');
    });

    socket.on('typingpaused', function() {
        socket.broadcast.emit('typingpaused');
    });

    socket.on('disconnect', function() {
        clientName = people[socket.id];
        clients.splice(clients.indexOf(socket.id), 1);
        var disconnection = clientName + " disconnected";
        socket.broadcast.emit('message', disconnection);
        io.emit('users', clients.length);
    });
});

// we now call server.listen rather than app.listen
server.listen(8080);