import { ProductItem } from '../types';
import { createRating } from '../rating/rating';
import { createCartProductItemTemplate, createCartLayoutTemplate, createEmptyCartPageTemplate } from './cart-templates';
import { productsStorage, setTotalPrice, setProductsAmount, cartState } from '../cart/cart';
import { createProductQuantity } from '../product-quantity/product-quantity';
import { watchPromocode } from '../promocode/promocode';
import { watchCheckoutOpenEvents } from './checkout';
import {
  watchPagination,
  renderProductsList,
  setDefaultProductsLimit,
  setCurrentPage,
  setDefaultProductsPage,
} from './pagination';

export const createCartProductItems = (productsInCart: ProductItem[]): HTMLLIElement[] => {
  const products: HTMLLIElement[] = productsInCart.map((product, index) => {
    const item = document.createElement('li');
    const template = createCartProductItemTemplate(product, index);

    item.className = 'product-cart__product-item product-pick';
    item.innerHTML = template;
    item.id = `${product.id}`;

    return item;
  });

  return products;
};

const appendProducts = (products: HTMLLIElement[]) => {
  const productsList = document.querySelector('.product-cart__product-list') as HTMLUListElement;

  productsList.append(...products);
};

const appendProductsQuantity = () => {
  const products = productsStorage.load();

  products.forEach((product) => {
    const stock = product.stock;
    const id = product.id;
    const quantity = createProductQuantity(stock, id);
    const quantityContainer = document.querySelector(`.product-cart__product-item__qty-${id}`) as HTMLDivElement;

    quantityContainer.prepend(quantity);
  });
};

const setAllProductsRating = () => {
  const productRatingContainers = document.querySelectorAll('.product-cart__product-item-rating');

  productRatingContainers.forEach((container) => {
    const rating = +(<string>container.textContent);

    container.innerHTML = '';
    container.append(createRating(rating));
  });
};

const handleRemoveButtonsEvent = () => {
  const removeButtons = document.querySelectorAll('.product-cart__product-item-remove');

  [...removeButtons].forEach((button) => {
    button.addEventListener('click', (event: Event) => {
      const cartProductToDelete = (<HTMLButtonElement>event.target).closest(
        '.product-cart__product-item',
      ) as HTMLLIElement;
      const productId = +cartProductToDelete.id;
      const cartAsideProducts = [...document.querySelectorAll('.cart__item')] as HTMLLIElement[];
      const cartAsideProductToDelete = cartAsideProducts.find(
        (product) => +(<string>product.dataset.productId) === productId,
      ) as HTMLLIElement;

      cartProductToDelete.remove();
      cartAsideProductToDelete.remove();
      productsStorage.removeSome(productId);
      setTotalPrice('.header__total-amount', '.cart__total', '.product-cart__checkout-total');
      setProductsAmount('.cart__amount', '.header__cart-quantity', '.product-cart__checkout-amount');
      cartState.save();

      setCurrentPage();
      renderProductsList();
    });
  });
};

const setCartToEmpty = () => {
  const products = createCartProductItems(productsStorage.load()).length;

  if (!products) {
    const productsContainer = document.querySelector('.product-cart__info') as HTMLDivElement;
    const checkoutContainer = document.querySelector('.product-cart__checkout') as HTMLDivElement;

    productsContainer.innerHTML = createEmptyCartPageTemplate();
    productsContainer.style.flex = '1';
    checkoutContainer.remove();
  }
};

const watchCartIsEmpty = () => {
  setCartToEmpty();

  document.addEventListener('click', () => {
    if (location.pathname.includes('cart')) {
      try {
        setCartToEmpty();
      } catch (error) {
        return;
      }
    }
  });
};

export const renderCartPage = () => {
  if (location.pathname.includes('cart')) {
    const products = createCartProductItems(productsStorage.load());
    const mainContainer = document.querySelector('.main__app') as HTMLDivElement;

    mainContainer.innerHTML = createCartLayoutTemplate();

    appendProducts(products);
    setAllProductsRating();
    appendProductsQuantity();
    handleRemoveButtonsEvent();
    watchPromocode();

    setTotalPrice('.product-cart__checkout-total');
    setProductsAmount('.product-cart__checkout-amount');

    watchCartIsEmpty();
    watchCheckoutOpenEvents('.product-cart__checkout-open');

    setDefaultProductsLimit();
    setDefaultProductsPage();
    renderProductsList();
    watchPagination();
  }
};
