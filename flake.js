// Christmas Lemmings 1991?


var config = {
	'width': 320,
	'height': 240,
	'fps': 30
};


var screen = {
	'canvas': null,
	'image': null
};


$(document).ready(function() {
	// from: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
		function(/* function */ callback, /* DOMElement */ element) {
			window.setTimeout(callback, 1000 / 60);
		};
	})();
	
	var c = document.getElementById('screen');
	screen.canvas = canvas.getContext('2d');
	screen.image = c.createImageData(config.width, config.height);
	
	loop();
});


function loop(){
	requestAnimFrame(loop);
	render();
}


function render() {
	
	
	setPixel(screen.image, 0, 0, 256, 256, 256, 256);
	
	c.putImageData(i, 0, 0); // at coords 0,0
}


function setPixel(imageData, x, y, r, g, b, a) {
	index = (x + y * imageData.width) * 4;
	imageData.data[index+0] = r;
	imageData.data[index+1] = g;
	imageData.data[index+2] = b;
	imageData.data[index+3] = a;
}





