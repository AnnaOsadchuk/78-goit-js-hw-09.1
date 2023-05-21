import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elForm = document.querySelector('.form');

elForm.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

function onFormSubmit(event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;

  const firstDelay = formElements.delay.value;
  const step = formElements.step.value;
  const amount = formElements.amount.value;

  const formData = {
    firstDelay,
    step,
    amount,
  };

  for (let i = 0; i < amount; i++) {
    const delay = Number(formData.firstDelay) + Number(formData.step * i);
    createPromise(i + 1, delay)
      .then(({ position, delay }) =>
        Notify.success(`Fulfilled promise ${position} in ${delay} ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`Reject promise ${position} in ${delay} ms`)
      );
  }
  elForm.reset();
}
