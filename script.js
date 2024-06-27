"use strict";

let startTimer;
let startPomo = 1800; //30 minutos = 1800 segundos
let check = true;
const startSound = document.getElementById("startSound");

//Function to reset Pomodoro to initial conditions
function startConditions() {
  clearInterval(startTimer);
  startPomo = 1800;
  check = true;
  document.querySelector(".play").textContent = "Start";
  document.querySelector(".timer").textContent = `30:00`;
  document.querySelector(".timeto").textContent = "Time to focus! 🤓";
  document.body.style.backgroundColor = "#b3b4bd";
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
  if (startPomo === 0) {
    restTime();
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
    startPomo--;
  }
}

//Skip Button
function skipActual() {
  if (document.querySelector(".timeto").textContent === "Time to relax! 😁") {
    startConditions();
  } else {
    restTime();
  }
}
document.querySelector(".material-icon").addEventListener("click", skipActual);

function restTime() {
  check = true;
  clearInterval(startTimer);
  startPomo = 360;
  document.querySelector(".play").textContent = "Start";
  document.querySelector(".timer").textContent = `06:00`;
  document.querySelector(".timeto").textContent = "Time to relax! 😁";
  document.body.style.backgroundColor = "#ADD8E6";
}

//Maladoro Button: Reset pomodoro to 30 minutes
document.querySelector(".maladoro").addEventListener("click", startConditions);

//Break Button: Reset pomodoro to break event (6 minutes)
document.querySelector(".break").addEventListener("click", restTime);
