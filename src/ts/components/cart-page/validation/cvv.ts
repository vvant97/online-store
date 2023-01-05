import { SymbolsLengthErrorCvv } from './errors';
import { appendErrorElement, ERRORS_DATA } from './error-template';

const changeIncorrectInput = (event: Event) => {
  const input = event.currentTarget as HTMLInputElement;
  const currentValue = input.value;
  const numbers = currentValue.split('').filter((symbol) => symbol !== ' ' && +symbol || symbol === '0').join('');

  input.value = numbers;
};

export const isValidCvv = () => {
  const input = document.querySelector('.order__cvv') as HTMLInputElement;
  const currentValue = input.value;
  const isValidCharactersAmount = currentValue.length === 3;

  if (!isValidCharactersAmount) {
    const error = new SymbolsLengthErrorCvv(ERRORS_DATA.SymbolsLengthErrorCvv.message);
    const errorElement = document.querySelector(`#error${ERRORS_DATA.SymbolsLengthErrorCvv.id}`) as HTMLElement;

    if (errorElement) {
      errorElement.remove();
    }

    input.classList.add('invalid');
    appendErrorElement('.order__card-additional', error.message, ERRORS_DATA.SymbolsLengthErrorCvv.id);
  } else {
    const errorElement = document.querySelector(`#error${ERRORS_DATA.SymbolsLengthErrorCvv.id}`) as HTMLElement;

    input.classList.remove('invalid');
    errorElement.remove();
  }

  return isValidCharactersAmount;
};

export const watchCvv = () => {
  const input = document.querySelector('.order__cvv') as HTMLInputElement;

  input.addEventListener('input', (event: Event) => {
    changeIncorrectInput(event);
  });
};
