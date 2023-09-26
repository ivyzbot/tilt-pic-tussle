// import Pictures from './Pictures.js';
import pictureObj from './pictureBank.js'; //picture objects

 /*----- constants -----*/
const MAX_ONSCREEN_PICS = 3;

 /*----- state variables -----*/
const state = {
    pictures: [], //list of picture class instances to be straighten
    finished: false,
    beginIdx: 0,
    endIdx: MAX_ONSCREEN_PICS - 1
};

 /*----- cached elements  -----*/
// const sectionEl = document.querySelector('section');
const elements = {
    picContainerEl: document.getElementById('pic-container'),    
    picsEl: [] // corresponding elements of state.pictures
}


 /*----- event listeners -----*/
document.addEventListener('keydown', rotatePic);


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

    // const picEl = pictureInstance.addElement();
    //To roate the picture element

    // picEl.style.transform = `rotate(${pictureInstance.rotationUnit}deg)`;
    // elements.picContainerEl.appendChild(picEl);
}

// Rotation degree validation
function rotatePic(evt) {
    switch (evt.keyCode) {
        // left arrow
        case 37:
            if (state.pictures[state.beginIdx].rotationUnit < 20) {
                state.pictures[state.beginIdx].rotationUnit += 10;
            }
        break;
        
        // right arrow
        case 39:
            if (state.pictures[state.beginIdx].rotationUnit > -20) {
                state.pictures[state.beginIdx].rotationUnit -= 10;
            }
        break;
        
        // down arrow
        case 40:
            if (state.pictures[state.beginIdx].rotationUnit === 0) {
                if (state.beginIdx === pictureObj.art.length - 1) {
                    finishGame();
                } else {
                    state.beginIdx += 1;
                    state.endIdx += 1;
                    addSinglePic(pictureObj.art[state.endIdx]);
                }
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
    for (let i = state.beginIdx; i <= state.endIdx; i++) {
        const currentRotationUnit = state.pictures[i].rotationUnit;
        elements.picsEl[i].firstChild.style.transform = `rotate(${currentRotationUnit}deg)`;
        elements.picContainerEl.appendChild(elements.picsEl[i]);
    }
}

initiatePic();
