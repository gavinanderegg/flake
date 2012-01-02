// Christmas Lemmings 1991?


var config = {
	'width': 320, // The virtual size. These vaules
	'height': 240, // are doubled when drawn
	'fps': 30
};


var screen = {
	'canvas': null,
	'image': null
};


var flakes = [];
var animate = true;


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
	
	$(document).keydown(function(event) {
		console.log("which: " + event.which);
		console.log("keyPress: " + event.keyPress);
		
		if ((event.which == 27) || (event.keyPress == 27)) {
			animate = false;
		}
	});
	
	var c = document.getElementById('screen');
	screen.canvas = c.getContext('2d');
	screen.image = screen.canvas.createImageData(config.width, config.height);
	
	loop();
});


function render() {
	setPixel(screen.image, randBetween(0, Math.floor(config.width / 2)), randBetween(0, Math.floor(config.height / 2)), 256, 256, 256, 256);
	
	screen.canvas.putImageData(screen.image, 0, 0); // at coords 0,0
}


function loop() {
	if (animate == true) {
		requestAnimFrame(loop);
		render();
	}
}


function setPixel(imageData, x, y, r, g, b, a) {
	index = ((x * 2) + (y * 2) * imageData.width) * 4;
	
	// First pixel
	imageData.data[index+0] = r;
	imageData.data[index+1] = g;
	imageData.data[index+2] = b;
	imageData.data[index+3] = a;
	
	// The one beside it
	imageData.data[index+4] = r;
	imageData.data[index+5] = g;
	imageData.data[index+6] = b;
	imageData.data[index+7] = a;
	
	index = ((x * 2) + ((y * 2) + 1) * imageData.width) * 4;
	
	// The pixel below the first
	imageData.data[index+0] = r;
	imageData.data[index+1] = g;
	imageData.data[index+2] = b;
	imageData.data[index+3] = a;
	
	// The pixel beside it
	imageData.data[index+4] = r;
	imageData.data[index+5] = g;
	imageData.data[index+6] = b;
	imageData.data[index+7] = a;
}


function randBetween(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}


function flake(x, y, weight) {
	
}






