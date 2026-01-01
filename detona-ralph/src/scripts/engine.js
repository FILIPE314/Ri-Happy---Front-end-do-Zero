const state = {
    view: {
        square: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.values.timerId);
        alert('Game over! O seu resultado foi:' + state.values.result);
    };
};

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
};

function randomSquare () {
    state.view.square.forEach((square) => {
        square.classList.remove('enemy')
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
};

function movieEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
};

function addListenerHitBox() {
    state.view.square.forEach((square) => {
        square.addEventListener('mousedown',  () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound('hit');
            };
        });
    });
};

function init() {
    movieEnemy();
    addListenerHitBox();
};

init();