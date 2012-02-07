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
var bottom = {};
var animate = true;
var screenHeight = Math.floor((config.height / 2));


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

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

function render() {
	for (var i = 0; i < screen.image.data.length; i++) {
		screen.image.data[i] = 0;
	}
	
	// setPixel(screen.image, randBetween(0, Math.floor(config.width / 2)), randBetween(0, Math.floor(config.height / 2)), 256, 256, 256, 256);
	
	animateFlakes();
	drawBottom();
	
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


function flakeInfo(flake) {
	var string = "x: " + flake.x + "\n";
	string += "y: " + flake.y + "\n";
	
	return string;
}


function newFlake() {
	var x = Math.floor(randBetween(0, (config.width - 1)) / 2);
	var weight = Math.random();
	var motion = -1 + (2 * Math.random());
	
	var flake = {
		'x': x,
		'y': 0,
		'weight': weight,
		'motion': motion,
		'previous': 0
	};
	
	return flake;
}


function animateFlakes() {
	if ((Math.floor(randBetween(0, 1)) > 0.9) && flakes.length < 24) {
		flakes.push(newFlake());
	}
	
	for (var f = 0; f < flakes.length; f++) {
		var flake = flakes[f];
		
		flake.y += flake.weight;
		flake.x += flake.motion;
		
		if (flake.y >= screenHeight || hitBottom(Math.floor(flake.x), Math.floor(flake.y))) {
			var bottomLevel = bottom[Math.floor(flake.x)];
			
			if (bottomLevel) {
				bottom[Math.floor(flake.x)] += 1;
			} else {
				bottom[Math.floor(flake.x)] = 1;
			}
			
			flakes.remove(f);
			delete flake;
		}
		else if (flake.x >= (config.width / 2)) {
			flakes.remove(f);
			delete flake;
		}
		else if (flake.x <= 0) {
			flakes.remove(f);
			delete flake;
		}
		else {
			setPixel(screen.image, Math.floor(flake.x), Math.floor(flake.y), 256, 256, 256, 256);
		}
	}
	
	// console.log(flake.x + " " +  flake.y);
}


function hitBottom(x, y) {
	if (bottom[x]) {
		
		
		if (y >= Math.floor((screenHeight - 1) - bottom[x])) {
			return true;
		}
	} else {
		return false;
	}
	
	return false;
}


function drawBottom() {
	$.each(bottom, function(row, height) {
		var fromBottom = Math.floor(screenHeight - height);
		
		for (var up = 0; up < (screenHeight - fromBottom); up++) {
			setPixel(screen.image, row, ((screenHeight - 1) - up), 256, 256, 256, 256);
		}
	});
}

