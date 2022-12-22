import './scss/style.scss';

import { changeSearchButton } from './ts/components/headerSearch/headerSearch';
import { showCart, hideCart } from './ts/components/cart/cart';
import { routing } from './ts/routing/routing';

function init() {
  showCart();
  hideCart();
  changeSearchButton();
  routing();
}

init();
