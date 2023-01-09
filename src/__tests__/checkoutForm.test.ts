import { createCheckoutTemplate } from '../ts/components/cart-page/checkout';

describe('#Create checkoutForm', () => {
  it('should work correctly', () => {
    expect(createCheckoutTemplate()).toBeDefined();
    expect(typeof createCheckoutTemplate).toBe('function');
    expect(createCheckoutTemplate()).toBeTruthy();
  });

  it('should return string', () => {
    expect(typeof createCheckoutTemplate()).toBe('string');
  });

  it('should create correct HTML code', () => {
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
    expect(createCheckoutTemplate()).toBe(template);
  });
});
