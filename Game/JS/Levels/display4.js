var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var cnvw = 960;
var cnvh = 640;
var move = 1;
canvas.width = cnvw;
canvas.height = cnvh;
var stonejmp = new Audio('sfx/stonejmp.mp3');
var fightsfx = new Audio('sfx/fight.wav');
var stepstone = new Audio('sfx/stepstone.wav');
var stabsfx = new Audio('sfx/stab.wav');
var music = new Audio('sfx/lvl2.mp3');
var die = new Audio('sfx/die.mp3');
var crouchsfx = new Audio('sfx/crouch.mp3');
var hero = new Image();
var muteimg = new Image();
muteimg.src = "img/mute.png";
var walkright = new Image();
var walkleft = new Image();
var batimg = new Image();
var fight = new Image();
fight.src = "img/fight.png";
var idle = new Image();
var background = new Image();
var loading = new Image();
loading.src = "img/load.png";
var background2 = new Image();
var floor1img = new Image();
var floor2img = new Image();
var floor3img = new Image();
var floor4img = new Image();
var roof1img = new Image();
var roof2img = new Image();
var roof3img = new Image();
var backbot = new Image();
var wall = new Image();
var backtop = new Image();
var died = new Image();
var gts = new Image();
var crouchr = new Image();
var crouchl = new Image();
var shipimg = new Image();
var ship2img = new Image();
background.src = "img/Castle/background.png";
background2.src = "img/Castle/back-walls.png"
hero.src = "img/roguer.png";
walkright.src = "img/walkright.png";
walkleft.src = "img/walkleft.png";
batimg.src = "img/bat.png";
idle.src = "img/idle.png";
died.src = "img/died.png";
gts.src = "img/Castle/lvl4/gtsclosed.png";
wall.src = "img/Castle/lvl4/wall.png";
floor1img.src = "img/Castle/lvl4/floor1.png";
floor2img.src = "img/Castle/lvl4/floor2.png";
floor3img.src = "img/Castle/lvl4/floor3.png";
floor4img.src = "img/Castle/lvl4/floor4.png";
roof1img.src = "img/Castle/lvl4/roof1.png";
roof2img.src = "img/Castle/lvl4/roof2.png";
roof3img.src = "img/Castle/lvl4/roof3.png";
backbot.src = "img/Castle/lvl4/backbot.png";
backtop.src = "img/Castle/lvl4/backtop.png";
shipimg.src = "img/Castle/lvl4/ship.png";
ship2img.src = "img/Castle/lvl4/ship2.png";
var player = {
	xPrev: 0,
	yPrev: 0,
	width: 30,
	height: 60,
	x: 0,
	y: 490,
	x_velocity: 0,
	y_velocity: 0,
	jump: true,
	crouch: true
};
var floor1 = {
	x: 0,
	y: 566,
	width: 300,
	height: 74
}
var floor2 = {
	x: 300,
	y: 496,
	width: 170,
	height: 70
}
var floor3 = {
	x: 470,
	y: 416,
	width: 170,
	height: 80
}
var floor4 = {
	x: 640,
	y: 348,
	width: 320,
	height: 68
}
var roof1 = {
	x: 0,
	y: 301,
	width: 165,
	height: 100
}
var roof2 = {
	x: 165,
	y: 208,
	width: 133,
	height: 93
}
var roof3 = {
	x: 298,
	y: 123,
	width: 662,
	height: 85
}
var ship = {
	x: 355,
	y: 454,
	width: 64,
	height: 42
}
var ship2 = {
	x: 598,
	y: 352,
	width: 42,
	height: 64
}
var bat = {
	xPrev: 0,
	yPrev: 0,
	width: 32,
	height: 31,
	x: 150,
	y: 480,
	x_velocity: 0,
	y_velocity: 0,
};
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
//Приседание
	if(controller.down && move == 1) {
		hero.src = "img/crouchr.png";
		player.crouch = true;
		bat.y=450;
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
		stepstone.play();
	}
	if (controller.enter) {
        music.play();
        music.volume=0.5;
    }
    canvas.addEventListener('click', function() {
    	music.pause();
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
  	if (player.x + player.width >= 855 && player.x<=919) {
		gts.src = "img/Castle/lvl4/gtsopen.png";
	}
else {gts.src = "img/Castle/lvl4/gtsclosed.png";}
  	collideHandler(floor1, player);
  	collideHandler(floor2, player);
  	collideHandler(floor3, player);
  	collideHandler(floor4, player);
  	collideHandler(roof1, player);
  	collideHandler(roof2, player);
  	collideHandler(roof3, player);
  	if (controller.ctrl) {
		fightsfx.play();
	}
//Переход на следующий уровень
  	if ((player.x + player.width)>= 855 && controller.enter && player.x<=919) {
		window.location.replace("lvl5.php");
	}
};


var draw = function () {
	//Фон
	context.drawImage(background, 0, 0, 1024, 640);
	context.drawImage(background2, 0, 0, 1024, 640);
	context.drawImage(wall, 815, 205, 150, 150);
	context.drawImage(gts, 855, 253, 64, 95);
	//Игрок
	context.fillStyle = 'rgba(0, 0, 0, 0.0)';
  	context.fillRect(player.x, player.y, player.width, player.height);
  	if (player.y>=400 && player.x+player.width>=ship.x && player.x<=ship.x+ship.width){
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
		move=1;
		}, 5900 );
	}
	else if (player.y + player.height>=352 && player.x+player.width>=ship2.x && player.x<=ship2.x+ship2.width){
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
		move=1;
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
	//Блоки
	context.fillRect(floor1.x, floor1.y, floor1.width, floor1.height);
	context.drawImage(floor1img, floor1.x, floor1.y, floor1.width, floor1.height);
	context.fillRect(floor2.x, floor2.y, floor2.width, floor2.height);
	context.drawImage(floor2img, floor2.x, floor2.y, floor2.width, floor2.height);
	context.fillRect(floor3.x, floor3.y, floor3.width, floor3.height);
	context.drawImage(floor3img, floor3.x, floor3.y, floor3.width, floor3.height);
	context.fillRect(floor4.x, floor4.y, floor4.width, floor4.height);
	context.drawImage(floor4img, floor4.x, floor4.y, floor4.width, floor4.height);
	context.fillRect(roof1.x, roof1.y, roof1.width, roof1.height);
	context.drawImage(roof1img, roof1.x, roof1.y, roof1.width, roof1.height);
	context.fillRect(roof2.x, roof2.y, roof2.width, roof2.height);
	context.drawImage(roof2img, roof2.x, roof2.y, roof2.width, roof2.height);
	context.fillRect(roof3.x, roof3.y, roof3.width, roof3.height);
	context.drawImage(roof3img, roof3.x, roof3.y, roof3.width, roof3.height);
	context.drawImage(backbot, 0, 0, 960, 640);
	context.drawImage(backtop, 0, 0, 960, 640);
	context.fillRect(ship.x, ship.y, ship.width, ship.height);
	context.drawImage(shipimg, ship.x, ship.y, ship.width, ship.height);
	context.fillRect(ship2.x, ship2.y, ship2.width, ship2.height);
	context.drawImage(ship2img, ship2.x, ship2.y, ship2.width, ship2.height);
	context.fillRect(bat.x, bat.y, bat.width, bat.height);
	context.drawImage(batimg, 32*numbat, 0, 32, 31, bat.x, 480, 32, 31);
	if (player.x+player.width>=bat.x && player.x <= bat.x+bat.width && player.y<=bat.y+bat.height){
		move = 0;
		jumpable = 0;
		die.play();
		context.drawImage(hero, player.x, player.y, player.width, player.height);
		hero.src = "img/death.png";
  		player.width = 32;
  		player.height = 32;
  		setTimeout( function(){
		player.y = 452;
  		player.x = 0;
  		player.width = 30;
  		player.height = 60;
  		hero.src = "img/nothing.png";
		}, 3000 );
		setTimeout( function(){
		move = 1;
		jumpable = 1;
		}, 5900 );
	}
	bat.y=480;
	if (player.x+player.width>=bat.x-60 && player.x<=bat.x+60 && controller.ctrl){
	bat.x = -1000;
	bat.y = 2000;
	stabsfx.play();
	}
	if (move == 0) {
		context.drawImage(died, 391, 250, 178, 178);
	}
	if ((player.x + player.width)>= 855 && controller.enter && player.x<=919) {
		context.drawImage(loading, 0, 0, 1024, 640);
	}
	context.drawImage(muteimg, 40, 8, 25, 20);
};

