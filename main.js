
var canX;
var canY;

var mouseMoveOld;
var mouseTimeOld;
var deltaMouse;
var deltaMouseTime;
var canvas;
var ctx;
var squeakSound;
var context;
var osc;
var d;


$(document).ready(function() {
	canvas = document.getElementById("mycanvas");
	var doorColor = "#d8fff7";
	var canvasWidth = 600;
	var canvasHeight = 600;
	context = new AudioContext()
	osc = context.createOscillator();
	osc.type = 'sawtooth';
	osc.connect(context.destination);

	ctx = canvas.getContext("2d");
	ctx.fillStyle = doorColor;
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
	osc.frequency.value = 0;
	osc.start(0);
	//squeakSound.play();
	canvas.addEventListener("mousemove", mouseXY, false);
	drawDoorPercentageOpen(100, 600, 200);
	canvas.addEventListener('click', function() {
		context.resume().then(() => {
			return;
		});
	});
});

function mouseXY(e) {
	mouseMoveOld = ((canX * 100) / 600);
	
	canX = e.pageX - canvas.offsetLeft;
	
	deltaMouse = Math.abs(((canX * 100) / 600) - mouseMoveOld) / (Date.now() - mouseTimeOld);
	
    canY = e.pageY - canvas.offsetTop;
	
	if(canX <= 200) {
		canX = 200;
	}
	mouseTimeOld = Date.now();
	drawDoorPercentageOpen((Math.floor((canX * 100) / 600)), 600, 200);

	squeak((Math.floor((canX * 100) / 600)));	
}

function squeak(px) {
	var freq = Math.pow((deltaMouse * 2000) - 30, 1.25);
	console.log(freq);
	if(isNaN(freq)) {
		while(osc.frequency.value > 0) {
			osc.frequency.value--;
		}
		
	}
	else {
		if(freq < 60) {
			osc.frequency.value = 0;
		}
		else {
			osc.frequency.value = freq;
		}
	}
}

function drawLineAtPlace(posX, posY) {
	ctx.fillRect(0,0,640,480);
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.moveTo(posX, posY);
    ctx.lineTo(posX + 10, posY + 10);
    ctx.stroke();
}


// percentage -- int, between 0 and 100
// height of door -- int, how big the door should be in pixels
// width of door -- int, how wide the door should be in pixels
function drawDoorPercentageOpen(percentage, heightOfDoor, widthOfDoor) {
	px = percentage;
	ctx.fillStyle = "#d8fff7";
	ctx.fillRect(0,0,600,600);
	
	var py = heightOfDoor * (Math.cos((px / 100) * (Math.PI) / 2)) / 4;
	var p2y = heightOfDoor-py;
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(widthOfDoor,0);
	ctx.lineTo((px / 100) * 600, py);
	ctx.lineTo((px / 100) * 600, p2y);
	ctx.lineTo(widthOfDoor,heightOfDoor);
	ctx.fillStyle = "rgb(255, 0, 0)";
	ctx.fill();
	ctx.stroke();
	//console.log(px);
	ctx.beginPath();
	
	ctx.fillStyle = "rgb(0, 255, 0)";
	ctx.ellipse((px * 5.5) + 10 + (10 * Math.sin(((px) / 100) * (Math.PI / 2))), (5 * heightOfDoor) / 8,
				20 * (1 - Math.cos((((px - 33) / 67) * (Math.PI / 2)))),
				20, 0, Math.PI * 2, 0);
	ctx.fill();
	
}
