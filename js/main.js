import pictureBank from './pictureBank.js'; //picture objects

 /*----- constants -----*/
const MAX_ONSCREEN_PICS = 5;

 /*----- state variables -----*/
const state = {
    pictures: [], //list of picture class instances to be straighten
    finished: false,
    beginIdx: 0,
    endIdx: MAX_ONSCREEN_PICS - 1,
    playerNum: 1,
    locked: false,
};
let pictureObj = {};

 /*----- cached elements  -----*/
// const sectionEl = document.querySelector('section');
const elements = {
    picContainerEl: document.getElementById('pic-container'),    
    picsEl: [], // corresponding elements of state.pictures
    playerEl: document.getElementById('players'),
    startEl: document.getElementById('start')
}


 /*----- event listeners -----*/
document.addEventListener('keydown', rotatePic);

elements.playerEl.addEventListener('change', (evt) => {
    state.playerNum = evt.target.value;
});

elements.startEl.addEventListener('click', () => {
    startGame();
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
    if (state.pictures[state.beginIdx].getColor() === 'white') {
        rotateWhite(evt);
    } else if (state.pictures[state.beginIdx].getColor() === 'gold') {
        rotateGold(evt);
    } else if (state.pictures[state.beginIdx].getColor() === 'black') {
        rotateBlack(evt);
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
                },3000);
                renderPic();
            }
        break;
    }
}

function finishGame(beginIdx) {
    // remove last picture from screen:
    const currentLiEl = elements.picsEl[beginIdx];
    const currentImgEl = currentLiEl.firstChild;

    setTimeout(function() {currentImgEl.classList.add('hide')}, 0);

    setTimeout(function() {
        currentLiEl.classList.add('hide');
        currentLiEl.remove();
    }, 300);
    
    window.alert('Finished!');
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
    state.pictures = []; //list of picture class instances to be straighten
    state.finished = false;
    state.beginIdx = 0;
    state.endIdx = MAX_ONSCREEN_PICS - 1;
    state.playerNum = 1;
    state.locked = false;

    elements.picsEl = [];
    elements.picContainerEl.innerHTML = '';

    preparePic();
    initiatePic();
}

