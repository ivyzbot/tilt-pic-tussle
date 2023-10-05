# tilt-pic-tussle
*A browser game inspired by BishiBashi arcade game.*  
Live at: https://ivyzbot.github.io/tilt-pic-tussle/

## Game Overview
In this game, the player will be given a series of tilted pictures wrapped in different colors of frames. The player's goal is to straighten the pictures as fast as he can. Pictures with different frames have different rotation rules. There will also be a timer on the top right corner to make you sweat! Feeling interested? Let's dig in!

## Walkthrough
- **Entry Page**  
  The entry page is divided into 2 sections: the lower part is the main section, which will display all the pictures later after the game starts. The upper part is the control panel, which includes a 'How to Play?' button to onboard users who are new to the game, a 'Start!' button, which kickstarts the game right away, and a timer (only appear after game starts)
<img width="1416" alt="entry-page" src="https://github.com/ivyzbot/tilt-pic-tussle/assets/10040970/aceaadd1-f022-4d3d-8f1c-6cbb39e0f884">
<br></br>

 - **Game Instructions**  
  Once the player click the how to play button, a game instruction will popup.
  The rule of the game is simple: use the arrow key to rotate and confirm the pictures:
	  - For 🟨-frame pictures: press left arrow key to rotate anti-clockwise, right arrow key to rotate clockwise. Once the picture is straightened, press down arrow key to confirm and move to the next picture.
	  - For ⬜-frame pictures: the control is just the opposite. Use left arrow key to rotate clockwise and right arrow key to rotate anti-clockwise. Similarly, press down arrow key to confirm once the picture is straightened.
	  - For ⬛-frame pictures: press the up arrow key to remove the picture directly from the list. ❗️If the player accidentally press other arrow keys, the picture will be locked for 3 seconds.
<img width="1319" alt="game-instructions" src="https://github.com/ivyzbot/tilt-pic-tussle/assets/10040970/450d86c3-5ae9-474b-9099-49ca6c9d91ab">
<br></br>

 - **Start**
	Click the start button and start the game right away. Once the game is started, there will be a count down timer showing on the top right corner. Follow the rules to straighten all pictures within the given time!
<img width="1339" alt="game-start" src="https://github.com/ivyzbot/tilt-pic-tussle/assets/10040970/045576f0-19ff-4e89-bf7b-d23675e4aae7">
<br></br>
Example of the black-frame pictures being locked: The color of the frame will turn red and the player can do nothing except waiting for the time to pass.
<img width="1324" alt="picture-locked" src="https://github.com/ivyzbot/tilt-pic-tussle/assets/10040970/27e73849-d85e-4fc1-97c1-1ae9604d8c6e">
<br></br>

 - **End**
	 The game ends in 2 ways:
	 - Win: If the player is able to finish all pictures within the given time. Happy emoji will be thrown onto the screen, together with a message specifying the time the user spent on this game.
    <img width="1415" alt="win" src="https://github.com/ivyzbot/tilt-pic-tussle/assets/10040970/ff14ef9d-b705-4b68-b49d-0b07ea0d09db">
    <br></br>
	 - Lose: If the player is not able to finish all the pictures.
    <img width="1421" alt="Lose" src="https://github.com/ivyzbot/tilt-pic-tussle/assets/10040970/369ca7bc-b88f-42fa-85ad-3b018d35ffa0">
    <br></br>


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
