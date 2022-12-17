import './scss/style.scss';
import { changeSearchButton } from './ts/components/headerSearch/headerSearch';

import { showFilter, hideFilter } from './ts/components/filter/filter';

import { showCart, hideCart } from './ts/components/cart/cart';
import { productData } from './ts/components/productData';
import { renderCatalog } from './ts/components/renderCatalog/renderCatalog';
import { createProductPage } from './ts/components/createProductPage/createProductPage';

function init() {
  if (document.body.classList.contains('home')) {
    renderCatalog(productData);
    showFilter();
    hideFilter();
    showCart();
    hideCart();
  }
  if (document.body.classList.contains('product')) {
    createProductPage();
  }
  changeSearchButton();
}

init();
