import { ProductItem } from '../types';
import { createRating } from '../rating/rating';
import { createCartProductItemTemplate, createCartLayoutTemplate } from './cart-templates';
import { createBreadcrumbs } from '../breadcrumbs/breadcrumbs';
import { productsStorage, setTotalPrice, setProductsAmount, cartState } from '../cart/cart';
import { createProductQuantity } from '../product-quantity/product-quantity';

const createCartProductItems = (productsInCart: ProductItem[]) => {
  const products: HTMLLIElement[] = productsInCart.map((product) => {
    const item = document.createElement('li');
    const template = createCartProductItemTemplate(product);

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
      const cartProductToDelete = (<HTMLButtonElement>event.target).closest('.product-cart__product-item') as HTMLLIElement;
      const productId = +cartProductToDelete.id;
      const cartAsideProducts = [...document.querySelectorAll('.cart__item')] as HTMLLIElement[];
      const cartAsideProductToDelete = cartAsideProducts.find((product) => +<string>product.dataset.productId === productId) as HTMLLIElement;

      cartProductToDelete.remove();
      cartAsideProductToDelete.remove();
      productsStorage.removeSome(productId);
      setTotalPrice('.header__total-amount', '.cart__total');
      setProductsAmount('.cart__amount', '.header__cart-quantity');
      cartState.save();
    });
  });
};

export const renderCartPage = () => {
  const mainContainer = document.querySelector('.main__app') as HTMLDivElement;
  const breadcrumbs = createBreadcrumbs('Your Shopping Cart');
  const products = createCartProductItems(productsStorage.load());

  mainContainer.innerHTML = createCartLayoutTemplate();
  mainContainer.prepend(breadcrumbs);
  appendProducts(products);
  setAllProductsRating();
  appendProductsQuantity();
  handleRemoveButtonsEvent();
};
