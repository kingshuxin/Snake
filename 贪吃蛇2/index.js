var cvs=document.getElementById('cvs')
var ctx=cvs.getContext('2d');

cvs.width = 800;
cvs.height = 600;

var snakeSize = 20;
var cvsX = cvs.width/snakeSize;
var cvsY = cvs.height/snakeSize;
var length = 0;
var snakeBody = {};
var dire = 2;
var food = {};
var direFlag = 0;
var score = 0;


function init(){
 	length = 0;
 	snakeBody = [];
 	for(var i = 0;i < 3;i ++) createsnakeNode(parseInt(cvsX/2) + i,parseInt(cvsY/2));
 	drawSnake();
 	putFood();
 	localStorage.highestScore ? document.getElementById('highestScore').innerText = localStorage.highestScore : document.getElementById('highestScore').innerText = localStorage.highestScore = "3";
 }

function createsnakeNode (x,y){
 	snakeBody.push({x:x,y:y,color:length === 0 ? '#f00' : '#000'});
 	length ++;
 	setHighestScore();
 	document.getElementById('score').innerText = length;
}
function setHighestScore(){
 	if(parseInt(localStorage.highestScore) < length) document.getElementById('highestScore').innerText = localStorage.highestScore = length.toString();
}
function drawRect(snakeNode){
 	ctx.beginPath();
 	ctx.fillStyle = snakeNode.color;
 	ctx.fillRect(snakeSize * snakeNode.x,snakeSize * snakeNode.y,snakeSize,snakeSize);
 	ctx.closePath();
 }
function drawSnake(){
	ctx.clearRect(0,0,cvs.width,cvs.height);
	for(var i = 0;i < snakeBody.length;i ++){
	drawRect(snakeBody[i]);
	drawRect(food);
	}
}
function setDirection(dir){
	direFlag = 1;
	if (Math.abs(dir) === Math.abs(dire)) return;
	dire = dir;
}	
document.onkeydown = function (e){
	if (direFlag) return;
	e.preventDefault();
	if(e.keyCode === 38) setDirection(1);
	if(e.keyCode === 40) setDirection(-1);
	if(e.keyCode === 37) setDirection(2);
	if(e.keyCode === 39) setDirection(-2);
}

function snakeMove(){
 	var newSnakeHeadNode = {x: snakeBody[0].x,y: snakeBody[0].y,color: snakeBody[0].color};
 	if (dire === 1) newSnakeHeadNode.y -=1;
	if (dire === -1) newSnakeHeadNode.y +=1;
	if (dire === 2) newSnakeHeadNode.x -=1;
	if (dire === -2) newSnakeHeadNode.x +=1;

 	for(var i = snakeBody.length - 1;i > 0;i --){	
		snakeBody[i].x = snakeBody[i - 1].x;
		snakeBody[i].y = snakeBody[i - 1].y;
		if ((snakeBody[i].x === newSnakeHeadNode.x) && (snakeBody[i].y === newSnakeHeadNode.y)) {
			gameOver();
			return;
		}
	}
	snakeBody[0] = newSnakeHeadNode;
	direFlag = 0;
	outOfBorder(snakeBody[0]);
	isGetFood(snakeBody[0]);
	drawSnake();
}

function gameOver(){
	alert('GAMEOVER');
	init();
	dire = 2;
}
function isGetFood(node){
	if (node.x ===food.x && node.y === food.y) {
		putFood();
		createsnakeNode(snakeBody[snakeBody.length - 1].x,snakeBody[snakeBody.length - 1].y);
	}	
}
function outOfBorder(node){
	if (node.x < 0 || node.x > cvsX - 1 || node.y < 0 || node.y > cvsY - 1 )
		gameOver();
}
function putFood(){
	var flag = 1;
	while(flag){	
		var foodX = parseInt(Math.random() * cvsX);
		var foodY = parseInt(Math.random() * cvsY);
		for (var i = 0;i < snakeBody.length;i ++) {
			if (snakeBody[i].x === foodX && snakeBody[i].y === foodY) flag = 0;
		}
		if (flag) break;
	}
	food = {x: foodX,y: foodY,color:'#ff0'};
}

init();
setInterval(function(){ 
	snakeMove(); 
}, 200);


