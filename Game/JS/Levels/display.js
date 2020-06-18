var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var cnvw = 960;
var cnvh = 640;
var move = 1;
var jumpable = 1;
canvas.width = cnvw;
canvas.height = cnvh;
var step = new Audio('sfx/stepl.flac');
var stonejmp = new Audio('sfx/stonejmp.mp3');
var fightsfx = new Audio('sfx/fight.wav');
var die = new Audio('sfx/die.mp3');
var crouchsfx = new Audio('sfx/crouch.mp3');
var hero = new Image();
var walkright = new Image();
var walkleft = new Image();
var fight = new Image();
fight.src = "img/fight.png";
var torch = new Image();
var idle = new Image();
var muteimg = new Image();
muteimg.src = "img/mute.png";
var background = new Image();
var loading = new Image();
loading.src = "img/load.png";
var blockleft = new Image();
var blockright = new Image();
var box = new Image();
var died = new Image();
var wall = new Image();
var gts = new Image();
var note = new Image();
var note1 = new Image();
var quote = new Image();
var crouchr = new Image();
var crouchl = new Image();
background.src = "img/background.png";
hero.src = "img/roguer.png";
walkright.src = "img/walkright.png";
walkleft.src = "img/walkleft.png";
idle.src = "img/idle.png";
died.src = "img/died.png";
torch.src = "img/torch.png";
wall.src = "img/wall.png";
gts.src = "img/gtsclosed.png";
blockleft.src = "img/blockleft.png";
blockright.src = "img/blockright.png";
box.src = "img/box.png";
note.src = "img/note.png";
note1.src = "img/note1.png";
quote.src = "img/quote.png";
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
	y: 512,
	width: 384,
	height: 128
};
var block2 = {
	x: 576,
	y: 512,
	width: 384,
	height: 128
};
var block3 = {
	x: 730,
	y: 400,
	width: 100,
	height: 60
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
	if(controller.up && player.jump === false && move == 1 && jumpable == 1) {
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
        music.play();
        music.volume=1;
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
//Ворота
if (player.x > 855 && player.x < 905 && player.y > 390) {
		gts.src = "img/gtsopen.png";
	}
else {gts.src = "img/gtsclosed.png";}
//Соблюдение границ канваса по x
  	if (player.x > cnvw - player.width){
  		player.x = cnvw - player.width;
  		player.x_velocity = 0;
  	}
  	collideHandler(obstacle, player);
  	collideHandler(block2, player);
  	if (controller.ctrl) {
		fightsfx.play();
	}
//Переход на следующий уровень
  	if(controller.enter && player.x > 855 && player.x < 900 && player.y > 390) {
		window.location.replace("lvl2.php");
	}
};

var draw = function () {
	//Фон
	context.drawImage(background, 0, 0, 1024, 640);
	context.fillStyle = "green";
	context.drawImage(box, 15, 447, 64, 64);
	context.drawImage(note, 310, 447, 64, 64);
	context.drawImage(wall, 800, 320, 256, 192);
	context.drawImage(gts, 855, 417, 64, 95);
	context.drawImage(torch, 32*numtorch, 0, 25, 50, 815, 440, 25, 50);
	context.drawImage(torch, 32*numtorch, 0, 25, 50, 926, 440, 25, 50);
	if (player.x > 280 && player.x < 350 && player.y > 390) {
		context.drawImage(quote, 325, 390, 64, 64);
	}
	if (player.x > 855 && player.x < 905 && player.y > 390) {
		context.drawImage(note1, 835, 375, 106, 53);
	}
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
	context.drawImage(muteimg, 40, 8, 25, 20);
};

