import { AllSymbolsLengthErrorExpiration, SymbolsLengthErrorExpiration, ExpirationMonthError } from './errors';
import { appendErrorElement, ERRORS_DATA } from './error-template';

const changeIncorrectInput = (event: Event) => {
  const input = event.currentTarget as HTMLInputElement;
  const currentValue = input.value;
  const charactersAmount = currentValue.length;
  const numbers = [...currentValue].filter((symbol) => symbol !== '/' && symbol !== ' ');
  const lastCharacter = currentValue.slice(-1);

  if (charactersAmount === 3) {
    const [first, second, ...rest] = numbers;

    input.value = `${first}${second} / ${rest.join('')}`;
  }

  if (lastCharacter === ' ') {
    input.value = currentValue.slice(0, 2);
  }
};

export const isValidExpiration = () => {
  const input = document.querySelector('.order__expiration') as HTMLInputElement;
  const currentValue = input.value;
  const isValidCharactersAmount = currentValue.length === 7;
  const isValidNumbersAmount = [...currentValue].filter((symbol) => symbol.match('[0-9]')).length === 4;
  const isCorrectMonth = +[...currentValue].filter((symbol) => symbol.match('[0-9]')).slice(0, 2).join('') <= 12;

  if (isValidNumbersAmount && !isValidCharactersAmount) {
    const error = new AllSymbolsLengthErrorExpiration(ERRORS_DATA.AllSymbolsLengthErrorExpiration.message);
    const errorElement = document.querySelector(`#error${ERRORS_DATA.AllSymbolsLengthErrorExpiration.id}`) as HTMLElement;

    if (errorElement) {
      errorElement.remove();
    }

    input.classList.add('invalid');
    appendErrorElement('.order__card-additional', error.message, ERRORS_DATA.AllSymbolsLengthErrorExpiration.id);
  } else {
    const errorElement = document.querySelector(`#error${ERRORS_DATA.AllSymbolsLengthErrorExpiration.id}`) as HTMLElement;

    if (errorElement) {
      input.classList.remove('invalid');
      errorElement.remove();
    }
  }

  if (!isValidNumbersAmount) {
    const error = new SymbolsLengthErrorExpiration(ERRORS_DATA.SymbolsLengthErrorExpiration.message);
    const errorElement = document.querySelector(`#error${ERRORS_DATA.SymbolsLengthErrorExpiration.id}`) as HTMLElement;

    if (errorElement) {
      errorElement.remove();
    }

    input.classList.add('invalid');
    appendErrorElement('.order__card-additional', error.message, ERRORS_DATA.SymbolsLengthErrorExpiration.id);
  } else {
    const errorElement = document.querySelector(`#error${ERRORS_DATA.SymbolsLengthErrorExpiration.id}`) as HTMLElement;

    if (errorElement) {
      input.classList.remove('invalid');
      errorElement.remove();
    }
  }

  if (!isCorrectMonth) {
    const error = new ExpirationMonthError(ERRORS_DATA.ExpirationMonthError.message);
    const errorElement = document.querySelector(`#error${ERRORS_DATA.ExpirationMonthError.id}`) as HTMLElement;

    if (errorElement) {
      errorElement.remove();
    }

    input.classList.add('invalid');
    appendErrorElement('.order__card-additional', error.message, ERRORS_DATA.ExpirationMonthError.id);
  } else {
    const errorElement = document.querySelector(`#error${ERRORS_DATA.ExpirationMonthError.id}`) as HTMLElement;

    if (errorElement) {
      input.classList.remove('invalid');
      errorElement.remove();
    }
  }

  if (!isValidCharactersAmount || !isValidNumbersAmount || !isCorrectMonth) {
    return false;
  }

  return true;
};

export const watchExpiration = () => {
  const input = document.querySelector('.order__expiration') as HTMLInputElement;

  input.addEventListener('input', (event: Event) => {
    changeIncorrectInput(event);
  });
};
