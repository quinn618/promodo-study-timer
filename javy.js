// Buttons
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

// Timer display
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

// Session count display
const sessionCount = document.getElementById("session-count");

// Theme toggle buttons
const darkModeToggle = document.getElementById("darkModeToggle");
const girlyModeToggle = document.getElementById("girlyModeToggle");

// Session goal input
const sessionGoalInput = document.getElementById("sessionGoal");

let workTime = 25 * 60;
let shortBreak = 5 * 60;
let longBreak = 15 * 60;
let sessionGoal = 4;
let currentTime = workTime; // This is what’s actually counting down
let isRunning = false; // Is the timer active?
let timer; // Will store the interval (so we can stop it)
let currentSession = 1; // Current session number
let onBreak = false; // Whether we're on break or work time

// Function to update the timer display
function updateDisplay() {
  const mins = Math.floor(currentTime / 60);
  const secs = currentTime % 60;
  minutesDisplay.textContent = String(mins).padStart(2, "0");
  secondsDisplay.textContent = String(secs).padStart(2, "0");
}

// Function to start the timer
function startTimer() {
  if (isRunning) return; // Avoid starting twice
  isRunning = true;

  timer = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateDisplay();
      saveTimerState();
    } else {
      clearInterval(timer);
      isRunning = false;

      // Transition to next state
      if (!onBreak) {
        currentSession++;
        sessionCount.textContent = currentSession;
        onBreak = true;
        currentTime =
          currentSession % sessionGoal === 0 ? longBreak : shortBreak;
      } else {
        onBreak = false;
        currentTime = workTime;
      }

      updateDisplay();
      saveTimerState();

      // If auto-start is checked, continue
      const autoStart = document.getElementById("autoStartToggle").checked;
      if (autoStart) {
        startTimer();
      }
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timer);
  saveTimerState();
}

function resetTimer() {
  pauseTimer();
  onBreak = false;
  currentSession = 1;
  sessionCount.textContent = currentSession;
  currentTime = workTime;
  updateDisplay();
  saveTimerState();
}

// Theme toggle event listeners
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.remove("girly");
});

girlyModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("girly");
  document.body.classList.remove("dark");
});

// Update times from input and save settings
document.getElementById("workLength").addEventListener("change", (e) => {
  workTime = parseInt(e.target.value) * 60;
  if (!onBreak) {
    currentTime = workTime;
    updateDisplay();
  }
  saveSettings();
});

document.getElementById("shortBreakLength").addEventListener("change", (e) => {
  shortBreak = parseInt(e.target.value) * 60;
  saveSettings();
});

document.getElementById("longBreakLength").addEventListener("change", (e) => {
  longBreak = parseInt(e.target.value) * 60;
  saveSettings();
});

document.getElementById("sessionGoal").addEventListener("change", (e) => {
  sessionGoal = parseInt(e.target.value);
  saveSettings();
});

document
  .getElementById("autoStartToggle")
  .addEventListener("change", saveSettings);

// Start, pause, reset buttons
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

function saveSettings() {
  const settings = {
    workTime: document.getElementById("workLength").value,
    shortBreak: document.getElementById("shortBreakLength").value,
    longBreak: document.getElementById("longBreakLength").value,
    sessionGoal: document.getElementById("sessionGoal").value,
    autoStart: document.getElementById("autoStartToggle").checked,
  };

  localStorage.setItem("promodoSettings", JSON.stringify(settings));
}

function loadSettings() {
  const saved = localStorage.getItem("promodoSettings");
  if (!saved) return;

  const settings = JSON.parse(saved);

  document.getElementById("workLength").value = settings.workTime;
  document.getElementById("shortBreakLength").value = settings.shortBreak;
  document.getElementById("longBreakLength").value = settings.longBreak;
  document.getElementById("sessionGoal").value = settings.sessionGoal;
  document.getElementById("autoStartToggle").checked = settings.autoStart;

  // Apply to timer values
  workTime = parseInt(settings.workTime) * 60;
  shortBreak = parseInt(settings.shortBreak) * 60;
  longBreak = parseInt(settings.longBreak) * 60;
  sessionGoal = parseInt(settings.sessionGoal);
  currentTime = workTime;
  updateDisplay();
}

function saveTimerState() {
  const timerState = {
    currentTime,
    currentSession,
    onBreak,
    isRunning,
  };
  localStorage.setItem("promodoTimerState", JSON.stringify(timerState));
}

function loadTimerState() {
  const savedState = localStorage.getItem("promodoTimerState");
  if (!savedState) return;

  const {
    currentTime: savedTime,
    currentSession: savedSession,
    onBreak: savedBreak,
    isRunning: savedRunning,
  } = JSON.parse(savedState);

  currentTime = savedTime;
  currentSession = savedSession;
  onBreak = savedBreak;
  isRunning = savedRunning;

  sessionCount.textContent = currentSession;
  updateDisplay();

  if (isRunning) startTimer();
}

// Load saved user settings and timer state on page load
loadSettings();
loadTimerState();
updateDisplay();
