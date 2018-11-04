const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

var requestId;
let pause = false;

canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100;

ctx.moveTo(0, 0);

let container = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

let paddle = {
    x: 10,
    y: 100,
    width: 20,
    height: 70,
    color: '#BADA55'
}

let ball = {
    x: 200,
    y: 200,
    vx: 7,
    vy: 7,
    r: 20,
    color: '#BADA55',
}

function start() {
    if (!requestId) {
       requestId = window.requestAnimationFrame(loop);
    }
}

function stop() {
    pause = true;
    canvas.removeEventListener('mousemove', drawPaddle);
}

function drawPaddle(e) {
    ctx.strokeStyle = paddle.color;
    ctx.fillStyle = '#BADA55';
    if(e !== undefined) {
        if(e.offsetY <= canvas.height - paddle.height)
            paddle.y = e.offsetY;
    }
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawGameBoard() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(container.x, container.y, container.width, container.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, true);
    ctx.fill();

    if (ball.x - ball.r + ball.vx < paddle.x + paddle.width && ball.y + ball.r + ball.vy > paddle.y && ball.y + ball.r + ball.vy < paddle.y + paddle.height) {
        ball.vx = -ball.vx;
    }
    if(ball.x + ball.r + ball.vx > container.x + container.width) {
        ball.vx = -ball.vx;
    }
  
    if(ball.y + ball.r + ball.vy > container.y + container.height || ball.y - ball.r + ball.vy < container.y) {
        ball.vy = -ball.vy;
    }

    if (ball.x - ball.r + ball.vx <paddle.x) {
        stop();
    }
  
    ball.x += ball.vx
    ball.y += ball.vy
}

function drawGame() {
    drawPaddle();
    drawBall();
    canvas.addEventListener('mousemove', drawPaddle);
}

function loserScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("YOU SUCK!!!", canvas.width/2, canvas.height/2); 
}

function loop(timestamp) {
    requestId = undefined
    var progress = timestamp - lastRender
  
    drawGameBoard();
    drawGame()
  
    lastRender = timestamp;
    if(pause) {
        loserScreen();
    }
    start();
  }
  var lastRender = 0

window.requestAnimationFrame(loop);