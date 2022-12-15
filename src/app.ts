import './scss/style.scss';

const filterTestTemplate = `
  <div class="bg-overlay"></div>
  <button class="filter-open">Filter</button>
  <div class="filter">
    <i class="filter__close bi bi-x-lg"></i>
    <ul class="filter__list">
      <li class="filter__item">
        <div class="filter__title">Filter</div>
      </li>
      <li class="filter__item">
        <div class="filter__title">Availability</div>
      </li>
      <li class="filter__item">
        <div class="filter__title">Brand</div>
      </li>
      <li class="filter__item">
        <div class="filter__title">Category</div>
      </li>
      <li class="filter__item">
        <div class="filter__title">Price</div>
      </li>
    </ul>
  </div>

  <button class="cart-open">Cart</button>
  <div class="cart">
    <div class="cart__header">
      <div class="cart__amount-title">There are <span class="cart__amount">0</span> products</div>
      <i class="cart__close bi bi-x-lg"></i>
    </div>
    <div class="cart__main">
      <ul class="cart__list"></ul>
    </div>
    <div class="cart__footer">
      <div class="cart__total-container">
        <p class="cart__total-title">Subtotal</p>
        <p class="cart__total">$45.00</p>
      </div>
      <div class="cart__controls">
        <label class="cart__agreement-label" for="cart__agreement">
          <input class="cart__agreement" type="checkbox" id="cart__agreement">
          <p class="cart__agreement-text">I have read and agree with the <br> <a href="#" class="cart__agreement-link">terms & condition.</a></p>
        </label>
        <div class="cart__buttons">
          <button class="cart__button">View cart</button>
          <button class="cart__button cart__button_disabled">Checkout</button>
        </div>
      </div>
    </div>
  </div>
`;

document.body.innerHTML = filterTestTemplate;

import  { showFilter, hideFilter } from './ts/components/filter/filter';

showFilter();
hideFilter();

import  { showCart, hideCart } from './ts/components/cart/cart';

showCart();
hideCart();
