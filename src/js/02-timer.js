import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"

import { Notify } from 'notiflix/build/notiflix-notify-aio'


const btnStart = document.querySelector('button[data-start]');
btnStart.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      Notify.failure("Please choose a date in the future");
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;

      const deadline = selectedDates[0].getTime();

      btnStart.addEventListener('click', timer);
      function timer() {
        const timerStart = setInterval(() => {
            const diff = deadline - new Date();
            if (diff < 999) {
            clearInterval(timerStart);
            }
            const { days, hours, minutes, seconds } = convertMs(diff);
          
            const spanDays = document.querySelector('span[data-days]');
            const spanHours = document.querySelector('span[data-hours]');
            const spanMinutes = document.querySelector('span[data-minutes]');
            const spanSecoonds = document.querySelector('span[data-seconds]');

            spanDays.textContent = days;
            spanHours.textContent = hours;
            spanMinutes.textContent = minutes;
            spanSecoonds.textContent = seconds;
        }, 1000);
};
    }
  },
};

flatpickr('input#datetime-picker', options);

function pad(value) {
    return String(value).padStart(2, '0');
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}