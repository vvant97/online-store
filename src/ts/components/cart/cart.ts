import { showOverlay, hideOverlay } from '../bg-overlay/bg-overlay';

export const showCart = () => {
  const cart = document.querySelector('.cart') as HTMLDivElement;
  const cartButton = document.querySelector('.cart-open') as HTMLButtonElement;

  cartButton.addEventListener('click', () => {
    cart.classList.add('active');

    showOverlay();
  });
};

export const hideCart = () => {
  const cart = document.querySelector('.cart') as HTMLDivElement;

  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.className.includes('cart__close') || target.className.includes('bg-overlay')) {
      cart.classList.remove('active');

      hideOverlay();
    }
  });
};
