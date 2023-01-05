import { watchCardNumber, isValidCardNumber } from './card-number';
import { watchCvv, isValidCvv } from './cvv';

export const validateCheckoutForm = () => {
  const form = document.querySelector('.order') as HTMLFormElement;

  watchCardNumber();
  watchCvv();

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    isValidCardNumber();
    isValidCvv();
  });
};
