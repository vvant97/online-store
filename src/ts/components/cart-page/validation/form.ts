import { watchCardNumber, isValidCardNumber } from './card-number';
import { watchCvv, isValidCvv } from './cvv';
import { watchExpiration, isValidExpiration } from './expiration';
import { isCorrectFullName } from './full-name';
import { isCorrectAddress } from './address';
import { isCorrectEmailAddress } from './email-address';
import { watchPhoneNumber, isValidPhoneNumber } from './phone-number';
import { productsStorage, cartState } from '../../cart/cart';

function isValidForm() {
  return [
    isCorrectFullName(),
    isCorrectAddress(),
    isCorrectEmailAddress(),
    isValidPhoneNumber(),
    isValidCardNumber(),
    isValidExpiration(),
    isValidCvv()
  ].every((input) => input === true);
}

function confirmOrder(event: Event) {
  const target = event.currentTarget as HTMLFormElement;
  const confirmationTemplate = `
    <div class="order__confirmation">
      <i class="order__confirmation-icon bi bi-check-circle"></i>
      <p class="order__confirmation-title">Your order was confirmed</p>
    </div>
  `;
  
  target.innerHTML = confirmationTemplate;
  productsStorage.remove();
  cartState.remove();

  setTimeout(() => {
    location.href = '/';
  }, 5000);
}

export const validateCheckoutForm = () => {
  const form = document.querySelector('.order') as HTMLFormElement;

  watchPhoneNumber();
  watchCardNumber();
  watchExpiration();
  watchCvv();

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    if (isValidForm()) {
      confirmOrder(event);
    }
  });
};
