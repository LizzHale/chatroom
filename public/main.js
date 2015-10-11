$(document).ready(function() {
    var socket = io();
    // Select the input tag and messages div
    var input = $('input');
    var messages = $('#messages');

    // Create a function to append new messages
    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    // When the user presses the enter key in the input box call the addMessage function
    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            // Add "{user} is typing" functionality
            return;
        }

        var message = input.val();
        addMessage(message);
        // send a message to the server when we send a message
        socket.emit('message', message);
        input.val('');
    });

    //socket.on('connect', addMessage);
    // add a listener for the broadcast messages and client connections
    socket.on('message', addMessage);
});