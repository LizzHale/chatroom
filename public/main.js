$(document).ready(function() {
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
            return;
        }

        var message = input.val();
        addMessage(message);
        input.val('');
    });
});