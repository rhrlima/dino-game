const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

const JUMPBUTTON = 32; // SPACEBAR
const JUMPBUTTON2 = 38; // SPACEBAR

let isJumping = false;
let position = 0;

function handleKeyDown(event) {
    if (event.keyCode == JUMPBUTTON || event.keyCode == JUMPBUTTON2) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {

    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 4000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition <= -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            document.body.innerHTML = '<h1 class="gameover">GAME OVER</h1>';
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';    
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keydown', handleKeyDown);