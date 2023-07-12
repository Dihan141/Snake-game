const playground = document.querySelector(".playground");
let targetX, targetY;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let body = [];

const randomizeTarget = ()=>{
    targetX = Math.floor(Math.random()*30) + 1;
    targetY = Math.floor(Math.random()*30) + 1;
}

const directionChange = (e)=>{
    if(e.key === "ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key == "ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key == "ArrowLeft"){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key == "ArrowRight"){
        velocityX = 1;
        velocityY = 0;
    }
}

const game = ()=>{
    let targetMarkUp = `<div class="target" style="grid-area: ${targetY} / ${targetX}"></div>`;
    targetMarkUp += `<div class="snake-head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    if(snakeX === targetX && snakeY === targetY){
        randomizeTarget();
        body.push([targetX, targetY]);
        console.log(body);
    }

    for(let i=body.length -1; i>0; i--){
        body[i] = body[i-1];
    }

    body[0] = [snakeX, snakeY];
    snakeX += velocityX;
    snakeY += velocityY;

    for(let i=0; i<body.length; i++){
        targetMarkUp += `<div class="snake-head" style="grid-area: ${body[i][1]} / ${body[i][0]}"></div>`;
    }
    playground.innerHTML = targetMarkUp;
}

randomizeTarget();
setInterval(game, 125);
document.addEventListener("keydown", directionChange);