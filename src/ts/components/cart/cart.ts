import { showOverlay, hideOverlay } from '../bg-overlay/bg-overlay';
import { productData } from '../productData';
import { Product, ProductItem } from '../types';
import { getDiscountPrice } from '../product-card/product-card';
import ProductsStorage from '../../storage/ProductsStorage';
import CartState from '../../storage/CartState';
import { renderCartPage } from '../cart-page/cart-page';
import { appendCheckoutForm } from '../cart-page/checkout';
import { renderProductsList, setCurrentPage } from '../cart-page/pagination';

export const productsStorage = new ProductsStorage('cartProducts');
export const cartState = new CartState('cartAsideItems', '.cart__list');

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

const getProductQuantity = (id: number): number => {
  const quantity = document.querySelector(`.product-quantity__input-${id}`) as HTMLInputElement;

  return quantity ? +quantity.value : 1;
};

export const setProductsAmount = (...selectors: string[]) => {
  const products = productsStorage.load();
  const amount = products.reduce((acc, product) => acc + product.quantity, 0);

  selectors.forEach((selector) => {
    const amountContainer = document.querySelector(selector) as HTMLElement;

    amountContainer.textContent = `${amount}`;
  });
};

export const setTotalPrice = (...selectors: string[]) => {
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
  const quantity = getProductQuantity(id);
  const price = ((discount || product.price) * quantity).toFixed(2);
  const productsList = document.querySelector('.cart__list') as HTMLUListElement;
  const brand = product.brand;
  const category = product.category;
  const rating = product.rating;
  const oldPrice = product.price;
  const discountPercent = Math.floor(product.discountPercentage);
  const stock = product.stock;

  const template = `
    <li class="cart__item" data-product-id="${id}">
      <div class="cart__product-image" style="background-image: url('${product.images[0]}')"></div>
      <div class="cart__product-wrapper">
        <a class="cart__product-title" href="/product-${product.id}">${product.title}</a>
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
    priceByOne: discount || product.price,
    brand,
    category,
    rating,
    oldPrice,
    discountPercent,
    stock,
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

const openCartAside = () => {
  const cart = document.querySelector('.cart') as HTMLDivElement;

  cart.classList.add('active');
  showOverlay();
};

const closeCartAside = () => {
  const cart = document.querySelector('.cart') as HTMLDivElement;

  cart.classList.remove('active');
  hideOverlay();
};

const watchCart = () => {
  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.closest('.add-to-cart')) {
      const cartButton = target.closest('.add-to-cart') as HTMLButtonElement;
      const isInCart = cartButton.dataset.isInCart === 'true';
      const productId = +(<string>cartButton.dataset.buttonId);

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

      openCartAside();
    }

    if (target.closest('.product-info__buy-button')) {
      const cartButton = document.querySelector('.add-to-cart') as HTMLElement;
      const isInCart = cartButton.dataset.isInCart === 'true';
      const productId = +(<string>cartButton.dataset.buttonId);

      if (!isInCart) {
        addToCart(productId);
      }

      setTotalPrice('.header__total-amount', '.cart__total');
      setProductsAmount('.cart__amount', '.header__cart-quantity');
      cartState.save();

      window.history.pushState({}, '', '/cart');

      closeCartAside();
      renderCartPage();
      appendCheckoutForm();
    }

    if (target.closest('.cart__product-delete')) {
      const cartAsideItem = target.closest('.cart__item') as HTMLLIElement;
      const productId = +(<string>cartAsideItem.dataset.productId);

      if (window.location.pathname.includes('cart')) {
        const cartItems = document.querySelectorAll('.product-cart__product-item');
        const cartItemToRemove = [...cartItems].find((item) => +item.id === productId) as HTMLLIElement;

        cartItemToRemove.remove();
      }

      cartAsideItem.remove();
      productsStorage.removeSome(productId);
      setTotalPrice('.header__total-amount', '.cart__total');
      setProductsAmount('.cart__amount', '.header__cart-quantity');

      if (location.pathname.includes('cart')) {
        setTotalPrice('.product-cart__checkout-total');
        setProductsAmount('.product-cart__checkout-amount');
      }

      cartState.save();
    }

    checkAddToCartAvailability();
  });
};

const updateProductInfo = (id: number) => {
  const productToReplace = productsStorage.loadSome(id);

  if (!productToReplace) {
    return;
  }

  const quantity = getProductQuantity(id);
  const price = productToReplace.priceByOne * quantity;
  const cartAsideItem = document.querySelector(`.cart__item[data-product-id="${id}"]`) as HTMLLIElement;
  const cartAsideProductQuantity = cartAsideItem.querySelector('.cart__product-quantity') as HTMLParagraphElement;
  const cartAsideProductPrice = cartAsideItem.querySelector('.cart__product-price') as HTMLParagraphElement;

  if (window.location.pathname.includes('cart')) {
    const cartPageProductFullPriceContainer = document.querySelector(
      `.product-cart__product-item__price-${id}`,
    ) as HTMLParagraphElement;

    cartPageProductFullPriceContainer.textContent = `$${price.toFixed(2)}`;
  }

  productsStorage.removeSome(id);
  productToReplace.quantity = quantity;
  productToReplace.price = price;
  cartAsideProductQuantity.textContent = `${quantity}  x`;
  cartAsideProductPrice.textContent = `$${price.toFixed(2)}`;
  productsStorage.save(productToReplace);
  setTotalPrice('.header__total-amount', '.cart__total');
  setProductsAmount('.cart__amount', '.header__cart-quantity');

  if (location.pathname.includes('cart')) {
    setTotalPrice('.product-cart__checkout-total');
    setProductsAmount('.product-cart__checkout-amount');
  }

  cartState.save();
};

export const updateCart = () => {
  document.addEventListener('click', (event: Event) => {
    const target = (<HTMLDivElement>event.target).closest('.product-quantity__controls');

    if (target) {
      const product = <HTMLDivElement | HTMLLinkElement>(
        (<HTMLDivElement | HTMLLinkElement>event.target).closest('.product-pick')
      );
      const productId = +product.id;

      updateProductInfo(productId);

      setCurrentPage();
      renderProductsList();
    }
  });

  document.addEventListener('change', (event: Event) => {
    const target = (<HTMLDivElement>event.target).closest('.product-quantity__input');

    if (target) {
      const product = <HTMLDivElement | HTMLLinkElement>(
        (<HTMLDivElement | HTMLLinkElement>event.target).closest('.product-pick')
      );
      const productId = +product.id;

      updateProductInfo(productId);
    }
  });
};

function handleCartAsideCheckoutButtonEvents() {
  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLButtonElement;

    if (target.matches('.go-to-checkout')) {
      const products = productsStorage.load().length;

      closeCartAside();
      renderCartPage();
      
      if (products) {
        appendCheckoutForm();
      }
    }
  });
}

export const initCart = () => {
  showCart();
  hideCart();
  setProductsAmount('.cart__amount', '.header__cart-quantity');
  setTotalPrice('.header__total-amount', '.cart__total');
  cartState.setState();
  checkAddToCartAvailability();
  watchCart();
  updateCart();
  handleCartAsideCheckoutButtonEvents();

  document.addEventListener('click', (event: Event) => {
    const target = (<HTMLAnchorElement>event.target).classList.contains('go-to-cart');

    if (target) {
      renderCartPage();
      closeCartAside();
    }
  });
};
