import './scss/style.scss';

import { renderSearch } from './ts/components/headerSearch/headerSearch';
import { initCart } from './ts/components/cart/cart';
import { routing } from './ts/routing/routing';

function init() {
  renderSearch();
  routing();
  initCart();
}

init();
