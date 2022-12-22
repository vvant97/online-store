const handleQuantityEvents = (event: Event) => {
  const target = (<HTMLElement>event.target).closest('.product-quantity__control') as HTMLElement;
  const quantity = document.querySelector('.product-quantity__input') as HTMLInputElement;

  if (target.classList.contains('product-quantity__plus')) {
    quantity.value = `${+quantity.value + 1}`;
  } else {
    if (+quantity.value > 1) {
      quantity.value = `${+quantity.value - 1}`;
    } else {
      throw new Error('The number must be at least 1');
    }
  }
};

export const createProductQuantity = (stock: number) => {
  const container = document.createElement('div');
  const input = document.createElement('input');
  const controls = document.createElement('div');
  const plus = document.createElement('div');
  const minus = document.createElement('div');
  const plusIcon = document.createElement('i');
  const minusIcon = document.createElement('i');
  const isAvailable = stock !== 0 ? true : false;

  container.className = 'product-quantity';
  input.className = 'product-quantity__input';
  input.type = 'number';
  input.min = '1';
  input.value = '1';
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
    input.min = '0';
    input.value = '0';
  } else {
    controls.addEventListener('click', handleQuantityEvents);
  }

  return container;
};

export const disableProductButtons = () => {
  const buttons = document.querySelector('.product-info__buttons-wrapper') as HTMLDivElement;

  buttons.remove();
};
