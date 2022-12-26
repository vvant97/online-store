import './scss/style.scss';

import { changeSearchButton } from './ts/components/headerSearch/headerSearch';
import { initCart } from './ts/components/cart/cart';
import { routing } from './ts/routing/routing';

function init() {
  changeSearchButton();
  routing();
  initCart();
}

init();
