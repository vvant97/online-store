import { ProductItem } from "../types";
import { createRating } from "../rating/rating";
import { createCartProductItemTemplate, createCartLayoutTemplate } from './cart-templates';
import { createBreadcrumbs } from '../breadcrumbs/breadcrumbs';
import { productsStorage } from '../cart/cart';

const createCartProductItems = (productsInCart: ProductItem[]) => {
  const products: HTMLLIElement[] = productsInCart.map((product) => {
    const item = document.createElement('li');
    const template = createCartProductItemTemplate(product);
    
    item.className = 'product-cart__product-item';
    item.innerHTML = template;

    return item;
  });

  return products;
};

const setAllProductsRating = () => {
  const productRatingContainers = document.querySelectorAll('.product-cart__product-item-rating');

  productRatingContainers.forEach((container) => {
    const rating = +<string>container.textContent;

    container.innerHTML = '';
    container.append(createRating(rating));
  });
};

export const renderCartPage = () => {
  const mainContainer = document.querySelector('.main__app') as HTMLDivElement;
  const breadcrumbs = createBreadcrumbs('Your Shopping Cart');
  const products = createCartProductItems(productsStorage.load());
  
  mainContainer.innerHTML = createCartLayoutTemplate();
  mainContainer.prepend(breadcrumbs);

  const productsList = document.querySelector('.product-cart__product-list') as HTMLUListElement;

  productsList.append(...products);
  setAllProductsRating();
};
