import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });    
}

form.addEventListener('submit', evt => {
  evt.preventDefault();
  let delay = Number(evt.target.delay.value);
  let amount = Number(evt.target.amount.value);
  let step = Number(evt.target.step.value);

  for (let i = 1; i <= amount; i += 1) {
    setTimeout(() => {
        createPromise(i, delay)
        .then(({ position, delay }) => {
          Notify.success(` Fulfilled promise ${position} in ${delay += (i * step)}ms`);
      })
        .catch(({ position, delay }) => {
          Notify.failure(` Rejected promise ${position} in ${delay += (i * step)}ms`);
        });
      }, i * step)
    }
  evt.currentTarget.reset();
});