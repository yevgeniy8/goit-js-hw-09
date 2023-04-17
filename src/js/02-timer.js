import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStartEl = document.querySelector('button[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const secEl = document.querySelector('span[data-seconds]');
const minEl = document.querySelector('span[data-minutes]');
const hoursEl = document.querySelector('span[data-hours]');
const daysEl = document.querySelector('span[data-days]');

btnStartEl.addEventListener('click', onClickBtnStart);

let timeId = null;
btnStartEl.disabled = true;

function onClickBtnStart() {
  timeId = setInterval(() => {
    const currentTime = new Date(inputEl.value);
    const delaTime = currentTime - Date.now();
    const time = convertMs(delaTime);
    updateClockFace(time);

    if (delaTime <= 1000) {
      clearInterval(timeId);
    }
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
  },
  onChange(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      btnStartEl.disabled = false;
      return;
    } else {
      btnStartEl.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateClockFace({ days, hours, minutes, seconds }) {
  secEl.textContent = addLeadingZero(seconds);
  minEl.textContent = addLeadingZero(minutes);
  hoursEl.textContent = addLeadingZero(hours);
  daysEl.textContent = addLeadingZero(days);
}
