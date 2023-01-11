import { handleInputErrors, ERRORS_DATA } from './error-template';

const changeIncorrectInput = (event: Event) => {
  const input = event.currentTarget as HTMLInputElement;
  const currentValue = input.value;
  const numbers = currentValue
    .split('')
    .filter((symbol) => (symbol !== ' ' && +symbol) || symbol === '0')
    .join('');

  input.value = numbers;
};

export const isValidCvv = () => {
  const input = document.querySelector('.order__cvv') as HTMLInputElement;
  const currentValue = input.value;
  const isValidCharactersAmount = currentValue.length === 3;

  handleInputErrors({
    inputElement: input,
    containerSelector: '.order__card-additional',
    condition: !isValidCharactersAmount,
    errorMessage: ERRORS_DATA.SymbolsLengthErrorCvv.message,
    errorId: ERRORS_DATA.SymbolsLengthErrorCvv.id,
  });

  return isValidCharactersAmount;
};

export const watchCvv = () => {
  const input = document.querySelector('.order__cvv') as HTMLInputElement;

  input.addEventListener('input', (event: Event) => {
    changeIncorrectInput(event);
  });
};
