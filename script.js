const boxes = document.querySelectorAll(".box");

const player1Score = document.querySelector(".player1-score");
const player2Score = document.querySelector(".player2-score");

const playerOneInput = document.getElementById("player-one-name");
const playerTwoInput = document.getElementById("player-two-name");

const player1Name = document.getElementById("player1");
const player2Name = document.getElementById("player2");

const currentPlayerOne = document.getElementById("current-player-1");
const currentPlayerTwo = document.getElementById("current-player-2");

const startBtn = document.getElementById("start");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const restart = document.getElementById("restart-btn");

const message = document.getElementById("message");

let count = true;
let playerOneScore = 0;
let playerTwoScore = 0;

restart.classList.add("remove");
const successAudio = new Audio("winner.mp3");

startBtn.addEventListener("click", getNames);

// Getting names of players from input
function getNames(e) {
  e.preventDefault();

  if (playerOneInput.value === "" || playerTwoInput.value === "") {
    alert("Please enter player names");
    return;
  }

  const playerOne = playerOneInput.value;
  const playerTwo = playerTwoInput.value;

  player1Name.innerHTML = playerOne;
  player2Name.innerHTML = playerTwo;

  playerOneInput.value = "";
  playerTwoInput.value = "";

  modal.classList.add("remove");
  overlay.classList.add("remove");
}

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Game Logic

for (const box of boxes) {
  box.addEventListener("click", () => {
    if (count) {
      box.innerHTML = "X";
      box.classList.add("x");
      restart.classList.remove("remove");
      getMessage();

      count = false;
    } else {
      box.innerHTML = "O";
      box.classList.add("o");
      getMessage();
      count = true;
    }
    box.disabled = true;
    winner();
  });
}

//Deciding winner

function winner() {
  for (const pattern of winningPattern) {
    let p1 = boxes[pattern[0]].innerHTML;
    let p2 = boxes[pattern[1]].innerHTML;
    let p3 = boxes[pattern[2]].innerHTML;

    if (p1 !== "" && p2 !== "" && p3 !== "") {
      if (p1 === p2 && p2 === p3) {
        boxes[pattern[0]].classList.add("winner");
        boxes[pattern[1]].classList.add("winner");
        boxes[pattern[2]].classList.add("winner");
        successAudio.play();
        setTimeout(() => {
          restartGame();
        }, 1000);

        if (p1 === "X") {
          playerOneScore++;
          player1Score.innerHTML = playerOneScore;
        } else {
          playerTwoScore++;
          player2Score.innerHTML = playerTwoScore;
        }

        for (const box of boxes) {
          box.disabled = true;
        }
      }
    }
  }
}

restart.addEventListener("click", restartGame);

// Restart game logic
function restartGame() {
  for (const box of boxes) {
    box.classList.add("animation");
    box.innerHTML = "";
    box.classList.remove("x");
    box.classList.remove("o");
    box.classList.remove("winner");
    message.innerHTML = "Let's play again 💪";

    setTimeout(() => {
      box.classList.remove("animation");
    }, 700);
    box.disabled = false;
  }
}

// Messages for players

function getMessage() {
  const messageArr = [
    "OOH!! That was a good move 👀",
    "Let's see what you'll do 💪",
    "Great move! Keep it up! 👍",
    "You're on fire! 🔥",
    "Nice strategy! What's your next move? 🤔",
    "Awesome move! Your opponent has some competition! 💪",
    "You're playing like a pro! 🏆",
    "Unleash your inner Tic Tac Toe master! 🚀",
    "Smooth move! Your opponent is feeling the pressure. 😅",
    "Impressive! Your opponent is in trouble. 😎",
    "You're dominating the board! Keep going! 💯",
    "Strategize, captivate, dominate! 🎮",
    "Winning vibes! Can you keep it up? ✨",
    "Epic move! Your opponent is in awe. 😲",
  ];

  message.innerHTML = messageArr[Math.floor(Math.random() * messageArr.length)];
  message.classList.add("animation");

  setTimeout(() => {
    message.classList.remove("animation");
  }, 700);
}