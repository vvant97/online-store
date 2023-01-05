import { watchCardNumber, isValidCardNumber } from './card-number';

export const validateCheckoutForm = () => {
  const form = document.querySelector('.order') as HTMLFormElement;

  watchCardNumber();

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    isValidCardNumber();
  });
};
