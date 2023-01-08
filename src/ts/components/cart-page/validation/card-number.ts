import { PAYMENT_SYSTEM_ICONS } from '../cart-templates';
import { handleInputErrors, ERRORS_DATA } from './error-template';

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
  const numbers = currentValue.split('').filter((symbol) => symbol !== ' ');

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
  return input.value.split('').every((symbol) => +symbol || symbol === '0' || symbol === ' ');
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

export const isValidCardNumber = () => {
  const input = document.querySelector('.order__card') as HTMLInputElement;
  const currentValue = input.value;
  const isCorrectCharactersAmount = currentValue.split('').filter((symbol) => symbol !== ' ').length === 16;
  const isCorrectFirstSymbol = currentValue.startsWith('4') || currentValue.startsWith('5') || currentValue.startsWith('6');

  handleInputErrors({
    inputElement: input,
    containerSelector: '.order__card-number',
    condition: !isCorrectFirstSymbol,
    errorMessage: ERRORS_DATA.FirstSymbolError.message,
    errorId: ERRORS_DATA.FirstSymbolError.id,
  });

  handleInputErrors({
    inputElement: input,
    containerSelector: '.order__card-number',
    condition: !isCorrectCharactersAmount,
    errorMessage: ERRORS_DATA.SymbolsLengthError.message,
    errorId: ERRORS_DATA.SymbolsLengthError.id,
  });

  if (!isCorrectFirstSymbol || !isCorrectCharactersAmount) {
    return false;
  }

  return true;
};

export const watchCardNumber = () => {
  const input = document.querySelector('.order__card') as HTMLInputElement;

  input.addEventListener('input', (event: Event) => {
    setMatchingPaymentSystemIcon(event);
    changeIncorrectInput(event);
  });
};
