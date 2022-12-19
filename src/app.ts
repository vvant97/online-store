import './scss/style.scss';

import { changeSearchButton } from './ts/components/headerSearch/headerSearch';
import { showFilter, hideFilter } from './ts/components/filter/filter';
import { showCart, hideCart } from './ts/components/cart/cart';
import { productData } from './ts/components/productData';
import { renderCatalog } from './ts/components/renderCatalog/renderCatalog';
import { createProductCard } from './ts/components/product-card/product-card';

function init() {
  showCart();
  hideCart();
  changeSearchButton();
  if (document.body.classList.contains('home')) {
    renderCatalog(productData);
    showFilter();
    hideFilter();
  }
  if (document.body.classList.contains('product')) {
    showCart();
    hideCart();
    createProductCard();
  }
}

init();
