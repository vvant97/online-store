import './scss/style.scss';
import { changeSearchButton } from './ts/components/headerSearch/headerSearch';

import { showFilter, hideFilter } from './ts/components/filter/filter';

import { showCart, hideCart } from './ts/components/cart/cart';
import { productData } from './ts/components/productData';
import { renderCatalog } from './ts/components/renderCatalog/renderCatalog';

async function init() {
  renderCatalog(productData);
  changeSearchButton();
  showFilter();
  hideFilter();
  showCart();
  hideCart();
}

init();
