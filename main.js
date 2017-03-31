
var canX;
var canY;

var mouseMoveOld;
var mouseTimeOld;
var deltaMouse;
var deltaMouseTime;
var canvas;
var ctx;
var squeakSound;
var osc;
var d;


$(document).ready(function() {
	canvas = document.getElementById("mycanvas");
	//canvas.width = 640;
	//canvas.height = 480;
	//scrawl.loadExtensions({
	//	path: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/128723/',
	//	extensions: ['block'],
	//	callback: function() {
	//		window.addEventListener('load',
	//			function() {
	//				scrawl.init(); //run canvas code
	//				main(); },
	//			false); }
	//	}); 
	
	var context = new webkitAudioContext()
	osc = context.createOscillator();
	osc.type = 'sawtooth';
	osc.connect(context.destination);

	ctx = canvas.getContext("2d");
	ctx.fillStyle = "#d8fff7";
	ctx.fillRect(0,0,600,600);
	osc.frequency.value = 0;
	osc.start(0);
	//squeakSound.play();
	canvas.addEventListener("mousemove", mouseXY, false);
});

function main() {
	scrawl.makeBlock({
		startX: 200,
		startY: 200,
		handleX: 'center',
		handleY: 'center',
		width: 200,
		height: 200,
		lineWidth: 10,
		method: 'draw',
		//strokeStyle: 'dotty',
		roll: 0,
	});

	scrawl.render();
}

function mouseXY(e) {
	mouseMoveOld = ((canX * 100) / 600);
	
	canX = e.pageX - canvas.offsetLeft;
	
	deltaMouse = Math.abs(((canX * 100) / 600) - mouseMoveOld) / (Date.now() - mouseTimeOld);
	
    canY = e.pageY - canvas.offsetTop;
	
	if(canX <= 200) {
		canX = 200;
	}
	mouseTimeOld = Date.now();
	//drawDoorPercentageOpen((Math.floor((canX * 100) / 600)), 480, 0);
	drawDoorPercentageOpen((Math.floor((canX * 100) / 600)), 600, 200);
	
	squeak((Math.floor((canX * 100) / 600)));	
	//drawLineAtPlace(canX, canY);
	
	console.log("Tried it");
}

function squeak(px) {
	if(deltaMouse == 0) {
		while(osc.frequency.value > 0) {
			osc.frequency.value--;
		}
		
	}
	else {
		if((px > 55 && px < 65)) {
			console.log(deltaMouse);
			osc.frequency.value = Math.pow(deltaMouse * 2000, 1.5);
		}
		else if((px > 78 && px < 90)) {
			console.log(deltaMouse);
			osc.frequency.value = Math.pow(deltaMouse * 2000, 2);
		}
		else if (px <= 33) {
			osc.frequency.value = 0;
		}
		else {
			osc.frequency.value = Math.pow(deltaMouse * 50, 1.5);
		}
		
	}
	
	
	//console.log(squeakSound.playbackRate);
}

function drawLineAtPlace(posX, posY) {
	ctx.fillRect(0,0,640,480);
	//ctx.moveTo(200,200);
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.moveTo(posX, posY);
    //ctx.rotate();
    ctx.lineTo(posX + 10, posY + 10);
    ctx.stroke();
    //ctx.rotate(-pos);
}

function drawDoorPercentageOpen(px, heightOfDoor, widthOfDoor) {
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