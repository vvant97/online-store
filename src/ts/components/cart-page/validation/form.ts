import { watchCardNumber, isValidCardNumber } from './card-number';
import { watchCvv, isValidCvv } from './cvv';
import { watchExpiration, isValidExpiration } from './expiration';
import { isCorrectFullName } from './full-name';
import { isCorrectAddress } from './address';
import { isCorrectEmailAddress } from './email-address';
import { watchPhoneNumber, isValidPhoneNumber } from './phone-number';

export const validateCheckoutForm = () => {
  const form = document.querySelector('.order') as HTMLFormElement;

  watchPhoneNumber();
  watchCardNumber();
  watchExpiration();
  watchCvv();

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    isCorrectFullName();
    isCorrectAddress();
    isCorrectEmailAddress();
    isValidPhoneNumber();
    isValidCardNumber();
    isValidExpiration();
    isValidCvv();
  });
};
