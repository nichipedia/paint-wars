(function ($) {
	// Create the canvas
	var ctx = document.getElementById('layer1').getContext('2d');
	var color = document.getElementById('layer2').getContext('2d');
	var playerCtx = document.getElementById('layer3').getContext('2d');
	var red = "#FF0000";
	var green = "#00FF00";
	var yellow = "#FFFF00"
	var sec = 60;
	var then = Date.now();

	$('#scoreboard').hide();
	$('#results').hide();

	$('.prim').click(function () {
		$('#main').hide();
		drawGrid();
		$('#scoreboard').show();
		timer();
		main();
	});

	$('.restart').click(function() {
		$('#results').hide();
		reset();
		drawGrid();
		$('#game-area').show();
		timer();
		main();
	});

	function timer() {  
		sec = 60;
		var id = window.setInterval(function() {
			sec--;
			if (sec < 0) {
				clearInterval(id);
				return;
			}        
		}, 1000)
	}

	function deathTimer(i, n) {
		var death = window.setInterval(function() {
			document.getElementById('deathPrompt').innerHTML = "Player " + n + " is dead for " + i + " more seconds";
			i--;
			if (i < 0) {
				clearInterval(death);
				document.getElementById('deathPrompt').innerHTML = "";
				if (n == 1) {
					player1.dead = false;
				} else {
					player2.dead = false;
				}
			}
		}, 1000)
	}

	// Game objects
	var player1 = {
		speed: 256, // movement in pixels per second
		x: 16,
		y: 16,
		paint: true,
		score: 0,
		dead: false
	};

	var player2 = {
		speed: 256,
		x: 60,
		y: 60,
		paint: true,
		score: 0,
		dead: false
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
			player1.paint = true;
		}
	}, false);


	// Reset the game when the player catches a monster
	function reset() {
		playerCtx.clearRect(0, 0, 512, 480);
        ctx.clearRect(0,0,512,480);
        color.clearRect(0,0,512,480);
		player1 ={
			speed: 256, // movement in pixels per second
			x: 16,
			y: 16,
			paint: true,
			score: 0,
			dead: false
		};
		player2 = {
			speed: 256,
			x: 60,
			y: 60,
			paint: true,
			score: 0,
			dead: false
		};
		document.getElementById('red-results').innerHTML = '';
		document.getElementById('green-results').innerHTML = '';
		document.getElementById('winner').innerHTML = '';
	};

	// Update game objects
	function update(modifier) {
		if (!player1.dead) {
			if (38 in keysDown) { // Player holding up
				if ((player1.y - (player1.speed * modifier)) > 0) {
					player1.y -= player1.speed * modifier;
				}
			}
			if (40 in keysDown) { // Player holding down
				if ((player1.y + (player1.speed * modifier)) < 480) {
					player1.y += player1.speed * modifier;
				}
			}
			if (37 in keysDown) { // Player holding left
				if ((player1.x - (player1.speed * modifier)) > 0) {
					player1.x -= player1.speed * modifier;
				}
			}
			if (39 in keysDown) { // Player holding right
				if ((player1.x + (player1.speed * modifier)) < 512) {
					player1.x += player1.speed * modifier;
				}
			}
			if (13 in keysDown) {
				player1.paint = false;
			}
		}
		if (!player2.dead) {
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
			if (32 in keysDown) {
				player2.paint = false;
			}
		}
	}

	// Draw everything
	function render() {
		playerCtx.clearRect(0, 0, 512, 480);

		if (!player1.dead) {
			if (player1.paint) {
				playerCtx.beginPath();
				playerCtx.arc(player1.x, player1.y, 8, 0, 2 * Math.PI);
				playerCtx.fillStyle = red;
				playerCtx.fill();
				playerCtx.stroke();
				var player1ImgData = color.getImageData(player1.x, player1.y, 1, 1);
				if (player1ImgData.data[0] == 0 && player1ImgData.data[1] == 0) {
					drawTile(player1.x - 8, player1.y - 8, red);
					player1.score++;
					document.getElementById('player1').innerHTML = player1.score;
				} else if (player1ImgData.data[1] > 0){
					drawTile(player1.x - 8, player1.y - 8, red);
					player1.score++;
					player2.score--;
					document.getElementById('player1').innerHTML = player1.score;
					document.getElementById('player2').innerHTML = player2.score;
				}
			} else {
				playerCtx.beginPath();
				playerCtx.arc(player1.x, player1.y, 8, 0, 2 * Math.PI);
				playerCtx.fillStyle = yellow;
				playerCtx.fill();
				playerCtx.stroke();

				playerCtx.beginPath();
				playerCtx.arc(player1.x, player1.y, 4, 0, 2 * Math.PI);
				playerCtx.fillStyle = red;
				playerCtx.fill();
				playerCtx.stroke();
				if (player1.x < player2.x + 8  && player1.x + 8  > player2.x &&
					player1.y < player2.y + 8 && player1.y + 8 > player2.y) {
						player2.dead = true;
						deathTimer(5, 2);
				}
			}
		} else {
			playerCtx.beginPath();
			playerCtx.arc(player1.x, player1.y, 8, 0, 2 * Math.PI);
			playerCtx.fillStyle = red;
			playerCtx.fill();
			playerCtx.stroke();
			console.log('player 1 dead');
		}


		if (!player2.dead) {
			if (player2.paint) {
				playerCtx.beginPath();
				playerCtx.arc(player2.x, player2.y, 8, 0, 2 * Math.PI);
				playerCtx.fillStyle = green;
				playerCtx.fill();
				playerCtx.stroke();
				var player2ImgData = color.getImageData(player2.x, player2.y, 1, 1);
				if (player2ImgData.data[1] == 0 && player2ImgData.data[0] == 0) {
					drawTile(player2.x - 8, player2.y - 8, green);
					player2.score++;
					document.getElementById('player2').innerHTML = player2.score;
				} else if (player2ImgData.data[0] > 0){
					drawTile(player2.x - 8, player2.y - 8, green);
					player2.score++;
					player1.score--;
					document.getElementById('player1').innerHTML = player1.score;
					document.getElementById('player2').innerHTML = player2.score;
				}
			} else {
				playerCtx.beginPath();
				playerCtx.arc(player2.x, player2.y, 8, 0, 2 * Math.PI);
				playerCtx.fillStyle = yellow;
				playerCtx.fill();
				playerCtx.stroke();

				playerCtx.beginPath();
				playerCtx.arc(player2.x, player2.y, 4, 0, 2 * Math.PI);
				playerCtx.fillStyle = green;
				playerCtx.fill();
				playerCtx.stroke();
				if (player1.x < player2.x + 8  && player1.x + 8  > player2.x &&
					player1.y < player2.y + 8 && player1.y + 8 > player2.y) {
						player1.dead = true;
						deathTimer(5, 1);
				}
			}
		} else {
			playerCtx.beginPath();
			playerCtx.arc(player2.x, player2.y, 8, 0, 2 * Math.PI);
			playerCtx.fillStyle = green;
			playerCtx.fill();
			playerCtx.stroke();
			console.log('player 2 dead mane');
		}
	}

	function drawGrid() {
		for (var i = 0; i <= 512; i += 16) {
			for (var j = 0; j <= 480; j += 16) {
				ctx.rect(i, j, 16, 16);
				ctx.stroke();
			}
		}
	}

	function drawTile(x, y, hex) {
		x = Math.round(x / 16) * 16;
		y = Math.round(y / 16) * 16;
		color.fillStyle = hex;
		color.fillRect(x, y, 16, 16);
		color.stroke();
	}


	// The main game loop
	function main() {
		
		if (sec > 0) {
			var now = Date.now();
			var delta = now - then;
			document.getElementById('clock').innerHTML = sec;
			update(delta / 1000);
			render();


			then = now;

			// Request to do this again ASAP
			requestAnimationFrame(main);
		} else {
			$('#game-area').hide();
			if (player1.score > player2.score) {
				document.getElementById('winner').innerHTML = 'Red player has won!';
			} else {
				document.getElementById('winner').innerHTML = 'Green player has won!';
			}
			document.getElementById('red-results').innerHTML = 'Red player scored: ' + player1.score;
			document.getElementById('green-results').innerHTML = 'Green player scored: ' + player2.score;
			$('#results').show();
		}
	}
})(jQuery);