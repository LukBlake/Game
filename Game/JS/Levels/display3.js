var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var cnvw = 960;
var cnvh = 640;
var move = 1;
var jumpable = 1;
canvas.width = cnvw;
canvas.height = cnvh;
var boxsfx = new Audio('sfx/box.wav');
var fightsfx = new Audio('sfx/fight.wav');
boxsfx.volume=0.5;
var stonejmp = new Audio('sfx/stonejmp.mp3');
var stepstone = new Audio('sfx/stepstone.wav');
var crouchsfx = new Audio('sfx/crouch.mp3');
var music = new Audio('sfx/lvl2.mp3');
crouchsfx.volume=0.7;
var hero = new Image();
var muteimg = new Image();
muteimg.src = "img/mute.png";
var walkright = new Image();
var walkleft = new Image();
var fight = new Image();
fight.src = "img/fight.png";
var torch = new Image();
var idle = new Image();
var background = new Image();
var loading = new Image();
loading.src = "img/load.png";
var background2 = new Image();
var floorimg = new Image();
var rockimg = new Image();
var roofimg = new Image();
var stalagimg = new Image();
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
floorimg.src = "img/Castle/lvl3/floor.png";
stalagimg.src = "img/Castle/lvl3/stalag.png";
rockimg.src = "img/Castle/lvl3/rockimg.png";
roofimg.src = "img/Castle/lvl3/roof.png";
tunnel.src = "img/Castle/lvl3/tunnel2.png";
box.src = "img/Castle/box.png";
var player = {
	xPrev: 0,
	yPrev: 0,
	width: 30,
	height: 60,
	x: 0,
	y: 280,
	x_velocity: 0,
	y_velocity: 0,
	jump: true,
	crouch: true
};
var floor = {
	x: 0,
	y: 580,
	width: 960,
	height: 60
};
var rock = {
	x: 0,
	y: 340,
	width: 960,
	height: 240
}
var roof = {
	x: 0,
	y: 0,
	width: 960,
	height: 240
}
var box1 = {
	x: 200,
	y: 516,
	width: 64,
	height: 64
};
var stalag = {
	x: 300,
	y: 240,
	width: 400,
	height: 50
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
	if(controller.up && player.jump === false && move == 1 && jumpable == 1) {
		player.y_velocity -= 20;
		player.jump = true;
		stonejmp.play();
	}
//Приседание
	if(controller.down && move == 1 && player.jump == false) {
		hero.src = "img/crouchr.png";
		player.crouch = true;
	}
//Движение направо присев
	if(controller.right && move == 1 && controller.down) {
		player.x_velocity -= 0.3;
	}
//Движение налево присев
	if(controller.left && move == 1 && controller.down) {
		player.x_velocity += 0.3;
	}
//Обработка приседания--------------------------------------------------------------------------------------------------------------------
	if (controller.down && move == 1)																									//
	{																																	//
		stalag.y = 220;																													//
	}																																	//	
	else {																																//	
		stalag.y = 240;																													//
	}																																	//
	if ((player.x+player.width)>stalag.x && player.x<(stalag.x+stalag.width) && controller.down == false && controller.right) {			//
		player.x_velocity -=0.3;																										//
		jumpable =0;																													//
		crouchsfx.play();																												//
	}																																	//
	else if ((player.x+player.width)>stalag.x && player.x<(stalag.x+stalag.width) && controller.down == false && controller.left) {		//
		player.x_velocity +=0.3;																										//
		jumpable =0;																													//
		crouchsfx.play();																												//
	}																																	//
	else {jumpable =1;}																													//
//----------------------------------------------------------------------------------------------------------------------------------------

//Движение направо
	if (controller.right && move == 1) {
		player.x_velocity += 0.5;
	}
//Движение налево
	if (controller.left && move == 1) {
		player.x_velocity -= 0.5;
	}
//Звук шагов
	if (controller.left && move == 1 && player.jump == false && controller.down == false && player.x+player.width <= stalag.x || controller.right && move == 1 && player.jump == false
	 && controller.down == false && player.x+player.width <= stalag.x) {
		stepstone.play();
	}
	else if (controller.left && move == 1 && player.jump == false && controller.down == false && player.x >= 700|| controller.right && move == 1 && player.jump == false
	 && controller.down == false && player.x >= 700) {
		stepstone.play();
	}
//Звук шагов в присяди
	if (controller.left && move == 1 && player.jump == false && controller.down == true || controller.right && move == 1 && player.jump == false && controller.down == true) {
		crouchsfx.play();
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
  	collideHandler(floor, player);
  	collideHandler(rock, player);
  	collideHandler(roof, player);
  	collideHandler(box1, player);
  	collideHandler(stalag, player);
  	if (controller.ctrl && (player.x+player.width)<=stalag.x) {
		fightsfx.play();
	}
	else if (controller.ctrl && player.x>=stalag.x+stalag.width) {
		fightsfx.play();
	}
//Переход на следующий уровень
  	if ((player.x + player.width)>= 960) {
		window.location.replace("lvl4.php");
		move=0;
	}
};


var draw = function () {
	//Фон
	context.drawImage(background, 0, 0, 1024, 640);
	context.drawImage(background2, 0, 0, 1024, 640);
	context.fillRect(box1.x, box1.y, box1.width, box1.height);
	context.drawImage(box, box1.x, box1.y, box1.width, box1.height);
	context.drawImage(tunnel, 0, 240, 536, 100);
	context.drawImage(tunnel, 508, 240, 536, 100);
	context.drawImage(torch, 32*numtorch, 0, 25, 50, 235, 258, 25, 50);
	context.drawImage(torch, 32*numtorch, 0, 25, 50, 743, 258, 25, 50);
	//Игрок
	context.fillStyle = 'rgba(0, 0, 0, 0.0)';
  	context.fillRect(player.x, player.y, player.width, player.height);
	if (controller.ctrl && move == 1 && controller.down == false && player.x+player.width <= stalag.x) {
  		context.drawImage(fight, 30*numfight, 0, 30, 60, player.x, player.y, 30, 60);
  	}
  	else if (controller.ctrl && move == 1 && controller.down == false && player.x >= stalag.x + stalag.width) {
  		context.drawImage(fight, 30*numfight, 0, 30, 60, player.x, player.y, 30, 60);
  	}
	else if (controller.right && controller.down == false && player.x >= 700) {
		context.drawImage(walkright, 30*num, 0, 30, 60, player.x, player.y, 30, 60);
	}
	else if (controller.right && controller.down == false && player.x+player.width < 300) {
		context.drawImage(walkright, 30*num, 0, 30, 60, player.x, player.y, 30, 60);
	}
	else if (controller.left && move == 1 && controller.down == false && player.x >= 700) {
		context.drawImage(walkleft, 30*numleft, 0, 30, 60, player.x, player.y, 30, 60);
	}
	else if (controller.left && move == 1 && controller.down == false && player.x <= 300) {
		context.drawImage(walkleft, 30*numleft, 0, 30, 60, player.x, player.y, 30, 60);
	}
	else if (move == 1 && controller.down) {
		context.drawImage(hero, player.x, player.y, player.width, player.height);
		hero.src = "img/crouchr.png";
	}
	else if ((player.x+player.width) > stalag.x && player.x < (stalag.x+stalag.width)) {
		context.drawImage(hero, player.x, player.y, player.width, player.height);
		hero.src = "img/crouchr.png";
	}
	else {
		context.drawImage(idle, 30*numidle, 0, 30, 60, player.x, player.y, 30, 60);
	}
	//Блоки
	context.fillStyle = 'rgba(0, 0, 0, 0.0)';
	context.fillRect(floor.x, floor.y, floor.width, floor.height);
	context.drawImage(floorimg, floor.x, floor.y, floor.width, floor.height);
	context.fillRect(rock.x, rock.y, rock.width, rock.height);
	context.drawImage(rockimg, rock.x, rock.y, rock.width, rock.height);
	context.fillRect(roof.x, roof.y, roof.width, roof.height);
	context.drawImage(roofimg, roof.x, roof.y, roof.width, roof.height);
	context.fillRect(stalag.x, stalag.y, stalag.width, stalag.height);
	context.drawImage(stalagimg, stalag.x, 240, stalag.width, stalag.height);
	if ((player.x + player.width)>= 960) {
		context.drawImage(loading, 0, 0, 1024, 640);
	}
	context.drawImage(muteimg, 40, 8, 25, 20);
};

