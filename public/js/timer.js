var timerMin=0, timerSec=0;

$('.min-timer > img').click(function(){
  var index = $(this).index();
  if(index == 0 && timerMin < 99){
    timerMin += 1;
  }
  else if(index == 2 && timerMin > 0) {
    timerMin -= 1;
  }
  $('.min-timer p').text(timerMin);
});

$('.sec-timer > img').click(function(){
  var index = $(this).index();
  if(index == 0 && timerSec < 55){
    timerSec += 5;
  }
  else if(index == 2 && timerSec >= 5) {
    timerSec -= 5;
  }
  $('.sec-timer p').text(timerSec);
});

$('.start').click(function(){
  var socket = io.connect();
  socket.emit('emit_timer', timerMin * 60 + timerSec);
  console.log('start!', timerMin * 60, timerSec);
});
