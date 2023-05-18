import { Notify } from 'notiflix/build/notiflix-notify-aio';

const elForm = document.querySelector('.form');

elForm.addEventListener('submit', onFormSubmit);

function createPromise(i, formData) {
  const shouldResolve = Math.random() > 0.3;
  const delay = Number(formData.firstDelay) + Number(formData.step * i);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${i + 1} in ${delay} ms`);
      } else {
        reject(`Reject promise ${i + 1} in ${delay} ms`);
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
    createPromise(i, formData)
      .then(x => Notify.success(x))
      .catch(x => Notify.failure(x));
  }
}
