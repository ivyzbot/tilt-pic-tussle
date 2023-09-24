import Pictures from './Pictures.js';
import pictureObj from './pictureBank.js'; //picture objects

 /*----- constants -----*/



 /*----- state variables -----*/
const state = {
    pictures: [],
    currentPic: 0,
    finished: false
};

 /*----- cached elements  -----*/
// const sectionEl = document.querySelector('section');
const elements = {
    picContainerEl: document.getElementById('pic-container'),    
    picsEl: document.querySelectorAll('.pic-queue')
}


 /*----- event listeners -----*/
document.addEventListener('keydown', rotatePic);


 /*----- functions -----*/
 function initiatePic() {
    pictureObj.art.forEach((picture) => {
        addSinglePic(picture);
    })
 }


//To add pictures into the queue
function addSinglePic(pictureInstance) {

    state.pictures.push(pictureInstance);
    const picEl = pictureInstance.addElement();
    //To roate the picture element

    picEl.style.transform = `rotate(${pictureInstance.rotationUnit}deg)`;
    elements.picContainerEl.appendChild(picEl);
}

function rotatePic(evt) {
    switch (evt.keyCode) {
        // left arrow
        case 37:
            if (state.pictures[state.currentPic].rotationUnit < 20) {
                state.pictures[state.currentPic].rotationUnit += 10;
            }
        break;
        
        // right arrow
        case 39:
            if (state.pictures[state.currentPic].rotationUnit > -20) {
                state.pictures[state.currentPic].rotationUnit -= 10;
            }
        break;
        
        // down arrow
        case 40:
            if (state.pictures[state.currentPic].rotationUnit === 0) {
                console.log(state.currentPic);
                console.log(pictureObj.art.length);
                if (state.currentPic === pictureObj.art.length - 1) {
                    finishGame();
                } else {state.currentPic += 1;}
            }
        break;
    }

    // console.log(state.pictures[0].rotationUnit);

    renderPic();
}

function finishGame() {
        window.alert('Finished!');
}

// update picture angles on screen;
function renderPic() {
    const picsEl = document.querySelectorAll('.pic-queue');
    picsEl.forEach( (picEl, idx) => {
        const newRotationUnit = state.pictures[idx].rotationUnit
        picEl.style.transform = `rotate(${newRotationUnit}deg)`;
    })
}

initiatePic();














