"use strict";

let startTimer;
let startPomo = 1800; //30 minutes = 1800 seconds
let check = true;
let studyCounter = 0;
let breakCounter = 0;
const startSound = document.getElementById("startSound");
updateTitle("30", "00");

//Functions to put Pomodoro onto initial conditions or break conditions
function startConditions() {
  clearInterval(startTimer);
  startPomo = 1800;
  check = true;
  document.querySelector(".play").textContent = "Start";
  document.querySelector(".timer").textContent = `30:00`;
  document.querySelector(".timeto").textContent = "Time to focus! 🤓";
  updateTitle("30", "00");
  document.body.style.backgroundColor = "#b3b4bd";
}

function restTime() {
  check = true;
  clearInterval(startTimer);
  startPomo = 360;
  document.querySelector(".play").textContent = "Start";
  document.querySelector(".timer").textContent = `06:00`;
  document.querySelector(".timeto").textContent = "Time to relax! 😁";
  updateTitle("06", "00");
  document.body.style.backgroundColor = "#ADD8E6";
}

//Study and Break Counters logic:
function countersAdd() {
  if (document.querySelector(".timeto").textContent === "Time to relax! 😁") {
    breakCounter += 1;
    document.querySelector(
      ".counters"
    ).textContent = `Study: ${studyCounter} Break: ${breakCounter}`;
  } else {
    studyCounter += 1;
    document.querySelector(
      ".counters"
    ).textContent = `Study: ${studyCounter} Break: ${breakCounter}`;
  }
}

//Function to display the timer in the navigator tab
function updateTitle(minutes, seconds) {
  if (document.querySelector(".timeto").textContent === "Time to focus! 🤓") {
    document.title = `${minutes}:${seconds} - Time to focus!`;
  } else {
    document.title = `${minutes}:${seconds} - Time to relax!`;
  }
}

//Main button: Start Pomodoro
document.querySelector(".play").addEventListener("click", start);

function start() {
  if (!check) {
    startSound.play();
    clearInterval(startTimer);
    document.querySelector(".play").textContent = "Resume";
    check = true;
  } else {
    startSound.play();
    startTimer = setInterval(pomoTimerStart, 1000);
    document.querySelector(".play").textContent = "Pause";
    check = false;
  }
}

function pomoTimerStart() {
  if (
    startPomo === 0 &&
    document.querySelector(".timeto").textContent === "Time to focus! 🤓"
  ) {
    countersAdd();
    restTime();
  } else if (
    startPomo === 0 &&
    document.querySelector(".timeto").textContent === "Time to relax! 😁"
  ) {
    countersAdd();
    startConditions();
  } else {
    let minutes = Math.floor(startPomo / 60);
    let seconds = startPomo % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    document.querySelector(".timer").textContent = `${minutes}:${seconds}`;
    updateTitle(minutes, seconds);
    startPomo--;
  }
}

//Skip Button
function skipActual() {
  if (document.querySelector(".timeto").textContent === "Time to relax! 😁") {
    countersAdd();
    startConditions();
  } else {
    countersAdd();
    restTime();
  }
}
document.querySelector(".material-icon").addEventListener("click", skipActual);

//Maladoro Button: Reset pomodoro to 30 minutes
document.querySelector(".maladoro").addEventListener("click", startConditions);

//Break Button: Reset pomodoro to break event (6 minutes)
document.querySelector(".break").addEventListener("click", restTime);

//Reset Top Right Corner Button: Reset the Study and Break Counters
document.querySelector(".reset").addEventListener("click", function () {
  if (confirm("Are you sure you want to reset the cycles?")) {
    startConditions();
    studyCounter = 0;
    breakCounter = 0;
    document.querySelector(
      ".counters"
    ).textContent = `Study: ${studyCounter} Break: ${breakCounter}`;
  }
});
