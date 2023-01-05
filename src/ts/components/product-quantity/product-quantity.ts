import { productsStorage, updateCart, setTotalPrice, setProductsAmount, cartState } from '../cart/cart';
import { productData } from '../productData';

const handleQuantityEvents = (event: Event) => {
  const target = (<HTMLElement>event.target).closest('.product-quantity__control') as HTMLElement;
  const product = <HTMLDivElement | HTMLLinkElement>(<HTMLDivElement | HTMLLinkElement>event.target).closest('.product-pick');
  const productId = +product.id;
  const quantity = document.querySelector(`.product-quantity__input-${productId}`) as HTMLInputElement;
  const stock = <number>productData.find((product) => product.id === productId)?.stock;

  if (target.classList.contains('product-quantity__plus')) {
    if (+quantity.value >= stock) {
      quantity.value = `${stock}`;
    } else {
      quantity.value = `${+quantity.value + 1}`;
    }
  } else {
    if (+quantity.value > 1) {
      quantity.value = `${+quantity.value - 1}`;
    } else {
      if (location.pathname.includes('cart')) {
        const cartProducts = [...document.querySelectorAll('.product-cart__product-item')] as HTMLLIElement[];
        const cartProductToDelete = cartProducts.find((product) => +<string>product.id === productId) as HTMLLIElement;

        if (cartProductToDelete) {
          cartProductToDelete.remove();
          productsStorage.removeSome(productId);
          setTotalPrice('.header__total-amount', '.cart__total', '.product-cart__checkout-total');
          setProductsAmount('.cart__amount', '.header__cart-quantity', '.product-cart__checkout-amount');
          cartState.save();
        }
      }
      
      const cartAsideProducts = [...document.querySelectorAll('.cart__item')] as HTMLLIElement[];
      const cartAsideProductToDelete = cartAsideProducts.find((product) => +<string>product.dataset.productId === productId) as HTMLLIElement;

      if (cartAsideProductToDelete) {
        cartAsideProductToDelete.remove();
        productsStorage.removeSome(productId);
        setTotalPrice('.header__total-amount', '.cart__total');
        setProductsAmount('.cart__amount', '.header__cart-quantity');
        cartState.save();
      }
      
      quantity.value = `1`;
    }
  }

  updateCart();
};

export const createProductQuantity = (stock: number, id: number) => {
  const container = document.createElement('div');
  const input = document.createElement('input');
  const controls = document.createElement('div');
  const plus = document.createElement('div');
  const minus = document.createElement('div');
  const plusIcon = document.createElement('i');
  const minusIcon = document.createElement('i');
  const isAvailable = stock !== 0 ? true : false;

  container.className = 'product-quantity';
  input.className = `product-quantity__input product-quantity__input-${id}`;
  input.type = 'number';
  input.value = productsStorage.loadSome(id) ? productsStorage.loadSome(id).quantity.toString() : '1';
  controls.className = 'product-quantity__controls';
  plus.className = 'product-quantity__plus product-quantity__control';
  minus.className = 'product-quantity__minus product-quantity__control';
  plusIcon.className = 'product-quantity__icon bi bi-plus-lg';
  minusIcon.className = 'product-quantity__icon bi bi-dash-lg';

  plus.append(plusIcon);
  minus.append(minusIcon);
  controls.append(plus, minus);
  container.append(input, controls);

  if (!isAvailable) {
    input.disabled = true;
    input.value = '0';
  } else {
    controls.addEventListener('click', handleQuantityEvents);
    input.addEventListener('change', (event: Event) => {
      const stock = <number>productData.find((product) => product.id === id)?.stock;
      const target = <HTMLInputElement>event.currentTarget;

      if (+target.value >= stock) {
        target.value = `${stock}`;
      } else if (+target.value < 1) {
        target.value = `1`;
      }

      updateCart();
    });
  }

  return container;
};

export const disableProductButtons = () => {
  const buttons = document.querySelector('.product-info__buttons-wrapper') as HTMLDivElement;

  buttons.remove();
};
