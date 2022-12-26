import { showOverlay, hideOverlay } from '../bg-overlay/bg-overlay';
import { productData } from '../productData';
import { Product, ProductItem } from '../types';
import { getDiscountPrice } from '../product-card/product-card';
import ProductsStorage from '../../storage/ProductsStorage';
import CartState from '../../storage/CartState';

const productsStorage = new ProductsStorage('cartProducts');
const cartState = new CartState('cartAsideItems', '.cart__list');

const showCart = () => {
  const cart = document.querySelector('.cart') as HTMLDivElement;
  const cartButton = document.querySelector('.cart-open') as HTMLButtonElement;

  cartButton.addEventListener('click', () => {
    cart.classList.add('active');

    showOverlay();
  });
};

const hideCart = () => {
  const cart = document.querySelector('.cart') as HTMLDivElement;

  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.className.includes('cart__close') || target.className.includes('bg-overlay')) {
      cart.classList.remove('active');

      hideOverlay();
    }
  });
};

const getProductQuantity = (): number => {
  const quantity = document.querySelector('.product-quantity__input') as HTMLInputElement;

  return (quantity) ? +quantity.value : 1;
};

const setProductsAmount = (...selectors: string[]) => {
  const products = productsStorage.load();
  const amount = products.reduce((acc, product) => acc + product.quantity, 0);

  selectors.forEach((selector) => {
    const amountContainer = document.querySelector(selector) as HTMLElement;

    amountContainer.textContent = `${amount}`;
  });
};

const setTotalPrice = (...selectors: string[]) => {
  const products = productsStorage.load();
  const price = products.reduce((acc, val) => acc + val.price, 0);

  selectors.forEach((selector) => {
    const totalPriceContainer = document.querySelector(selector) as HTMLElement;

    totalPriceContainer.textContent = `$${price.toFixed(2)}`;
  });
};

const addToCart = (id: number) => {
  const product = productData.find((product) => product.id === id) as Product;
  const discount = getDiscountPrice(product.price, product.discountPercentage);
  const quantity = getProductQuantity();
  const price = ((discount || product.price) * quantity).toFixed(2);
  const productsList = document.querySelector('.cart__list') as HTMLUListElement;
  
  const template = `
    <li class="cart__item" data-product-id="${id}">
      <div class="cart__product-image" style="background-image: url('${product.images[0]}')"></div>
      <div class="cart__product-wrapper">
        <div class="cart__product-title">${product.title}</div>
        <div class="cart__product-info">
          <div class="cart__product-price-wrapper">
            <p class="cart__product-quantity">${quantity}  x</p>
            <p class="cart__product-price">$${price}</p>
          </div>
          <i class="cart__product-delete bi bi-trash"></i>
        </div>
      </div>
    </li>
  `;

  const productItemData: ProductItem = {
    image: product.images[0],
    title: product.title,
    id,
    price: +price,
    discount,
    quantity,
  };

  productsStorage.save(productItemData);
  productsList.insertAdjacentHTML('beforeend', template);
};

const checkAddToCartAvailability = () => {
  const products = productsStorage.load();
  const cartButtons = document.querySelectorAll('.add-to-cart') as NodeListOf<HTMLButtonElement>;

  cartButtons.forEach((button) => {
    button.dataset.isInCart = 'false';
    button.textContent = 'Add to cart';
  });

  products.forEach((product) => {
    const cartButton = document.querySelector(`.add-to-cart[data-button-id="${product.id}"]`) as HTMLButtonElement;    
    
    if (cartButton) {
      cartButton.dataset.isInCart = 'true';
      cartButton.textContent = 'In cart';
    }
  });
};

const watchCart = () => {
  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.closest('.add-to-cart')) {
      const cartButton = target.closest('.add-to-cart') as HTMLButtonElement;
      const isInCart = cartButton.dataset.isInCart === 'true';
      const productId = +<string>cartButton.dataset.buttonId;

      if (isInCart) {
        const cartItem = document.querySelector(`.cart__item[data-product-id="${productId}"]`) as HTMLLIElement;

        cartItem.remove();
        productsStorage.removeSome(productId);
      } else {
        addToCart(productId);
      }

      setTotalPrice('.header__total-amount', '.cart__total');
      setProductsAmount('.cart__amount', '.header__cart-quantity');
      cartState.save();
    }

    if (target.closest('.cart__product-delete')) {
      const cartItem = target.closest('.cart__item') as HTMLLIElement;
      const productId = +<string>cartItem.dataset.productId;

      cartItem.remove();
      productsStorage.removeSome(productId);
      setTotalPrice('.header__total-amount', '.cart__total');
      setProductsAmount('.cart__amount', '.header__cart-quantity');
      cartState.save();
    }

    checkAddToCartAvailability();
  });
};

export const initCart = () => {
  showCart();
  hideCart();
  setProductsAmount('.cart__amount', '.header__cart-quantity');
  setTotalPrice('.header__total-amount', '.cart__total');
  cartState.setState();
  checkAddToCartAvailability();
  watchCart();
};
