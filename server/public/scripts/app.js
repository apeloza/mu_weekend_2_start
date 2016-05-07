$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
var currentIndex = 0;
        //This for loop creates the buttons
        for(var i = 0; i < data.mu.length; i++){
        $('.buttonrow').append('<button class="pbtn" id ="'+ i + '">' + i + '</button>');
        }
        $('#0').addClass('chosen');
        appendPerson();
var timerID = setInterval(moveData, 10000);


      $('.move').on('click', function(){
    moveData($(this).data('move'));
    clearInterval(timerID);
    timerId = setInterval(moveData, 10000);
        });


      $('.buttonrow').on('click', '.pbtn', function(){
        currentIndex = Number($(this).attr('id'));
        $('.buttonrow').find('.chosen').removeClass('chosen');
        $('#' + currentIndex).addClass('chosen');
        appendPerson();
        clearInterval(timerID);
        timerId = setInterval(moveData, 5000);
      });

      function moveData(direction = 1){
        currentIndex += direction;
        if(currentIndex < 0){
          currentIndex = data.mu.length-1;
        } else if(currentIndex > data.mu.length-1){
          currentIndex = 0;
        }
        $('.buttonrow').find('.chosen').removeClass('chosen');
        $('#' + currentIndex).addClass('chosen');
        appendPerson();

      }
      function appendPerson(){
        $('.persondisplay').fadeOut("slow", function(){
          $('.persondisplay').children().remove();
          $('.persondisplay').append('<p>Name: ' + data.mu[currentIndex].name);
          $('.persondisplay').append('<p>Git Username: ' + data.mu[currentIndex].git_username);
          $('.persondisplay').append('<p>Shoutout: ' + data.mu[currentIndex].shoutout);
         $('.persondisplay').fadeIn("slow");
      });
    }
}
});
});
