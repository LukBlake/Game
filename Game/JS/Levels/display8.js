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
var Boss = new Audio('sfx/Boss.mp3');
var rain = new Audio('sfx/rain.mp3');
var stabsfx = new Audio('sfx/stab.wav');
var crouchsfx = new Audio('sfx/crouch.mp3');
var hero = new Image();
var muteimg = new Image();
muteimg.src = "img/mute.png";
var bg = new Image();
bg.src = "img/bg.png";
var bossimgleft = new Image();
bossimgleft.src = "img/bossleft.png";
var bossimgright = new Image();
bossimgright.src = "img/bossright.png";
var tree1 = new Image();
var tree2 = new Image();
var titleboss = new Image();
titleboss.src = "img/titleboss.png";
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
floorimg.src = "img/forest/lvl2/floor0.png";
blockleft.src = "img/forest/platform2.png";
blockright.src = "img/forest/platform2.png";
var crouch1 = 1;
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
	crouch: true,
};
var obstacle = {
	x: 50,
	y: 430,
	width: 170,
	height: 30
};
var block2 = {
	x: 390,
	y: 430,
	width: 170,
	height: 30
};
var block3 = {
	x: 740,
	y: 430,
	width: 170,
	height: 30
};
var floor = {
	x: 0,
	y: 598,
	width: 960,
	height: 42
};
var boss = {
	xp: 3,
	ctrl: 0,
	width: 100,
	height: 100,
	x: 700,
	y: 498,
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
	if (player.y > 575){
		move = 0;
	}
//Приседание
	if(controller.down && move == 1 && crouch1 == 1) {
		hero.src = "img/crouchr.png";
		player.crouch = true;
	}
//Движение направо присев
	if(controller.right && move == 1 && controller.down && crouch1 == 1) {
		player.x_velocity -= 0.3;
		crouchsfx.play();
	}
//Движение налево присев
	if(controller.left && move == 1 && controller.down && crouch1 == 1) {
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
        Boss.play();
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
  	collideHandler(block3, player);
  	collideHandler(floor, player);
  	if (controller.ctrl) {
		fightsfx.play();
	}
	//Переход на следующий уровень

	if (boss.x>=player.x+player.width && boss.xp != 0 && player.move !=0) {
		boss.x -= 2.5; }
	else if (boss.x+boss.width<=player.x && boss.xp != 0 && player.move !=0) {
		boss.x += 2.5; }
};


var draw = function () {
	//Фон
	context.drawImage(background, 0, 0, 1024, 640);
	context.drawImage(background2, 0, 0, 1024, 640);
	context.drawImage(background3, 0, 0, 1024, 640);
	context.drawImage(background4, 0, 0, 1024, 640);
	context.drawImage(snow, 64*numsnow, 0, 600, 64, 0, 0, 960, 640);
	context.fillStyle = "green";
		//Блоки
	context.fillStyle = 'rgba(0, 0, 0, 0.0)';
	context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
	context.drawImage(blockleft, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
	context.fillRect(block2.x, block2.y, block2.width, block2.height);
	context.drawImage(blockright, block2.x, block2.y, block2.width, block2.height);
	context.fillRect(block3.x, block3.y, block3.width, block3.height);
	context.drawImage(blockright, block3.x, block3.y, block3.width, block3.height);
	context.fillRect(floor.x, floor.y, floor.width, floor.height);
	context.drawImage(floorimg, floor.x, floor.y, floor.width, floor.height);
	//Игрок
	context.fillStyle = 'rgba(0, 0, 0, 0.0)';
  	context.fillRect(player.x, player.y, player.width, player.height);
  	if (player.x+player.width <= boss.x-100 && player.x >= boss.x+boss.width+100){
  		crouch1 = 0;
  	}
  	if (player.x+player.width>=boss.x && player.x<=boss.x+boss.width && player.y+player.height>=boss.y){
		move = 0;
		player.crouch1 = 0;
		die.play();
		context.drawImage(hero, player.x, player.y, player.width, player.height);
		hero.src = "img/death.png";
  		player.width = 32;
  		player.height = 32;
  		setTimeout( function(){
		player.y = 300;
  		player.x = 100;
  		player.width = 30;
  		player.height = 60;
  		hero.src = "img/nothing.png";
  		boss.xp=3;
		}, 3000 );
		setTimeout( function(){
		move=1;
		player.crouch1 = 1;
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
	if (player.x+player.width>=boss.x-60 && player.x<=boss.x+boss.width+60 && controller.ctrl && boss.ctrl == 0 && player.y+player.height>=boss.y){
	boss.ctrl = 1;
	boss.xp-=1
	setTimeout( function(){
		boss.ctrl=0;
		}, 1000 );
	stabsfx.play();
	}
	if (boss.xp == 0) {
		boss.x = -1000;
		boss.y = 2000;
		Boss.pause();
		context.drawImage(bg, 220, 200, 500, 240);
		setTimeout( function(){
		window.location.replace("index.php");
		}, 2000 );
	}
	context.fillRect(boss.x, boss.y, boss.width, boss.height);
	if (boss.x>=player.x && boss.xp != 0) {
		context.drawImage(bossimgleft, 64*numbossleft, 0, 64, 64, boss.x, boss.y, 100, 100);	}
	else if (boss.x<=player.x && boss.xp != 0) {
		context.drawImage(bossimgright, 64*numbossleft, 0, 64, 64, boss.x, boss.y, 100, 100);	}
	if (boss.xp == 3){
		context.drawImage(titleboss, 380, 60, 200, 35);
		context.fillStyle="red";
		context.fillRect(330, 100, 98, 10);
		context.fillRect(430, 100, 98, 10);
		context.fillRect(530, 100, 98, 10);
	}
	else if (boss.xp == 2){
		context.drawImage(titleboss, 380, 60, 200, 35);
		context.fillStyle="red";
		context.fillRect(330, 100, 98, 10);
		context.fillRect(430, 100, 98, 10);
	}
	else if (boss.xp == 1){
		context.drawImage(titleboss, 380, 60, 200, 35);
		context.fillStyle="red";
		context.fillRect(330, 100, 98, 10);
	}
	context.drawImage(muteimg, 40, 8, 25, 20);
};

