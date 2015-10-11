$(document).ready(function() {
    var socket = io();
    // Select the input tag and messages div
    var input = $('input');
    var messages = $('#messages');
    var userCount = $('#users');
    var typist = $('#typist');

    // Create a function to append new messages
    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    var addUserCount = function(users) {
        userCount.text('users: ' + users);
    };

    var displayTypingUser = function() {
        typist.text('someone is typing');
    };

    var removeTypingUser = function() {
        typist.text('');
    };

    // When the user presses the enter key in the input box call the addMessage function
    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            socket.emit('typing');
            return;
        }

        removeTypingUser();
        var message = input.val();
        addMessage(message);
        // send a message to the server when we send a message
        socket.emit('message', message);
        input.val('');
    });

    input.on('focusout', function(event) {
        socket.emit('typingpaused');
    });

    //socket.on('connect', addMessage);
    // add a listener for the broadcast messages and client connections
    socket.on('message', addMessage);
    socket.on('users', addUserCount);
    socket.on('typing', displayTypingUser);
    socket.on('typingpaused', removeTypingUser);
});