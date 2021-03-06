$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "/data",
        success: function(data) {

            //This variable keeps track of what index is to be displayed.
            var currentIndex = 0;

            //This for loop creates the buttons. They are each given an id, corresponding to a number.
            for (var i = 0; i < data.mu.length; i++) {
                $('.buttonrow').append('<button class="pbtn" id ="' + i + '">' + i + '</button>');
            }

            //This timer cycles the displayed data every 10 seconds, unless a user clicks manually.
            var timerID = setInterval(moveData, 10000);

            //moveData is called, setting our targeter to array slot 0.
            moveData(0);

            //This listens for a click on next or previous
            $('.move').on('click', function() {

                //If you clicked previous, moveData will move back one. If you clicked next, moveData will move forward one.
                moveData($(this).data('move'));

            });

            //This listens for a click directly on an index box.
            $('.buttonrow').on('click', '.pbtn', function() {

                //The currentIndex is set to be = to the box index.
                currentIndex = Number($(this).attr('id'));

                //The red coloration is removed from the previous chosen index, and then applied to the new one.
                $('.buttonrow').find('.chosen').removeClass('chosen');
                $('#' + currentIndex).addClass('chosen');
                 //The new data is called to be displayed on the DOM with appendPerson.
                appendPerson();
            });

            //This function moves the red index marker. If no argument is supplied, it sets direction to 1.
            function moveData(direction = 1) {

              currentIndex += direction;

                //These if statements make sure that currentIndex will never be set to an illegal value.
                if (currentIndex < 0) {
                    currentIndex = data.mu.length - 1;
                } else if (currentIndex > data.mu.length - 1) {
                    currentIndex = 0;
                }

                //The marker is moved, and then appendPerson is called.
                $('.buttonrow').find('.chosen').removeClass('chosen');
                $('#' + currentIndex).addClass('chosen');
                appendPerson();


            }

            //This function displays the chosen person's data on the DOM.
            function appendPerson() {

                //The parent container is faded out, then emptied. The new data is added, and then the parent container is faded in.
                $('.persondisplay').fadeOut("slow", function() {
                    $('.persondisplay').children().remove();
                    $('.persondisplay').append('<p>Name: ' + data.mu[currentIndex].name);
                    $('.persondisplay').append('<p>Git Username: ' + data.mu[currentIndex].git_username);
                    $('.persondisplay').append('<p>Shoutout: ' + data.mu[currentIndex].shoutout);
                    $('.persondisplay').fadeIn("slow");

                    //The timer is reset
                    clearInterval(timerID);
                    timerID = setInterval(moveData, 10000);
                });
            }
        }
    });
});
