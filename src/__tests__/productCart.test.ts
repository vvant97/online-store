import { createCartProductItems } from '../ts/components/cart-page/cart-page';
import {
  createCartLayoutTemplate,
  createCartProductItemTemplate,
  createEmptyCartPageTemplate,
  PAYMENT_SYSTEM_ICONS,
} from '../ts/components/cart-page/cart-templates';

describe('#Create cart template', () => {
  it('should work correctly', () => {
    expect(createCartLayoutTemplate()).toBeDefined();
    expect(typeof createCartLayoutTemplate).toBe('function');
    expect(createCartLayoutTemplate()).toBeTruthy();
  });

  it('should return string', () => {
    expect(typeof createCartLayoutTemplate()).toBe('string');
  });

  it('should create correct HTML code', () => {
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

    expect(createCartLayoutTemplate()).toBe(template);
  });
});

describe('#Create product cart item', () => {
  const product = {
    image: '../../assets/img/97875233511-l.jpg',
    title: 'Apple MacBook Pro M2',
    id: 7,
    price: 2447.5,
    discount: 1223.75,
    quantity: 2,
    priceByOne: 1223.75,
    brand: 'Apple',
    category: 'laptops',
    rating: 4.57,
    oldPrice: 1375,
    discountPercent: 11,
    stock: 83,
  };

  it('should work correctly', () => {
    expect(createCartProductItemTemplate(product, 1)).toBeDefined();
    expect(typeof createCartProductItemTemplate).toBe('function');
    expect(createCartProductItemTemplate(product, 1)).toBeTruthy();
  });

  it('should return string', () => {
    expect(typeof createCartLayoutTemplate()).toBe('string');
  });
});

describe('#Create cart product items list', () => {
  const products = [
    {
      image: '../../assets/img/97875233511-l.jpg',
      title: 'Apple MacBook Pro M2',
      id: 7,
      price: 2447.5,
      discount: 1223.75,
      quantity: 2,
      priceByOne: 1223.75,
      brand: 'Apple',
      category: 'laptops',
      rating: 4.57,
      oldPrice: 1375,
      discountPercent: 11,
      stock: 83,
    },
    {
      image: '../../assets/img/34565233511-l.jpg',
      title: 'Apple IPad 10',
      id: 10,
      price: 745.36,
      discount: 745.36,
      quantity: 1,
      priceByOne: 745.36,
      brand: 'Apple',
      category: 'tablet',
      rating: 4.54,
      oldPrice: 847,
      discountPercent: 11,
      stock: 96,
    },
  ];

  it('should work correctly', () => {
    expect(createCartProductItems(products)).toBeDefined();
    expect(typeof createCartProductItems).toBe('function');
    expect(createCartProductItems(products)).toBeTruthy();
  });

  it('should return HTMLLIElement[]', () => {
    expect(createCartProductItems(products).toString()).toBe('[object HTMLLIElement],[object HTMLLIElement]');
  });
});

describe('#Create empty cart template', () => {
  it('should work correctly', () => {
    expect(createEmptyCartPageTemplate()).toBeDefined();
    expect(typeof createEmptyCartPageTemplate).toBe('function');
    expect(createEmptyCartPageTemplate()).toBeTruthy();
  });

  it('should return string', () => {
    expect(typeof createEmptyCartPageTemplate()).toBe('string');
  });

  it('should create correct HTML code', () => {
    const template = `
    <div class="product-cart__empty">
      <h2 class="product-cart__empty-title">Your cart is empty</h2>
      <i class="product-cart__empty-icon bi bi-inbox-fill"></i>
    </div>
  `;

    expect(createEmptyCartPageTemplate()).toBe(template);
  });
});
