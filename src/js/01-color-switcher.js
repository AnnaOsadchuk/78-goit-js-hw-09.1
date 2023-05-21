const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

buttonStart.addEventListener('click', startOnClick);
buttonStop.addEventListener('click', stopOnClick);
buttonStop.disabled = true;

function startOnClick() {
  buttonStart.disabled = true;
  buttonStop.disabled = false;
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
    }
  }, 1000);
}

function stopOnClick() {
  buttonStart.disabled = false;
  buttonStop.disabled = true;
  clearInterval(timerId);
}
