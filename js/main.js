import pictureBank from './pictureBank.js'; //picture objects
import Timers from './Timers.js';


 /*----- cached elements  -----*/

const elements = {
    picContainerEl: document.getElementById('pic-container'),    
    picsEl: [], // corresponding elements of state.pictures
    playerEl: document.getElementById('players'),
    startEl: document.getElementById('start'),
    timerEl: document.getElementById('timer'),
    manualEl: document.getElementById('manual'),
    manualContentEl: document.querySelector('dialog'),
    closeEl: document.getElementById('close'),
    sectionEl: document.querySelector('section'),
}

 /*----- constants -----*/
const MAX_ONSCREEN_PICS = 5;
const timer = new Timers(elements.timerEl, 5, renderTimeup);
const jsConfetti = new JSConfetti();

 /*----- state variables -----*/
const state = {
    pictures: [], //list of picture class instances to be straighten
    finished: false,
    beginIdx: 0,
    endIdx: MAX_ONSCREEN_PICS - 1,
    playerNum: 1,
    locked: false,
    gameStart: false,
    gameWon: false
};
let pictureObj = {};

 /*----- event listeners -----*/
document.addEventListener('keydown', rotatePic);
elements.startEl.addEventListener('click', () => {
    startGame();
}
)
elements.manualEl.addEventListener('click', () => {
    elements.manualContentEl.open = true;
})
elements.closeEl.addEventListener('click', () => {
    elements.manualContentEl.open = false;
})

 /*----- functions -----*/
 function initiatePic() {
    for (let i = 0; i < MAX_ONSCREEN_PICS; i++) {
        addSinglePic(pictureObj.art[i]);
    }
    renderPic();
 }


// add single pic into the queue
function addSinglePic(pictureInstance) {
    state.pictures.push(pictureInstance);
    elements.picsEl.push(pictureInstance.addElement());
}

// Rotation logic depends on the color of the picture
function rotatePic(evt) {
    if (state.gameStart) {
        if (state.pictures[state.beginIdx].getColor() === 'white') {
            rotateWhite(evt);
        } else if (state.pictures[state.beginIdx].getColor() === 'gold') {
            rotateGold(evt);
        } else if (state.pictures[state.beginIdx].getColor() === 'black') {
            rotateBlack(evt);
        }
    }
}

// normal rotation
function rotateWhite(evt) {
    switch (evt.keyCode) {
        // left arrow
        case 37:
            if (state.pictures[state.beginIdx].getRotationUnit() < 30) {
                state.pictures[state.beginIdx].setRotationUnit(15);
                renderPic();
            }
        break;
        
        // right arrow
        case 39:
            if (state.pictures[state.beginIdx].getRotationUnit() > -30) {
                state.pictures[state.beginIdx].setRotationUnit(-15);
                renderPic();
            }
        break;
        
        // down arrow
        case 40:
            if (state.pictures[state.beginIdx].getRotationUnit() === 0) {
                if (state.beginIdx === pictureObj.art.length - 1) {
                    finishGame(state.beginIdx);
                } else {
                    state.beginIdx += 1;
                    // increment endIdx only when there are more pics to add
                    if (state.endIdx < pictureObj.art.length - 1) {
                        state.endIdx += 1;
                    }
                    addSinglePic(pictureObj.art[state.endIdx]);

                    renderPicUpdate();
                }
            }
        break;
    }
}

// normal rotation + a shortcut to bypass even if pic is still tilted
function rotateGold(evt) {
    switch (evt.keyCode) {
        // right arrow
        case 39:
            if (state.pictures[state.beginIdx].getRotationUnit() < 30) {
                state.pictures[state.beginIdx].setRotationUnit(15);
                renderPic();
            }
        break;
        
        // left arrow
        case 37:
            if (state.pictures[state.beginIdx].getRotationUnit() > -30) {
                state.pictures[state.beginIdx].setRotationUnit(-15);
                renderPic();
            }
        break;
        
        // down arrow
        case 40:
            if (state.pictures[state.beginIdx].getRotationUnit() === 0) {
                if (state.beginIdx === pictureObj.art.length - 1) {
                    finishGame(state.beginIdx);
                } else {
                    state.beginIdx += 1;
                    // increment endIdx only when there are more pics to add
                    if (state.endIdx < pictureObj.art.length - 1) {
                        state.endIdx += 1;
                    }
                    addSinglePic(pictureObj.art[state.endIdx]);

                    renderPicUpdate();
                }
            }
        break;
    }
}

// normal rotation
function rotateBlack(evt) {
    switch (state.locked) {
        case false:
            if (evt.keyCode === 38) {
                if (state.beginIdx === pictureObj.art.length - 1) {
                    finishGame(state.beginIdx);
                } else {
                    state.beginIdx += 1;
                    // increment endIdx only when there are more pics to add
                    if (state.endIdx < pictureObj.art.length - 1) {
                        state.endIdx += 1;
                    }
                    addSinglePic(pictureObj.art[state.endIdx]);
                    renderPicUpdate();
                    }
            } else {
                state.locked = true;

                setTimeout( function(){
                    state.locked = false;
                    renderPic();
                }, 3000);
                renderPic();
            }
        break;
    }
}

function finishGame(beginIdx) {
    state.gameWon = true;
    state.gameStart = false;
    // remove last picture from screen:
    const currentLiEl = elements.picsEl[beginIdx];
    const currentImgEl = currentLiEl.firstChild;

    setTimeout(function() {currentImgEl.classList.add('hide')}, 0);

    setTimeout(function() {
        currentLiEl.classList.add('hide');
        currentLiEl.remove();
    }, 100);
    
    timer.stop();

    renderGameOver();
}

function renderTimeup() {
    state.gameStart = false;
    elements.picContainerEl.innerHTML = '';
    renderGameOver()
}

// update picture angles on screen;
function renderPic() {

    for (let i = state.beginIdx; i <= state.endIdx; i++) {
        const currentLiEl = elements.picsEl[i];
        const currentImgEl = currentLiEl.firstChild;
        const currentPic = state.pictures[i];

        const currentRotationUnit = state.pictures[i].getRotationUnit();
        currentImgEl.style.transform = `rotate(${currentRotationUnit}deg)`;
        currentImgEl.style.borderColor = state.pictures[i].getColor();

        if ( (state.locked === true) && (currentPic.getColor() === 'black') && (i === state.beginIdx)) {
            console.log('here');
            currentImgEl.style.borderColor = 'red';
        }

        elements.picContainerEl.appendChild(currentLiEl);
    }
}

function renderPicUpdate() {

    for (let i = state.beginIdx - 1; i <= state.endIdx; i++) {
        const currentLiEl = elements.picsEl[i];
        const currentImgEl = currentLiEl.firstChild;
        const currentPic = state.pictures[i];

        const currentRotationUnit = state.pictures[i].getRotationUnit();
        elements.picsEl[i].firstChild.style.transform = `rotate(${currentRotationUnit}deg)`;
        currentImgEl.style.borderColor = state.pictures[i].getColor();

        if ( (state.locked === true) && (currentPic.getColor() === 'black') && (i === state.beginIdx - 1)) {
            currentImgEl.style.borderColor === 'red';
        }
    
        elements.picContainerEl.appendChild(elements.picsEl[i]);
    }

    const firstLiEl = elements.picsEl[state.beginIdx - 1];
    const firstImgEl = firstLiEl.firstChild;

    // firstImgEl.classList.add('hide');
    setTimeout(function() {firstImgEl.classList.add('hide')}, 0);

    setTimeout(function() {
        firstLiEl.classList.add('hide');
        firstLiEl.remove();
    }, 300);
}

function renderGameOver() {
    const gameResultEl = document.createElement('div');
    gameResultEl.setAttribute('id', 'game-result');
   
    if (state.gameWon) {
        gameResultEl.innerHTML = `Finished in ${timer.getUsedTime()} seconds!!!`;
        setTimeout( () => {
            elements.sectionEl.appendChild(gameResultEl)
            jsConfetti.addConfetti({
                emojis: ['🌈', '🎨', '🖼',' 🎈'],
                confettiNumber: 100,
                emojiSize: 60,
             })
        }, 100);
    } else {
        gameResultEl.innerHTML = 'Better luck next time!';
        elements.sectionEl.appendChild(gameResultEl)
            jsConfetti.addConfetti({
                emojis: ['🤡', '💣'],
                confettiNumber: 50,
                emojiSize: 60,
             })    
        }

    setTimeout(() => {
        jsConfetti.clearCanvas();
    }, 5000);
}

function preparePic() {
    pictureObj.art = [];
    for (let i = 0; i < pictureBank.art.length; i++) {
        const pictureInstance = pictureBank.art[i];
        pictureInstance.resetColor();
        pictureInstance.resetRotationUnit();
        pictureObj.art.push(pictureInstance);
    }

    pictureObj.art.sort( (a, b) => {return 0.5 - Math.random()});
}

function startGame() {
    timer.init(); //initialize the timer
    timer.start(); // start the timer

    state.gameStart = true;
    state.pictures = []; //list of picture class instances to be straighten
    state.finished = false;
    state.beginIdx = 0;
    state.endIdx = MAX_ONSCREEN_PICS - 1;
    state.playerNum = 1;
    state.locked = false;
    state.gameWon = false;

    elements.picsEl = [];
    elements.picContainerEl.innerHTML = '';
    if (document.getElementById('game-result')) {
        document.getElementById('game-result').remove();
    }

    preparePic();
    initiatePic();
}

