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
var zabor = new Image();
var background = new Image();
var loading = new Image();
loading.src = "img/load.png";
var background2 = new Image();
var background3 = new Image();
var background4 = new Image();
var snow = new Image();
var shipimg = new Image();
var ship1img = new Image();
var ship2img = new Image();
var blockleft = new Image();
var blockright = new Image();
var died = new Image();
var floorimg = new Image();
var death = new Image();
var crouchr = new Image();
var crouchl = new Image();
background.src = "img/forest/background.png";
background2.src = "img/forest/background2.png";
background3.src = "img/forest/background3.png";
background4.src = "img/forest/background4.png";
zabor.src = "img/forest/zabor1.png";
tree1.src = "img/forest/tree1.png";
tree2.src = "img/forest/tree2.png";
snow.src = "img/forest/snow.png";
hero.src = "img/roguer.png";
walkright.src = "img/walkright.png";
walkleft.src = "img/walkleft.png";
idle.src = "img/idle.png";
died.src = "img/died.png";
shipimg.src = "img/forest/lvl2/ship.png";
ship1img.src = "img/forest/lvl2/ship1.png";
ship2img.src = "img/forest/lvl2/ship2.png";
floorimg.src = "img/forest/lvl2/floor.png";
blockleft.src = "img/forest/lvl2/floor1.png";
blockright.src = "img/forest/lvl2/floor2.png";
var player = {
	xPrev: 0,
	yPrev: 0,
	width: 30,
	height: 60,
	x: 100,
	y: 0,
	x_velocity: 0,
	y_velocity: 0,
	jump: true,
	crouch: true
};
var obstacle = {
	x: 0,
	y: 100,
	width: 277,
	height: 540
};
var block2 = {
	x: 437,
	y: 0,
	width: 170,
	height: 495
};
var floor = {
	x: 275,
	y: 598,
	width: 700,
	height: 42
};
var ship1 = {
	x: 374,
	y: 130,
	width: 70,
	height: 64
}
var ship2 = {
	x: 272,
	y: 352,
	width: 56,
	height: 64
}
var ship = {
	x: 700,
	y: 556,
	width: 64,
	height: 42
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
  	collideHandler(floor, player);
  	if (controller.ctrl) {
		fightsfx.play();
	}
	//Переход на следующий уровень
  	if ((player.x + player.width)>= 960) {
		window.location.replace("lvl7.php");
		move=0;
	}
};


var draw = function () {
	//Фон
	context.drawImage(background, 0, 0, 1024, 640);
	context.drawImage(background2, 0, 0, 1024, 640);
	context.drawImage(background3, 0, 0, 1024, 640);
	context.drawImage(background4, 0, 0, 1024, 640);
	context.drawImage(zabor, -25, 50, 300, 50);
	context.drawImage(snow, 64*numsnow, 0, 600, 64, 0, 0, 960, 640);
	context.fillStyle = "green";
		//Блоки
	context.fillStyle = 'rgba(0, 0, 0, 0.0)';
	context.fillRect(ship1.x, ship1.y, ship1.width, ship1.height);
	context.drawImage(ship1img, ship1.x, ship1.y, ship1.width, ship1.height);
	context.fillRect(ship2.x, ship2.y, ship2.width, ship2.height);
	context.drawImage(ship2img, ship2.x, ship2.y, ship2.width, ship2.height);
	context.fillRect(ship.x, ship.y, ship.width, ship.height);
	context.drawImage(shipimg, ship.x, ship.y, ship.width, ship.height);
	context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
	context.drawImage(blockleft, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
	context.fillRect(block2.x, block2.y, block2.width, block2.height);
	context.drawImage(blockright, block2.x, block2.y, block2.width, block2.height);
	context.fillRect(floor.x, floor.y, floor.width, floor.height);
	context.drawImage(floorimg, floor.x, floor.y, floor.width, floor.height);
	//Игрок
	context.fillStyle = 'rgba(0, 0, 0, 0.0)';
  	context.fillRect(player.x, player.y, player.width, player.height);
  	if (player.y + player.height>=ship1.y && player.y <= ship1.y+ship1.height && player.x+player.width>=ship1.x 
  		|| player.y + player.height>=ship2.y && player.y <= ship2.y+ship2.height && player.x<=ship2.x+ship2.width
  		|| player.y + player.height>=ship.y && player.x<=ship.x+ship.width && player.x+player.width>=ship.x){
		move = 0;
		die.play();
		context.drawImage(hero, player.x, player.y, player.width, player.height);
		hero.src = "img/death.png";
  		player.width = 32;
  		player.height = 32;
  		setTimeout( function(){
		player.y = 0;
  		player.x = 100;
  		player.width = 30;
  		player.height = 60;
  		hero.src = "img/nothing.png";
		}, 3000 );
		setTimeout( function(){
		move = 1;
		}, 5900 );
	}
	else if (controller.ctrl && move == 1 && controller.down == false) {
  		context.drawImage(fight, 30*numfight, 0, 30, 60, player.x, player.y, 30, 60);
  	}
	else if (controller.right && move == 1 && controller.down == false) {
		context.drawImage(walkright, 30*num, 0, 30, 60, player.x, player.y, 30, 60);
	}
	else if (controller.left && move == 1 && controller.down == false) {
		context.drawImage(walkleft, 30*numleft, 0, 30, 60, player.x, player.y, 30, 60);
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
	if ((player.x + player.width)>= 960) {
		context.drawImage(loading, 0, 0, 1024, 640);
	}
	context.drawImage(muteimg, 40, 8, 25, 20);
};

