const playground = document.querySelector(".playground");
const showScore = document.querySelector(".score");
const showHscore = document.querySelector(".high-score");
let targetX, targetY;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
showHscore.innerText = `High Score: ${highScore}`;
let body = [];
let gameOver = false;

const handleGameOver = ()=>{
    clearInterval(interval);
    alert("Game over!!Press OK to replay...");
    location.reload();
}

const randomizeTarget = ()=>{
    targetX = Math.floor(Math.random()*30) + 1;
    targetY = Math.floor(Math.random()*30) + 1;
}

const directionChange = (e)=>{
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

const game = ()=>{
    if(gameOver){
        handleGameOver();
        return;
    }

    let targetMarkUp = `<div class="target" style="grid-area: ${targetY} / ${targetX}"></div>`;
    targetMarkUp += `<div class="snake-head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    if(snakeX === targetX && snakeY === targetY){
        randomizeTarget();
        body.push([targetX, targetY]);
        score++;
        if(score > highScore){
            highScore = score
            localStorage.setItem("high-score", highScore);
        }
        showScore.innerText = `Score: ${score}`;
        showHscore.innerText = `High Score: ${highScore}`;
    }

    for(let i=body.length -1; i>0; i--){
        body[i] = body[i-1];
    }

    body[0] = [snakeX, snakeY];
    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    for(let i=0; i<body.length; i++){
        targetMarkUp += `<div class="snake-head" style="grid-area: ${body[i][1]} / ${body[i][0]}"></div>`;

        if(i != 0 && body[0][0] == body[i][0] && body[0][1] == body[i][1]){
            gameOver = true;
        }
    }
    playground.innerHTML = targetMarkUp;
}

randomizeTarget();
interval = setInterval(game, 125);
document.addEventListener("keydown", directionChange);