const randomColor = function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const CHANGE_COLOR_DELAY = 1000;

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

stopBtn.setAttribute('disabled', 'disabled')

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = randomColor();
  }, CHANGE_COLOR_DELAY);
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
clearTimeout(timerId);
    startBtn.disabled = false; 
    stopBtn.disabled = true;
});