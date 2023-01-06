import { watchCardNumber, isValidCardNumber } from './card-number';
import { watchCvv, isValidCvv } from './cvv';
import { watchExpiration, isValidExpiration } from './expiration';
import { isCorrectFullName } from './full-name';

export const validateCheckoutForm = () => {
  const form = document.querySelector('.order') as HTMLFormElement;

  watchCardNumber();
  watchExpiration();
  watchCvv();

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    isCorrectFullName();
    isValidCardNumber();
    isValidExpiration();
    isValidCvv();
  });
};
