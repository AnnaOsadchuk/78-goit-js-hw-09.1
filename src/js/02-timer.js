import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonEl = document.querySelector('button[data-start]');
const inputEl = document.getElementById('datetime-picker');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let currentDate = new Date();
let targetDate = new Date();

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: currentDate,
  onClose(selectedDates) {
    targetDate = selectedDates[0];
    if (targetDate < currentDate) {
      const message = 'Please choose a date in the future';
      Notify.failure(message);
    } else {
      buttonEl.removeAttribute('disabled');
    }
  },
};

flatpickr(inputEl, options);
buttonEl.addEventListener('click', startCounter);

function startCounter() {
  if (targetDate > currentDate) {
    buttonEl.disabled = true;
    const timerId = setInterval(() => {
      currentDate = new Date();
      const diff = convertMs(targetDate - currentDate);
      if (targetDate > currentDate) {
        setCounterFields(diff);
      } else {
        clearInterval(timerId);
      }
    }, 1000);
  }
}

function setCounterFields(diff) {
  days.textContent = addLeadingZero(diff.days);
  hours.textContent = addLeadingZero(diff.hours);
  minutes.textContent = addLeadingZero(diff.minutes);
  seconds.textContent = addLeadingZero(diff.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
