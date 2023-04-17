const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');

btnStartEl.addEventListener('click', onClickBtnStart);
btnStopEl.addEventListener('click', onClickBtnStop);

let timeId = null;

function onClickBtnStart(evt) {
  evt.currentTarget.disabled = true;
  btnStopEl.disabled = false;

  timeId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickBtnStop(evt) {
  evt.currentTarget.disabled = true;
  btnStartEl.disabled = false;
  clearInterval(timeId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
