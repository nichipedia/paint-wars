// Create the canvas
var ctx = document.getElementById('layer1').getContext('2d');
var color = document.getElementById('layer2').getContext('2d');
var playerCtx = document.getElementById('layer3').getContext('2d');




// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	x: 16,
	y: 16,
	paint: true
};

var player2 = {
	speed: 256,
	x: 60,
	y: 60,
	paint: true
};


// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	if (e.keyCode == 32) {
		player2.paint = true;
	}
	if (e.keyCode == 13) {
		hero.paint = true;
	}
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
	if (87 in keysDown) {
		if ((player2.y - (player2.speed * modifier)) > 0) {
			player2.y -= player2.speed * modifier;
		}
	}
	if (65 in keysDown) {
		if ((player2.x - (player2.speed * modifier)) > 0) {
			player2.x -= player2.speed * modifier;
		}
	}
	if (83 in keysDown) {
		if ((player2.y + (player2.speed * modifier)) < 480) {
			player2.y += player2.speed * modifier;
		}
	}
	if (68 in keysDown) {
		if ((player2.x + (player2.speed * modifier)) < 512) {
			player2.x += player2.speed * modifier;
		}
	}
	if (13 in keysDown) {
		hero.paint = false;
	}
	if (32 in keysDown) {
		player2.paint = false;
	}
};

// Draw everything
var render = function () {
	playerCtx.clearRect(0,0,512,480);

	if (hero.paint) {
		playerCtx.beginPath();
		playerCtx.arc(hero.x,hero.y,8,0,2*Math.PI);
		playerCtx.fillStyle = "#FF0000";
		playerCtx.fill();
		playerCtx.stroke();
		var player1ImgData = color.getImageData(hero.x, hero.y, 1, 1);
		if (player1ImgData.data[0] == 0) {
			drawRedTile(hero.x - 8, hero.y - 8);
		}
	} else {
		playerCtx.beginPath();
		playerCtx.arc(hero.x,hero.y,8,0,2*Math.PI);
		playerCtx.fillStyle = "#FFFF00";
		playerCtx.fill();
		playerCtx.stroke();
		
		playerCtx.beginPath();
		playerCtx.arc(hero.x,hero.y,4,0,2*Math.PI);
		playerCtx.fillStyle = "#FF0000";
		playerCtx.fill();
		playerCtx.stroke();
	}

	if (player2.paint) {
		playerCtx.beginPath();
		playerCtx.arc(player2.x,player2.y,8,0,2*Math.PI);
		playerCtx.fillStyle = "#00FF00";
		playerCtx.fill();
		playerCtx.stroke();
		var player2ImgData = color.getImageData(player2.x, player2.y, 1, 1);
		if (player2ImgData.data[1] == 0) {
			drawGreenTile(player2.x - 8, player2.y - 8);
		}
	} else {
		playerCtx.beginPath();
		playerCtx.arc(player2.x,player2.y,8,0,2*Math.PI);
		playerCtx.fillStyle = "#FFFF00";
		playerCtx.fill();
		playerCtx.stroke();

		playerCtx.beginPath();
		playerCtx.arc(player2.x,player2.y,4,0,2*Math.PI);
		playerCtx.fillStyle = "#00FF00";
		playerCtx.fill();
		playerCtx.stroke();
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

var drawRedTile = function(x, y) {
	x = Math.round(x/16) * 16;
	y = Math.round(y/16) * 16;
	color.fillStyle = "#FF0000";
	color.fillRect(x,y,16,16);
	color.stroke();
}

var drawGreenTile = function(x, y) {
	x = Math.round(x/16) * 16;
	y = Math.round(y/16) * 16;
	color.fillStyle = "#00FF00";
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
