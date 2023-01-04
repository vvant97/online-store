import { productsStorage } from '../cart/cart';

type Promocode = { [key: string]: number };

const PROMOCODES_DATA: Promocode = {
  S10: 10,
  M20: 20,
  L30: 30,
};

const showMatchingPromocode = (event: Event) => {
  const promocodes = Array.from(document.querySelectorAll('.product-cart__checkout-promo-item')) as HTMLLIElement[];
  const currentValue = (<HTMLInputElement>event.currentTarget).value;

  promocodes.forEach((promocode) => {
    if (currentValue === '') {
      promocode.classList.remove('active');

      return;
    }

    const promocodeValue = <string>promocode.dataset.code;

    if (promocodeValue in PROMOCODES_DATA) {
      if (promocodeValue.includes(currentValue)) {
        promocode.classList.add('active');
      } else {
        promocode.classList.remove('active');
      }
    }
  });
};

const createPromocodeItem = (promocode: string) => {
  const promocodeContainer = document.createElement('div');
  const codeContainer = document.createElement('span');
  const icon = document.createElement('i');
  const code = promocode;
  const discount = PROMOCODES_DATA[promocode];

  promocodeContainer.className = 'product-cart__checkout-promo-active-code';
  promocodeContainer.dataset.code = `${code}`;
  promocodeContainer.dataset.discount = `${discount}`;
  codeContainer.textContent = `${code} -${discount}%`;
  icon.className = 'product-cart__checkout-promo-remove bi bi-x-lg';
  promocodeContainer.append(codeContainer, icon);

  return promocodeContainer;
};

const appendPromocode = (event: Event) => {
  const promocode = '.product-cart__checkout-promo-item';
  const target = (<HTMLElement>event.target).closest(promocode) as HTMLLIElement;
  const promocodesContainer = document.querySelector('.product-cart__checkout-promo') as HTMLDivElement;
  const promocodeValue = <string>target.dataset.code;
  const promocodeToAdd = createPromocodeItem(promocodeValue);

  promocodesContainer.append(promocodeToAdd);
  target.classList.remove('active');

  delete PROMOCODES_DATA[promocodeValue];
};

const removePromocode = (event: Event) => {
  const target = event.target as HTMLElement;
  const activePromocodeItem = '.product-cart__checkout-promo-active-code';
  const promocodeItemToRemove = target.closest(activePromocodeItem) as HTMLDivElement;
  const code = <string>promocodeItemToRemove.dataset.code;
  const discount = +<string>promocodeItemToRemove.dataset.discount;

  promocodeItemToRemove.remove();
  PROMOCODES_DATA[code] = discount;
};

const reaccountTotalCheckoutPrice = () => {
  const currentTotalPriceContainer = document.querySelector('.product-cart__checkout-price') as HTMLParagraphElement;
  const currentTotalPrice = document.querySelector('.product-cart__checkout-total') as HTMLSpanElement;
  const activePromocodes = Array.from(document.querySelectorAll('.product-cart__checkout-promo-active-code')) as HTMLDivElement[];
  const fullPrice = productsStorage.load().reduce((sum, product) => sum += product.price, 0);
  const discount = activePromocodes.reduce((sum, promocode) => sum += +<string>promocode.dataset.discount, 0) / 100;

  let newPriceContainer = document.querySelector('.product-cart__checkout-new-price') as HTMLParagraphElement;

  if (activePromocodes.length) {
    const newPrice = fullPrice - (fullPrice * discount);

    if (!newPriceContainer) {
      newPriceContainer = document.createElement('p');
      newPriceContainer.className = 'product-cart__checkout-new-price';
      newPriceContainer.textContent = `$${newPrice.toFixed(2)}`;
      currentTotalPrice.classList.add('old');
      currentTotalPriceContainer.after(newPriceContainer);
    } else {
      newPriceContainer.textContent = `$${newPrice.toFixed(2)}`;
    }
  } else {
    currentTotalPrice.classList.remove('old');
    currentTotalPrice.textContent = `$${fullPrice.toFixed(2)}`;
    newPriceContainer.remove();
  }
};

export const watchPromocode = () => {
  const promocodeInput = document.querySelector('.product-cart__checkout-promo-input') as HTMLInputElement;

  promocodeInput.addEventListener('input', (event: Event) => {
    showMatchingPromocode(event);
  });
};

export const watchPromocodeReaccounting = () => {
  document.addEventListener('click', (event: Event) => {
    const promocodeInput = document.querySelector('.product-cart__checkout-promo-input') as HTMLInputElement;
    const promocodeItem = '.product-cart__checkout-promo-item';
    const removeButton = '.product-cart__checkout-promo-remove';
    const target = event.target as HTMLElement;
  
    if (target.closest(promocodeItem)) {
      appendPromocode(event);
      promocodeInput.value = '';
      reaccountTotalCheckoutPrice();
    }
  
    if (target.closest(removeButton)) {
      removePromocode(event);
      reaccountTotalCheckoutPrice();
    }
  
    if (target.closest('.product-quantity__control') || target.closest('.product-cart__product-item-remove')) {
      try {
        reaccountTotalCheckoutPrice();
      } catch (error) {
        return;
      }
    }

    if (!productsStorage.load().length) {
      PROMOCODES_DATA['S10'] = 10;
      PROMOCODES_DATA['M20'] = 20;
      PROMOCODES_DATA['L30'] = 30;
    }
  });
};
