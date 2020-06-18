var num=1;
var numleft=1;
var numidle=1;
var numtorch=1;
var numsnow=1;
var numfight=1;
var numbat=1;
var numbossleft=1;
var numbossright=1;
//Кадры движения направо
setInterval(function() { 
	if(num >= 9) {
		num=1;
	}
	else{
		num+=1;
	}
}, 85);
//Кадры движения налево
setInterval(function() { 
	if(numleft >= 9) {
		numleft=1;
	}
	else{
		numleft+=1;
	}
}, 85);
//Кадры отдыха
setInterval(function() { 
	if(numidle >= 9) {
		numidle=1;
	}
	else{
		numidle+=1;
	}
}, 200);
//Кадры факела
setInterval(function() { 
	if(numtorch >= 8) {
		numtorch=1;
	}
	else{
		numtorch+=1;
	}
}, 200);
//Кадры дождя
setInterval(function() { 
	if(numsnow >= 15) {
		numsnow=1;
	}
	else{
		numsnow+=1;
	}
}, 75);
//Кадры удара
setInterval(function() { 
	if(numfight >= 9) {
		numfight=1;
	}
	else{
		numfight+=1;
	}
}, 75);
//Кадры летучей мыши
setInterval(function() { 
	if(numbat >= 3) {
		numbat=1;
	}
	else{
		numbat+=1;
	}
}, 150);
//Кадры движения босса налево
setInterval(function() { 
	if(numbossleft >= 7) {
		numbossleft=1;
	}
	else{
		numbossleft+=1;
	}
}, 120);