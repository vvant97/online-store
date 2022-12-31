import './scss/style.scss';

import { changeSearchButton } from './ts/components/headerSearch/headerSearch';
import { initCart } from './ts/components/cart/cart';
import { routing } from './ts/routing/routing';
import { renderCartPage } from './ts/components/cart-page/cart-page';

function init() {
  changeSearchButton();
  routing();
  initCart();
  renderCartPage();
}

init();
