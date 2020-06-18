var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var cnvw = 960;
var cnvh = 640;
var move = 1;
canvas.width = cnvw;
canvas.height = cnvh;
var step = new Audio('sfx/stepl.flac');
var fightsfx = new Audio('sfx/fight.wav');
var stonejmp = new Audio('sfx/stonejmp.mp3');
var die = new Audio('sfx/die.mp3');
var rain = new Audio('sfx/rain.mp3');
var crouchsfx = new Audio('sfx/crouch.mp3');
var hero = new Image();
var muteimg = new Image();
muteimg.src = "img/mute.png";
var tree1 = new Image();
var tree2 = new Image();
var walkright = new Image();
var walkleft = new Image();
var fight = new Image();
fight.src = "img/fight.png";
var idle = new Image();
var platform = new Image();
var zabor = new Image();
var background = new Image();
var loading = new Image();
loading.src = "img/load.png";
var background2 = new Image();
var background3 = new Image();
var background4 = new Image();
var snow = new Image();
var blockleft = new Image();
var blockright = new Image();
var died = new Image();
var death = new Image();
var crouchr = new Image();
var crouchl = new Image();
background.src = "img/forest/background.png";
background2.src = "img/forest/background2.png";
background3.src = "img/forest/background3.png";
background4.src = "img/forest/background4.png";
zabor.src = "img/forest/zabor.png";
tree1.src = "img/forest/tree1.png";
tree2.src = "img/forest/tree2.png";
snow.src = "img/forest/snow.png";
hero.src = "img/roguer.png";
platform.src = "img/forest/platform.png";
walkright.src = "img/walkright.png";
walkleft.src = "img/walkleft.png";
idle.src = "img/idle.png";
died.src = "img/died.png";
blockleft.src = "img/forest/floor1.png";
blockright.src = "img/forest/floor2.png";
var player = {
	xPrev: 0,
	yPrev: 0,
	width: 30,
	height: 60,
	x: 100,
	y: 452,
	x_velocity: 0,
	y_velocity: 0,
	jump: true,
	crouch: true
};
var obstacle = {
	x: 0,
	y: 540,
	width: 250,
	height: 100
};
var block2 = {
	x: 660,
	y: 540,
	width: 300,
	height: 100
};
var rock = {
	x: 405,
	y: 540,
	d: 0,
	width: 100,
	height: 30,
}
var isCollided = function(obst, obj) {
	if (obj.x + obj.width > obst.x
	&& obj.x < obst.x + obst.width
	&& obj.y < obst.y + obst.height
	&& obj.y + obj.height > obst.y) {
		return true;
	} else {
		return false;
	}
};
var collideHandler = function(obst, obj) {
	if (isCollided(obst, obj)) {
  		if (obj.xPrev >= obst.x + obst.width) {
  			obj.x = obst.x + obst.width;
  			obj.x_velocity = 0;
  		}
  		if (obj.xPrev + obj.width <= obst.x) {
  			obj.x = obst.x - obj.width;
  			obj.x_velocity = 0;
  		}
  		if (obj.yPrev + obj.height <= obst.y) {
  			obj.y = obst.y - obj.height;
  			obj.y_velocity = 0;
  			obj.jump = false;
  		}
  		if (obj.yPrev >= obst.y + obst.height) {
  			obj.y = obst.y + obst.height;
  			obj.y_velocity = 0;
  		}
  	}
};

var update = function () {
	player.xPrev = player.x;
	player.yPrev = player.y;
//Прыжок
	if(controller.up && player.jump === false && move == 1) {
		player.y_velocity -= 20;
		player.jump = true;
		stonejmp.play();
	}
	if (player.y > 575){
		move = 0;
	}
//Приседание
	if(controller.down && move == 1) {
		hero.src = "img/crouchr.png";
		player.crouch = true;
	}
//Движение направо присев
	if(controller.right && move == 1 && controller.down) {
		player.x_velocity -= 0.3;
		crouchsfx.play();
	}
//Движение налево присев
	if(controller.left && move == 1 && controller.down) {
		player.x_velocity += 0.3;
		crouchsfx.play();
	}
//Движение направо
	if (controller.right && move == 1) {
		player.x_velocity += 0.5;
	}
//Движение налево
	if (controller.left && move == 1) {
		player.x_velocity -= 0.5;
	}
//Звук шагов
	if (controller.left && move == 1 && player.jump == false && controller.down == false || controller.right && move == 1 && player.jump == false && controller.down == false) {
		step.play();
	}
	var music = new Audio('sfx/lvl1.mp3');
if (controller.enter) {
        rain.play();
        rain.volume=0.5;
    }
    canvas.addEventListener('click', function() {
    	rain.pause();
     }, false);
//Гравитация и перемещение
	player.y_velocity += 1;
	player.x += player.x_velocity;
	player.y += player.y_velocity;
	player.x_velocity *= 0.9;
	player.yx_velocity *= 0.9;
//Соблюдение границ канваса по y
	if (player.y > cnvh - player.height){
  		player.y = cnvh - player.height;
  		player.y_velocity = 0;
  		player.jump = false;
  	}

  	if (player.x < 0){
  		player.x = 0;
  		player.x_velocity = 0;
  	}
//Соблюдение границ канваса по x
  	if (player.x > cnvw - player.width){
  		player.x = cnvw - player.width;
  		player.x_velocity = 0;
  	}
  	collideHandler(obstacle, player);
  	collideHandler(block2, player);
  	collideHandler(rock, player);
  	if (controller.ctrl) {
		fightsfx.play();
	}
	rock.d += 0.011;
	rock.x += Math.cos(rock.d) * 1.7;
	//Переход на следующий уровень
  	if ((player.x + player.width)>= 960) {
		window.location.replace("lvl6.php");
		move=0;
	}
};


var draw = function () {
	//Фон
	context.drawImage(background, 0, 0, 1024, 640);
	context.drawImage(background2, 0, 0, 1024, 640);
	context.drawImage(background3, 0, 0, 1024, 640);
	context.drawImage(background4, 0, 0, 1024, 640);
	context.drawImage(tree1, -50, 300, 256, 256);
	context.drawImage(tree2, 50, 300, 256, 256);
	context.drawImage(zabor, 660, 490, 300, 50);
	context.drawImage(snow, 64*numsnow, 0, 600, 64, 0, 0, 960, 640);
	context.fillStyle = "green";
	//Игрок
	context.fillStyle = 'rgba(0, 0, 0, 0.0)';
  	context.fillRect(player.x, player.y, player.width, player.height);
  	if (controller.ctrl && move == 1 && controller.down == false) {
  		context.drawImage(fight, 30*numfight, 0, 30, 60, player.x, player.y, 30, 60);
  	}
	else if (controller.right && move == 1 && controller.down == false) {
		context.drawImage(walkright, 30*num, 0, 30, 60, player.x, player.y, 30, 60);
	}
	else if (controller.left && move == 1 && controller.down == false) {
		context.drawImage(walkleft, 30*numleft, 0, 30, 60, player.x, player.y, 30, 60);
	}
	else if (player.y > 575){
		move = 0;
		die.play();
		context.drawImage(hero, player.x, player.y, player.width, player.height);
		hero.src = "img/death.png";
  		player.width = 32;
  		player.height = 32;
  		setTimeout( function(){
		player.y = 452;
  		player.x = 100;
  		player.width = 30;
  		player.height = 60;
  		hero.src = "img/nothing.png";
		}, 3000 );
		setTimeout( function(){
		move = 1;
		}, 5900 );
	}
	else if (move == 0) {
		context.drawImage(hero, player.x, player.y, player.width, player.height);
		hero.src = "img/nothing.png";
	}
	else if (move == 1 && controller.down) {
		context.drawImage(hero, player.x, player.y, player.width, player.height);
		hero.src = "img/crouchr.png";
	}
	else {
		context.drawImage(idle, 30*numidle, 0, 30, 60, player.x, player.y, 30, 60);
	}
	if (move == 0) {
		context.drawImage(died, 391, 250, 178, 178);
	}
	//Блоки
	context.fillStyle = 'rgba(0, 0, 0, 0.0)';
	context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
	context.drawImage(blockleft, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
	context.fillRect(block2.x, block2.y, block2.width, block2.height);
	context.drawImage(blockright, block2.x, block2.y, block2.width, block2.height);
	context.fillRect(rock.x, rock.y, rock.width, rock.height);
	context.drawImage(platform, rock.x, rock.y, rock.width, rock.height);
	if ((player.x + player.width)>= 960) {
		context.drawImage(loading, 0, 0, 1024, 640);
	}
	context.drawImage(muteimg, 40, 8, 25, 20);
};

