// Create the canvas
var ctx = document.getElementById('layer1').getContext('2d');




var color = document.getElementById('layer2').getContext("2d");



// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Background image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Background image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0
};
var monster = {
	x: 0,
	y: 0
};
var monstersCaught = 0;

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
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	// if (bgReady) {
	// 	ctx.drawImage(bgImage, 0, 0);
	// }

	// if (heroReady) {
	// 	ctx.drawImage(heroImage, hero.x, hero.y);
	// }

	// if (monsterReady) {
	// 	ctx.drawImage(monsterImage, monster.x, monster.y);
	// }

	// // Score
	// ctx.fillStyle = "rgb(250, 250, 250)";
	// ctx.font = "24px Helvetica";
	// ctx.textAlign = "left";
	// ctx.textBaseline = "top";
	// ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
	if (bgReady) {
		bgReady = false;
		
	}


};



var drawGrid = function() {
	for (var i = 0; i <= 512; i += 16) {
		for (var j  = 0; j <= 480; j += 16) {
			ctx.rect(i, j, 16, 16);
			ctx.stroke();
		}
	}
}

var colorfy = function() {
	var x = 114;
	var y = 160;
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
colorfy();
