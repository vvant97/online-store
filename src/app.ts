import './scss/style.scss';

import { renderSearch } from './ts/components/headerSearch/headerSearch';
import { initCart } from './ts/components/cart/cart';
import { routing } from './ts/routing/routing';
import { renderCartPage } from './ts/components/cart-page/cart-page';
import { watchPromocodeReaccounting } from './ts/components/promocode/promocode';
import { watchCheckoutCloseEvents } from './ts/components/cart-page/checkout';

function init() {
  renderSearch();
  routing();
  initCart();
  renderCartPage();
  watchPromocodeReaccounting();
  watchCheckoutCloseEvents();
}

init();
