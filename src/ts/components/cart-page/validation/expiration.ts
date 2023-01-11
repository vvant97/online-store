import { handleInputErrors, ERRORS_DATA } from './error-template';

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
  const currentMonth = +[...currentValue]
    .filter((symbol) => symbol.match('[0-9]'))
    .slice(0, 2)
    .join('');
  const isCorrectMonth = currentMonth <= 12 && currentMonth >= 1;

  handleInputErrors({
    inputElement: input,
    containerSelector: '.order__card-additional',
    condition: isValidNumbersAmount && !isValidCharactersAmount,
    errorMessage: ERRORS_DATA.AllSymbolsLengthErrorExpiration.message,
    errorId: ERRORS_DATA.AllSymbolsLengthErrorExpiration.id,
  });

  handleInputErrors({
    inputElement: input,
    containerSelector: '.order__card-additional',
    condition: !isValidNumbersAmount,
    errorMessage: ERRORS_DATA.SymbolsLengthErrorExpiration.message,
    errorId: ERRORS_DATA.SymbolsLengthErrorExpiration.id,
  });

  handleInputErrors({
    inputElement: input,
    containerSelector: '.order__card-additional',
    condition: !isCorrectMonth,
    errorMessage: ERRORS_DATA.ExpirationMonthError.message,
    errorId: ERRORS_DATA.ExpirationMonthError.id,
  });

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
