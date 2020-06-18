var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var cnvw = 960;
var cnvh = 640;
var move = 1;
canvas.width = cnvw;
canvas.height = cnvh;
var boxsfx = new Audio('sfx/box.wav');
var fightsfx = new Audio('sfx/fight.wav');
var stabsfx = new Audio('sfx/stab.wav');
boxsfx.volume=0.5;
var stonejmp = new Audio('sfx/stonejmp.mp3');
var stepstone = new Audio('sfx/stepstone.wav');
var music = new Audio('sfx/lvl2.mp3');
var die = new Audio('sfx/die.mp3');
var crouchsfx = new Audio('sfx/crouch.mp3');
var hero = new Image();
var muteimg = new Image();
muteimg.src = "img/mute.png";
var died = new Image();
var death = new Image();
died.src = "img/died.png";
var walkright = new Image();
var walkleft = new Image();
var fight = new Image();
fight.src = "img/fight.png";
var torch = new Image();
var idle = new Image();
var background = new Image();
var loading = new Image();
var ghostimg = new Image();
ghostimg.src = "img/ghost1.png";
loading.src = "img/load.png";
var background2 = new Image();
var floorimg = new Image();
var rockimg = new Image();
var roofimg = new Image();
var stalag = new Image();
var tunnel = new Image();
var box = new Image();
var crouchr = new Image();
var crouchl = new Image();
background.src = "img/Castle/background.png";
background2.src = "img/Castle/back-walls.png"
hero.src = "img/roguer.png";
walkright.src = "img/walkright.png";
walkleft.src = "img/walkleft.png";
idle.src = "img/idle.png";
torch.src = "img/torch.png";
floorimg.src = "img/Castle/floor.png";
stalag.src = "img/Castle/stalag.png";
rockimg.src = "img/Castle/rockimg.png";
roofimg.src = "img/Castle/roof.png";
tunnel.src = "img/Castle/tunnel.png";
box.src = "img/Castle/box.png";
var player = {
	xPrev: 0,
	yPrev: 0,
	width: 30,
	height: 60,
	x: 0,
	y: 520,
	x_velocity: 0,
	y_velocity: 0,
	jump: true,
	crouch: true
};
var enemy = {
	xPrev: 0,
	yPrev: 0,
	width: 30,
	height: 30,
	d: 0,
	x: 700,
	y: 280,
	x_velocity: 0,
	y_velocity: 0,
};
var floor = {
	x: 0,
	y: 580,
	width: 960,
	height: 60
};
var rock = {
	x: 426,
	y: 340,
	width: 534,
	height: 240
}
var roof = {
	x: 426,
	y: 0,
	width: 534,
	height: 240
}
var box1 = {
	x: 200,
	y: 516,
	width: 64,
	height: 64
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
//Перемещение ящика направо
  	if ((player.x + player.width)>=box1.x && box1.x + box1.width < 426 && (player.x + player.width) < box1.x + 1) {
	box1.x += 0.8;
	boxsfx.play();
	stepstone.pause();
	}
	else if ((player.x + player.width) < (box1.x - 5)){
		boxsfx.pause();
	}
//Перемещение ящика налево
  	if ((box1.x + box1.width)>=player.x && box1.x > 0 && player.x > (box1.x + 63) && player.x < 400) {
	box1.x -= 0.8;
	boxsfx.play();
	stepstone.pause();
	}
	else if (player.x > (box1.x + box1.width)){
		boxsfx.pause();
	}
	else if (player.y <= box1.y-box.height) {
		boxsfx.pause();
	}
//Соблюдение границ канваса по x
  	if (player.x > cnvw - player.width){
  		player.x = cnvw - player.width;
  		player.x_velocity = 0;
  	}
  	collideHandler(floor, player);
  	collideHandler(rock, player);
  	collideHandler(roof, player);
  	collideHandler(box1, player);
  	enemy.d += 0.011;
	enemy.x += Math.cos(enemy.d) * 1.1;
	if (controller.ctrl) {
		fightsfx.play();
	}
//Переход на следующий уровень
  	if ((player.x + player.width)>= 960) {
		window.location.replace("lvl3.php");
		move=0;
	}
};

var draw = function () {
	//Фон
	context.drawImage(background, 0, 0, 1024, 640);
	context.drawImage(background2, 0, 0, 1024, 640);
	context.fillRect(box1.x, box1.y, box1.width, box1.height);
	context.drawImage(box, box1.x, box1.y, box1.width, box1.height);
	context.drawImage(tunnel, 426, 240, 536, 100);
	context.drawImage(torch, 32*numtorch, 0, 25, 50, 694, 258, 25, 50);
	//Игрок
	context.fillStyle = 'rgba(0, 0, 0, 0.0)';
  	context.fillRect(player.x, player.y, player.width, player.height);
  	if (controller.ctrl && move == 1 && controller.down == false) {
  		context.drawImage(fight, 30*numfight, 0, 30, 60, player.x, player.y, 30, 60);
  	}
	else if (controller.right && move == 1 && controller.down == false && controller.ctrl == false) {
		context.drawImage(walkright, 30*num, 0, 30, 60, player.x, player.y, 30, 60);
	}
	else if (controller.left && move == 1 && controller.down == false && controller.ctrl == false) {
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
	if (player.x+player.width>=enemy.x && player.x <= enemy.x+enemy.width){
		move = 0;
		jumpable = 0;
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
		jumpable = 1;
		}, 5900 );
	}
	if (player.x+player.width>=enemy.x-60 && player.x<=enemy.x+60 && controller.ctrl){
	enemy.x = -200;
	stabsfx.play();
	}
	//Блоки
	context.fillStyle = 'rgba(0, 0, 0, 0.0)';
	context.fillRect(floor.x, floor.y, floor.width, floor.height);
	context.drawImage(floorimg, floor.x, floor.y, floor.width, floor.height);
	context.fillRect(rock.x, rock.y, rock.width, rock.height);
	context.drawImage(rockimg, rock.x, rock.y, rock.width, rock.height);
	context.fillRect(roof.x, roof.y, roof.width, roof.height);
	context.drawImage(roofimg, roof.x, roof.y, roof.width, roof.height);
	context.drawImage(stalag, 186, 0, 240, 36);
	context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
	context.drawImage(ghostimg, enemy.x, enemy.y, enemy.width, enemy.height);
	context.drawImage(muteimg, 40, 8, 25, 20);
	if (move == 0) {
		context.drawImage(died, 391, 250, 178, 178);
	}
	if ((player.x + player.width)>= 960) {
		context.drawImage(loading, 0, 0, 1024, 640);
	}
};

