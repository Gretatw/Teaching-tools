let timeLeft = 0;
let timerId = null;

const setupScreen = document.getElementById('setup-screen');
const timerScreen = document.getElementById('timer-screen');
const alertScreen = document.getElementById('alert-screen');
const timerDisplay = document.getElementById('timer-display');
const minutesInput = document.getElementById('minutes-input');
const startBtn = document.getElementById('start-btn');

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
    const mins = parseInt(minutesInput.value);
    if (isNaN(mins) || mins <= 0) return;

    timeLeft = mins * 60;
    updateDisplay();

    setupScreen.classList.remove('active');
    timerScreen.classList.add('active');

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerId);
            showEndAlert();
        }
    }, 1000);
}

function showEndAlert() {
    timerScreen.classList.remove('active');
    alertScreen.classList.add('active');
}

function reset() {
    clearInterval(timerId);
    alertScreen.classList.remove('active');
    timerScreen.classList.remove('active');
    setupScreen.classList.add('active');
}

startBtn.addEventListener('click', startTimer);
alertScreen.addEventListener('click', reset);
timerScreen.addEventListener('click', reset); // Allow cancel during timer

// Prevent screen sleep if possible (API support varies)
if ('wakeLock' in navigator) {
    let wakeLock = null;
    const requestWakeLock = async () => {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
        } catch (err) {
            console.error(`${err.name}, ${err.message}`);
        }
    };
    
    startBtn.addEventListener('click', requestWakeLock);
}
