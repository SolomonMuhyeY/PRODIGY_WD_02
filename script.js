let startTime,
  elapsedTime = 0,
  timerInterval;
let isTimerRunning = false;
const lapList = document.getElementById("lap-list");

function formatTime(time) {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  return `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
}

function padZero(value) {
  return value.toString().padStart(2, "0");
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTimer, 10);
  isTimerRunning = true;
}

function stopTimer() {
  clearInterval(timerInterval);
  elapsedTime = Date.now() - startTime;
  isTimerRunning = false;
}

function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  resetTimerCounter();
  lapList.innerHTML = "";
}

function updateTimer() {
  const currentTime = Date.now() - startTime;
  updateDisplay(currentTime);
}
function resetTimerCounter() {
  const currentTime = 0;
  updateDisplay(currentTime);
}

function updateDisplay(time) {
  document.getElementById("minutes").textContent =
    formatTime(time).split(":")[0];
  document.getElementById("seconds").textContent =
    formatTime(time).split(":")[1];
  document.getElementById("milliseconds").textContent =
    formatTime(time).split(":")[2];
}

function addLap() {
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement("li");
  lapItem.textContent = lapTime;
  lapList.appendChild(lapItem);
}

document.getElementById("start").addEventListener("click", () => {
  if (!isTimerRunning) {
    startTimer();
  }
});

document.getElementById("stop").addEventListener("click", () => {
  if (isTimerRunning) {
    stopTimer();
    addLap();
  }
});

document.getElementById("reset").addEventListener("click", () => {
  resetTimer();
});
