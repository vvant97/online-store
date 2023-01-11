import { showOverlay, hideOverlay } from '../bg-overlay/bg-overlay';
import { validateCheckoutForm } from './validation/form';

export const createCheckoutTemplate = (): string => {
  const template = `
    <form class="order" novalidate>
      <i class="order__close bi bi-x-lg"></i>
      <fieldset class="order__user-details">
        <p class="order__title">Personal details</p>
        <input class="order__input order__name" type="text" placeholder="Full name">
        <input class="order__input order__address" type="text" placeholder="Delivery address">
        <input class="order__input order__phone" type="tel" placeholder="Phone">
        <input class="order__input order__email" type="email" placeholder="Email">
      </fieldset>
      <fieldset class="order__card-details">
        <p class="order__title">Card details</p>
        <div class="order__card-details-container">
          <div class="order__card-number">
            <div class="order__icon-container">
              <i class="order__icon bi bi-credit-card-2-back"></i>
            </div>
            <input class="order__input order__card" type="text" placeholder="Card number">
          </div>
          <div class="order__card-additional">
            <input class="order__input order__expiration" type="text" placeholder="MM / YY" maxlength="7">
            <input class="order__input order__cvv" type="text" placeholder="CVV" maxlength="3">
          </div>
        </div>
      </fieldset>
      <button class="order__submit" type="submit">Place an order</button>
    </form>
  `;

  return template;
};

export function appendCheckoutForm() {
  const overlay = document.querySelector('.bg-overlay') as HTMLElement;
  const checkoutForm = createCheckoutTemplate();

  overlay.insertAdjacentHTML('afterbegin', checkoutForm);

  showOverlay();
  validateCheckoutForm();
}

export const watchCheckoutOpenEvents = (selector: string) => {
  const handlingElement = document.querySelector(selector) as HTMLElement;

  if (handlingElement) {
    handlingElement.addEventListener('click', appendCheckoutForm);
  }
};

export const watchCheckoutCloseEvents = () => {
  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    const overlay = document.querySelector('.bg-overlay') as HTMLElement;
    const checkoutForm = document.querySelector('.order') as HTMLFormElement;
    const checkoutFormCloseButton = document.querySelector('.order__close') as HTMLElement;

    if (target === overlay || target === checkoutFormCloseButton) {
      if (checkoutForm) {
        checkoutForm.remove();
        hideOverlay();
      }
    }
  });
};
