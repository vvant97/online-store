import { handleInputErrors, ERRORS_DATA } from './error-template';

function changeIncorrectInput(firstName: string, lastName: string) {
  const formatedFullName = [firstName, lastName]
    .map((string) => {
      return [...string]
        .map((symbol, i) => (i === 0 ? symbol.toUpperCase() : symbol.toLowerCase()))
        .join('');
    })
    .join(' ');

  return formatedFullName;
}

export function isCorrectFullName() {
  const input = document.querySelector('.order__name') as HTMLInputElement;
  const currentValue = input.value.trim();
  const spacesAmount = [...currentValue].filter((symbol) => symbol === ' ').length;
  const [firstName, lastName] = currentValue.split(`${' '.repeat(spacesAmount)}`);
  const isCorrectFullName = firstName?.length >= 3 && lastName?.length >= 3;

  if (isCorrectFullName) {
    input.value = changeIncorrectInput(firstName, lastName);
  }

  handleInputErrors({
    inputElement: input,
    condition: !isCorrectFullName,
    containerSelector: '.order__name',
    errorId: ERRORS_DATA.TooShortFullNameError.id,
    errorMessage: ERRORS_DATA.TooShortFullNameError.message,
  });

  return isCorrectFullName;
}
