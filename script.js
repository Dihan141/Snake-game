const playground = document.querySelector(".playground");
let targetX, targetY;
let snakeX = 5, snakeY = 10;

const randomizeTarget = ()=>{
    targetX = Math.floor(Math.random()*30) + 1;
    targetY = Math.floor(Math.random()*30) + 1;
}

const game = ()=>{
    let targetMarkUp = `<div class="target" style="grid-area: ${targetY} / ${targetX}"></div>`;
    targetMarkUp += `<div class="snake-head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    playground.innerHTML = targetMarkUp;
}

randomizeTarget();
game();