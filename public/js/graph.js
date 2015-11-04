$('.bar-box').on('touchstart ondragstart', onTouchStart);
$('.bar-box').on('touchmove ondrag', onTouchMove);
$('.main').on('touchend ondragend', onTouchEnd);
var position=[], diff=[], graphValue=[], maxHeight, barHeight, nyokiRow=0;
var socket = io.connect();

socket.emit('config', 'graph');

//init
for (i=0; i < 9; i++) {
	graphValue[i] = 40;
	socket.emit('emit_graph', i+1 + " " + graphValue[i]);
}

$('.waku').click(function(){
	nyokiRow = $(this).index();
	for(i=1; i <= 3; i++) {
		index = i + 3*nyokiRow - 1;
		$('.bar').eq(i-1).height(graphValue[index] * maxHeight / 50);
		$('.value-box').eq(i-1).children('p').text(graphValue[index]);

		socket.emit('emit_graph', index+1 + " " + graphValue[index]);
	}
});

//For TouchScreen
function onTouchStart(event) {
	var index = $('.bar-box').index(this) + 3 * nyokiRow;
	position[index] = event.originalEvent.touches[0].pageY;
	maxHeight = $(this).height();
}

function onTouchMove(event) {
	var index = $('.bar-box').index(this) + 3 * nyokiRow;
	console.log(index);
	var target = $(this).children('.bar');
	diff[index] = 0 - (position[index] - event.originalEvent.touches[0].pageY) / 15;
	barHeight = target.height() - diff[index];

	if (barHeight >= 0 && barHeight <= maxHeight) {
		target.height(barHeight);
	}
	else if(barHeight < 0){
		target.height(0);
		barHeight = 0;
	}
	else if(barHeight > maxHeight) {
		target.height(maxHeight);
		barHeight = maxHeight;
	}

	//rewrite value
	graphValue[index] = Math.round(barHeight / maxHeight * 50);
	$('.value-box').eq(index).children('p').text(graphValue[index]);
	//console.log(graphValue[index]);

	//Send data to nyokinyoki
	socket.emit('emit_graph', index+1 + " " + graphValue[index]);
}

function onTouchEnd(event) {
}
