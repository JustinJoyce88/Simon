// Audio
const greenAudio = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
);
const redAudio = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
);
const yellowAudio = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
);
const blueAudio = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
);

// Game variables
const start = document.getElementById("start");
const strict = document.getElementById("strict");
const header = document.getElementById("header");
const scoreDisplay = document.getElementById("scoreDisplay");
const greenBtn = document.getElementById("green");
const redBtn = document.getElementById("red");
const yellowBtn = document.getElementById("yellow");
const blueBtn = document.getElementById("blue");
const gameBtns = document.querySelectorAll(".gameBtns");
let compSequence = [];
let userSequence = [];
let random = 0;
let score = 0;
let strictMode = false;
let time = 0;

// Switches game between strict mode
let setStrict = () => {
  if (strictMode === false) {
    strict.style.backgroundColor = "#fc5b1a";
    strictMode = true;
  } else {
    strictMode = false;
    strict.style.backgroundColor = "#fdcb6e";
  }
};

// Start button initializes the reset. This is beginning of the game
let reset = () => {
  header.innerText = "Simon Memory Game";
  compSequence = [];
  userSequence = [];
  startRound();
  score = 0;
  scoreDisplay.value = score;
  runSequence();
};

// On click of the buttons they add a number to the users array and run the
// function to compare user array with computer array.
let greenClick = () => {
  green();
  userSequence.push(1);
  userMoves();
};

let redClick = () => {
  red();
  userSequence.push(2);
  userMoves();
};

let yellowClick = () => {
  yellow();
  userSequence.push(3);
  userMoves();
};

let blueClick = () => {
  blue();
  userSequence.push(4);
  userMoves();
};

// Event Listeners
greenBtn.addEventListener("click", greenClick);
redBtn.addEventListener("click", redClick);
yellowBtn.addEventListener("click", yellowClick);
blueBtn.addEventListener("click", blueClick);
start.addEventListener("click", reset);
strict.addEventListener("click", setStrict);

// Generates random number and puts it in the computers array.
let startRound = () => {
  random = Math.floor(Math.random() * 4 + 1);
  compSequence.push(random);
  time = 0;
};

// Runs the computers sequence and disables/enables buttons.
let runSequence = () => {
  scoreDisplay.value = score;
  gameBtns.forEach((val, i) => {
    gameBtns[i].classList.add("noClick");
  });
  compSequence.forEach(val => {
    time += 1000;
    if (val === 1) {
      setTimeout(green, time);
    } else if (val === 2) {
      setTimeout(red, time);
    } else if (val === 3) {
      setTimeout(yellow, time);
    } else if (val === 4) {
      setTimeout(blue, time);
    }
  });
  setTimeout(() => {
    gameBtns.forEach((val, i) => {
      gameBtns[i].classList.remove("noClick");
    });
  }, time + 200);
};

let userMoves = () => {
  compSequence.forEach(val => {
    // If the array indexs of both arrays dont match run wrong sequence function.
    if (
      userSequence[userSequence.length - 1] !=
      compSequence[userSequence.length - 1]
    ) {
      scoreDisplay.value = "!!";
      wrongSequence();
    }
  });
  // If the arrays match, increment score and run new round.
  if (userSequence.length == compSequence.length) {
    // If winning score, display winner and start game over.
    if (score >= 19) {
      header.innerText = "WINNER!!!";
      setTimeout(() => reset(), time);
    }
    score++;
    scoreDisplay.value = score;
    startRound();
    userSequence = [];
    setTimeout(() => runSequence(), 1000);
  }
};

let wrongSequence = () => {
  userSequence = [];
  setTimeout(() => {
    if (strictMode) {
      reset();
    } else {
      time = 0;
      runSequence();
    }
  }, 2000);
};

// Each of these play the audio and change the color for 500ms.
let green = () => {
  greenAudio.play();
  greenBtn.style.background = "#00ebbd";
  setTimeout(() => (greenBtn.style.background = "#00b894"), 500);
};

let red = () => {
  redAudio.play();
  redBtn.style.background = "#de5b5b";
  setTimeout(() => (redBtn.style.background = "#d63031"), 500);
};

let yellow = () => {
  yellowAudio.play();
  yellowBtn.style.background = "#fedda0";
  setTimeout(() => (yellowBtn.style.background = "#fdcb6e"), 500);
};

let blue = () => {
  blueAudio.play();
  blueBtn.style.background = "#289df6";
  setTimeout(() => (blueBtn.style.background = "#0984e3"), 500);
};
