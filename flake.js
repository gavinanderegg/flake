// Christmas Lemmings 1991?


var config = {
	'width': 640,
	'height': 480,
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
		var ESC = 27;
		
		if ((event.which === ESC) || (event.keyPress === ESC)) {
			animate = false;
			console.log("animation stopped");
		}
	});
	
	flakes.push(newFlake());
	
	var c = document.getElementById('screen');
	screen.canvas = c.getContext('2d');
	// screen.canvas.globalCompositeOperation = 'lighter';
	screen.image = screen.canvas.createImageData(config.width, config.height);
	
	console.log("animation starting");
	
	loop();
});


function render() {
	screen.image = screen.canvas.createImageData(config.width, config.height);
	
	// setPixel(screen.image, randBetween(0, Math.floor(config.width / 2)), randBetween(0, Math.floor(config.height / 2)), 256, 256, 256, 256);
	
	animateFlakes();
	
	screen.canvas.putImageData(screen.image, 0, 0);
}


function loop() {
	if (animate === true) {
		requestAnimFrame(loop);
		render();
	}
}


function setPixel(imageData, x, y, r, g, b, a) {
	var index = ((x * 2) + ((y * 2) * imageData.width)) * 4;
	
	// First pixel
	imageData.data[index + 0] = r;
	imageData.data[index + 1] = g;
	imageData.data[index + 2] = b;
	imageData.data[index + 3] = a;
	
	// The one beside it
	imageData.data[index + 4] = r;
	imageData.data[index + 5] = g;
	imageData.data[index + 6] = b;
	imageData.data[index + 7] = a;
	
	index = ((x * 2) + ((y * 2) + 1) * imageData.width) * 4;
	
	// The pixel below the first
	imageData.data[index + 0] = r;
	imageData.data[index + 1] = g;
	imageData.data[index + 2] = b;
	imageData.data[index + 3] = a;
	
	// The pixel beside it
	imageData.data[index + 4] = r;
	imageData.data[index + 5] = g;
	imageData.data[index + 6] = b;
	imageData.data[index + 7] = a;
}


function randBetween(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}

function randomPixel() {
	var pX = Math.floor(randBetween(0, (config.width - 1)) / 2);
	var pY = Math.floor(randBetween(0, (config.height - 1)) / 2);
	
	setPixel(screen.image, pX, pY, 256, 256, 256, 256);
}


function newFlake() {
	var x = Math.floor(randBetween(0, (config.width - 1)) / 2);
	var weight = Math.floor(randBetween(0.1, 1));
	var motion = Math.floor(randBetween(-1, 1));
	
	var flake = {
		'x': x,
		'y': -1,
		'weight': weight,
		'motion': motion,
		'previous': 0
	};
	
	return flake;
}


function animateFlakes() {
	if ((Math.floor(randBetween(0, 1)) > 0.9) && flakes.length < 80) {
		flakes.push(newFlake());
	}
	
	$.each(flakes, function(index, flake) {
		console.log(flake.y);
		
		flake.y += flake.weight;
		flake.x += flake.motion;
		
		if (flake.y > config.height) {
			
		}
		
		setPixel(screen.image, flake.x, flake.y, 256, 256, 256, 256);
	});
	
	// console.log(flake.x + " " +  flake.y);
	
	screen.canvas.putImageData(screen.image, 0, 0);
}



