import { ProductItem } from '../types';

export enum PAYMENT_SYSTEM_ICONS {
  VISA = `<svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"></path></svg>`,
  MASTERCARD = `<svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-master"><title id="pi-master">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path></svg>`,
  AMERICAN_EXPRESS = `<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" aria-labelledby="pi-american_express"><title id="pi-american_express">American Express</title><g fill="none"><path fill="#000" d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z" opacity=".07"></path><path fill="#006FCF" d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"></path><path fill="#FFF" d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"></path></g></svg>`,
  DEFAULT = `<i class="order__icon bi bi-credit-card-2-back"></i>`,
}

export const createCartLayoutTemplate = (): string => {
  const template = `
    <div class="product-cart">
      <div class="product-cart__info">
        <div class="product-cart__title-area">
          <h2 class="product-cart__title">My cart:</h2>
          <div class="pagination">
            <div class="pagination__limit-container">
              <p class="pagination__title">Limit:</p>
              <input class="pagination__limit" type="text">
            </div>
            <div class="pagination__pages-container">
              <p class="pagination__title">Page:</p>
              <div class="pagination__controls">
                <i class="pagination__nav pagination__nav-prev bi bi-arrow-left-short"></i>
                <span class="pagination__page">1</span>
                <i class="pagination__nav pagination__nav-next bi bi-arrow-right-short"></i>
              </div>
            </div>
          </div>
        </div>
        <ul class="product-cart__product-list"></ul>
      </div>
      <div class="product-cart__checkout">
        <div class="product-cart__checkout-title-area">
          <p class="product-cart__checkout-items">
            <span class="product-cart__checkout-title">Items</span>
            <span class="product-cart__checkout-amount"></span>
          </p>
          <p class="product-cart__checkout-price">
            <span class="product-cart__checkout-title">Total</span>
            <span class="product-cart__checkout-total"></span>
          </p>
        </div>
        <div class="product-cart__checkout-promo">
          <input class="product-cart__checkout-promo-input" type="text" placeholder="Discount code (S10, M20, L30)">
          <ul class="product-cart__checkout-promo-list">
            <li class="product-cart__checkout-promo-item" data-code="S10"><span>S10 -10%</span> <i class="bi bi-plus-lg"></i></li>
            <li class="product-cart__checkout-promo-item" data-code="M20"><span>M20 -20%</span> <i class="bi bi-plus-lg"></i></li>
            <li class="product-cart__checkout-promo-item" data-code="L30"><span>L30 -30%</span> <i class="bi bi-plus-lg"></i></li>
          </ul>
        </div>
        <button class="product-cart__checkout-open">Checkout</button>
        <div class="payment-icons">
          ${PAYMENT_SYSTEM_ICONS.VISA}
          ${PAYMENT_SYSTEM_ICONS.MASTERCARD}
          ${PAYMENT_SYSTEM_ICONS.AMERICAN_EXPRESS}
        </div>
      </div>
    </div>
  `;

  return template;
};

export const createCartProductItemTemplate = (options: ProductItem, order: number): string => {
  const discountPercent = options.discountPercent;

  let priceTemplate = `$${options.priceByOne.toFixed(2)}`;

  if (discountPercent) {
    priceTemplate += `
      <span class="product-cart__product-item-old-price">$${options.oldPrice.toFixed(2)}</span>
      <span class="product-cart__product-item-discount">-${options.discountPercent}%</span>
    `;
  }

  const template = `
    <p class="product-cart__product-item-order">${order + 1}</p>
    <div class="product-cart__product-item-info">
      <div class="product-cart__product-item-image" style="background-image: url('${options.image}')"></div>
      <div class="product-cart__product-item-about">
        <div class="product-cart__product-item-rating">${options.rating}</div>
        <a class="product-cart__product-item-title" href="/product-${options.id}">${options.title}</a>
        <p class="product-cart__product-item-price">${priceTemplate}</p>
        <p class="product-cart__product-item-id">SKU: <span>${options.id}</span></p>
        <p class="product-cart__product-item-stock">Stock: <span>(${options.stock})</span></p>
        <p class="product-cart__product-item-brand">Brand: <span>${options.brand}</span></p>
        <p class="product-cart__product-item-category">Category: <span>${options.category}</span></p>
      </div>
    </div>
    <div class="product-cart__product-item-controls">
      <div class="product-cart__product-item__qty product-cart__product-item__qty-${options.id}">
        <button class="product-cart__product-item-remove">Remove</button>
      </div>
      <p class="product-cart__product-item__price product-cart__product-item__price-${
        options.id
      }">$${options.price.toFixed(2)}</p>
    </div>
  `;

  return template;
};

export const createEmptyCartPageTemplate = (): string => {
  const template = `
    <div class="product-cart__empty">
      <h2 class="product-cart__empty-title">Your cart is empty</h2>
      <i class="product-cart__empty-icon bi bi-inbox-fill"></i>
    </div>
  `;

  return template;
};
