# tilt-pic-tussle
*A browser game inspired by BishiBashi arcade game.*  
Live at: https://ivyzbot.github.io/tilt-pic-tussle/

## 1.Game Overview
In this game, the player will be given a series of tilted pictures wrapped in different colors of frames. The player's goal is to straighten the pictures to their rightful positions as fast as he can. Pictures with different frames have different rotation rules. There will also be a timer on the top right corner to make you sweat! Intrigued? Let's dig in!

## 2.Walkthrough
- **Entry Page**  
  The entry page is divided into 2 sections: the lower part is the main section, which will display all the pictures later after the game starts. The upper part is the control panel, which includes a 'How to Play?' button to guide newcomers through the game's mechanics, and a 'Start!' button, which kickstarts the game right away, and a timer (only appear after game starts)
<img width="1416" alt="entry-page" src="https://github.com/ivyzbot/tilt-pic-tussle/assets/10040970/aceaadd1-f022-4d3d-8f1c-6cbb39e0f884">
<br></br>

 - **Game Instructions**  
  Once the player click the how to play button, a game instruction will popup.
  The rule of the game is simple: use the arrow key to rotate and confirm the pictures:
	  - For pictures framed in 🟨: press left arrow key to rotate counterclockwise, right arrow key to rotate clockwise. Once the picture is straightened, press down arrow key to confirm and move to the next picture.
	  - For pictures framed in ⬜: the control is inverted. Use left arrow key to rotate clockwise and right arrow key to rotate counterclockwise. As before, confirm your alignment with the down arrow key.
	  - For pictures framed in  ⬛: press the up arrow key to remove the picture promptly from the list. ❗️If the player accidentally press other arrow keys, the picture will be locked for 3 seconds.
<img width="1319" alt="game-instructions" src="https://github.com/ivyzbot/tilt-pic-tussle/assets/10040970/450d86c3-5ae9-474b-9099-49ca6c9d91ab">
<br></br>

 - **Start**  
	Click the start button and start the game right away. As soon as the game begins, a countdown timer will appear in the top-right corner. Follow the rules to straighten all pictures within the allotted time!
<img width="1339" alt="game-start" src="https://github.com/ivyzbot/tilt-pic-tussle/assets/10040970/045576f0-19ff-4e89-bf7b-d23675e4aae7">
<br></br>
Example of the black-frame pictures being locked: The color of the frame will turn red and the player is left with no control, compelled to patiently await the passage of time before they can resume their quest.
<img width="1324" alt="picture-locked" src="https://github.com/ivyzbot/tilt-pic-tussle/assets/10040970/27e73849-d85e-4fc1-97c1-1ae9604d8c6e">
<br></br>

 - **End**  
	 The game ends in 2 ways:  
	 Win: If the player is able to finish all pictures within the given time. Happy emoji will be thrown onto the screen, with a congratulatory message that also highlights the amount of time the user spent on the game
    <img width="1415" alt="win" src="https://github.com/ivyzbot/tilt-pic-tussle/assets/10040970/ff14ef9d-b705-4b68-b49d-0b07ea0d09db">
    <br></br>
	Lose: If the player is not able to finish all the pictures in the allotted time.
    <img width="1421" alt="Lose" src="https://github.com/ivyzbot/tilt-pic-tussle/assets/10040970/369ca7bc-b88f-42fa-85ad-3b018d35ffa0">
    <br></br>

## 3.Code Snippet
 - **3.1 HTML**
 ```html
<body>
    <main> <!-- flex box -->
        <div id="controls"> <!-- flex box -->
            <div id="control-1">
                <button id="manual">How to Play?</button>
            </div>
            <div id="control-2"><button id="start">Start!</button></div>
            <div id="timer"></div>
        </div>
        <section> <!-- flex box -->
            <dialog close> <!-- switch to open by event listener -->
                <img id="manual-content" src="images/manual.png" alt="">
                <button id="close">X</button>
            </dialog>
            <ul id="pic-container">
            </ul>
        </section>
    </main>
</body>
 ```
 - **3.2 CSS**
 ```CSS
 .hide {
opacity: 0;
}

.pic-queue {
transition: 0.3s;
}
 ```
 - **3.3 JavaScript**
	 1. Classes
	     - Picture Class:
	        To prepare pictures to have random colors of frame and rotation angles, and store the information in respective attributes.
	       ```JavaScript
	       constructor(url)
	       ```
	        functions: addElement(), getters, setters, resetRotationUnit(), resetColor()
	     - Timer Class:
		To have a timer that returns realtime count down value in every 100 milliseconds.
		```JavaScript
		constructor(elem, maxSeconds, timeupFunc)
		```
		functions: init(), start(), stop(), getUsedTime(), count()
	2. Event Listeners
	   ```JavaScript
    	   document.addEventListener('keydown', rotatePic);
          ```
 	3. Functions
	  ```JavaScript
   	// functions to rotate the picture
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
	        break;
	   
	        // down arrow
	        case 40:
	        break;
    }
	}

	 function rotateBlack(evt) {
	    switch (state.locked) {
	        case false:
	            if (evt.keyCode === 38) {
   			//finish game or remove current picture	 
	            } else {
	                state.locked = true;
   
	                setTimeout( function() {
	                    state.locked = false;
	                    renderPic();
	                }, 3000);
	                renderPic();
	            }
	        break;
	    }

	//Timer workflow
   
	const timer = new Timers(elements.timerEl, 60, renderTimeup);
   
   	function startGame() {
	    timer.init(); //initialize the timer
	    timer.start(); // start the timer
	}

	 function finishGame(beginIdx) {
	    timer.stop();
	    renderGameOver();
	}

	function renderTimeup() {
	    renderGameOver()
	}

	function renderGameOver() {
	    if (state.gameWon) {
	        gameResultEl.innerHTML = `Finished in ${timer.getUsedTime()} seconds!!!`;
	    } else {
	      //render failure msg
	}
  	```

## 4.Challenges & Takeaways
- 'this' keyword in class methods passed to setTimeout/setInterval functions
- Conflicts of renderGameOver() and renderPic() when there's no check of game start
- Always write pseudo code
   
## 5.Enhancements
- 2 Player mode

## 6. References:  
Color Palette: https://colorhunt.co/  
JS Confetti: https://dev.to/loonywizard/js-confetti-library-with-emojis-2152  
Timer: https://codepen.io/Vohtz/pen/ExyPQBp


## 7. Version Control:
Version2.1: minor changes
1) Add .blur() to buttons, to remove button focus after click
2) Prevent user from clicking how to play button after game start
3) Replace the open attribute in the dialog tag and replace with .show()/.close() method on DOM elements
   
Version1.6: finalised for 1p mode
1) Add a timer to track user's time spent on each game
2) Replace alert with proper win/loss messages on screen
3) Add user guide to onboard new players
4) Add more pics and stylings

Version1.5:
1) Update the logic to rotate golden pics
2) Update the picture class to have getter, setter and reset functions
3) Add a function to randomize picture order, color and rotation angle after game restart

Version1.4:
1) Add logic to handle different 3 types of pics, each with different rotation logic
2) Add restart game function 

Version1.3:
1) Limit number of pics to be displayed on screen during game play
2) Create fade out effect for pic removal
3) Create start game logic for 1 player

Version1.0:
1) Add Basic HTML/CSS, images for testing purpose
2) Add picture class
3) Add basic game logic (initial rendering of pictures, event listener to rotate pictures, end of game check)
