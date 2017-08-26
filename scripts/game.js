// Create the canvas
var ctx = document.getElementById('layer1').getContext('2d');
var color = document.getElementById('layer2').getContext('2d');
var playerCtx = document.getElementById('layer3').getContext('2d');




// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	x: 16,
	y: 16
};


// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		if ((hero.y - (hero.speed * modifier)) > 0) {
			hero.y -= hero.speed * modifier;
		}
	}
	if (40 in keysDown) { // Player holding down
		if ((hero.y + (hero.speed * modifier)) < 480) {
			hero.y += hero.speed * modifier;
		}
	}
	if (37 in keysDown) { // Player holding left
		if ((hero.x - (hero.speed * modifier)) > 0) {
			hero.x -= hero.speed * modifier;
		}
	}
	if (39 in keysDown) { // Player holding right
		if ((hero.x + (hero.speed * modifier)) < 512) {
			hero.x += hero.speed * modifier;
		}
	}

	// // Are they touching?
	// if (
	// 	hero.x <= (monster.x + 32)
	// 	&& monster.x <= (hero.x + 32)
	// 	&& hero.y <= (monster.y + 32)
	// 	&& monster.y <= (hero.y + 32)
	// ) {
	// 	++monstersCaught;
	// 	reset();
	// }
};

// Draw everything
var render = function () {
	playerCtx.clearRect(0,0,512,480);
	playerCtx.beginPath();
	playerCtx.arc(hero.x,hero.y,8,0,2*Math.PI);
	playerCtx.fillStyle = "#FF0000";
	playerCtx.fill();
	playerCtx.stroke();

	var imgData = color.getImageData(hero.x, hero.y, 1, 1);
	//console.log('Red: ' + imgData.data[0] + ' Green: ' + imgData.data[1] + ' Blue: ' + imgData.data[2]);

	if (imgData.data[0] == 0) {
		drawTile(hero.x - 8, hero.y - 8);
	}

};


function getPixel(imgData, index) {
  var i = index*4, d = imgData.data;
  return [d[i],d[i+1],d[i+2],d[i+3]] // returns array [R,G,B,A]
}

function getPixelXY(imgData, x, y) {
  return getPixel(imgData, y*imgData.width+x);
}



var drawGrid = function() {
	for (var i = 0; i <= 512; i += 16) {
		for (var j  = 0; j <= 480; j += 16) {
			ctx.rect(i, j, 16, 16);
			ctx.stroke();
		}
	}
}

var drawTile = function(x, y) {
	x = Math.round(x/16) * 16;
	y = Math.round(y/16) * 16;
	color.fillStyle = "#FF0000";
	color.fillRect(x,y,16,16);
	color.stroke();
}



// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

var then = Date.now();
drawGrid();
main();
