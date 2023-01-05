import { PAYMENT_SYSTEM_ICONS } from "../cart-templates";

const setMatchingPaymentSystemIcon = (event: Event) => {
  const input = event.currentTarget as HTMLInputElement;
  const currentValue = input.value;
  const paymentSystemIconContainer = document.querySelector('.order__icon-container') as HTMLElement;

  if (currentValue.startsWith('4')) {
    paymentSystemIconContainer.innerHTML = PAYMENT_SYSTEM_ICONS.VISA;
  } else if (currentValue.startsWith('5')) {
    paymentSystemIconContainer.innerHTML = PAYMENT_SYSTEM_ICONS.MASTERCARD;
  } else if (currentValue.startsWith('6')) {
    paymentSystemIconContainer.innerHTML = PAYMENT_SYSTEM_ICONS.AMERICAN_EXPRESS;
  } else {
    paymentSystemIconContainer.innerHTML = PAYMENT_SYSTEM_ICONS.DEFAULT;
  }
};

const setCardNumberMask = (event: Event) => {
  const input = event.currentTarget as HTMLInputElement;
  const currentValue = input.value;
  const numbers = currentValue.split('').filter((symbol) => +symbol.toString());
  
  let newInputValue = '';

  numbers.forEach((number, index) => {
    if (index % 4 === 0 && index !== 0) {
      newInputValue += ` ${number}`;
    } else {
      newInputValue += number;
    }    
  });
  
  input.value = newInputValue;
};

const isInputCorrect = (input: HTMLInputElement) => {
  return input.value
    .split('')
    .every((symbol) => +symbol || symbol === '0' || symbol === ' ');
};

const changeIncorrectInput = (event: Event) => {
  const input = event.currentTarget as HTMLInputElement;
  const currentValue = input.value;
  const charactersAmount = currentValue.length;
  const isCorrect = isInputCorrect(input);

  if (!isCorrect || charactersAmount > 19) {
    input.value = currentValue.slice(0, -1);
  }

  setCardNumberMask(event);
};

const isValidCardNumber = (event: Event) => {
  const input = event.currentTarget as HTMLInputElement;
  const currentValue = input.value;
  const charactersAmount = currentValue.length;

  if (
    !currentValue.startsWith('4') &&
    !currentValue.startsWith('5') &&
    !currentValue.startsWith('6') &&
    charactersAmount
  ) {
    throw new Error('Your credit card must starts with 4, 5 or 6');
  }
};

export const validateCardNumber = () => {
  const input = document.querySelector('.order__card') as HTMLInputElement;

  input.addEventListener('input', (event: Event) => {
    try {
      setMatchingPaymentSystemIcon(event);
      changeIncorrectInput(event);
      isValidCardNumber(event);
    } catch (error) {
      console.log(error);
    }
  });
};
