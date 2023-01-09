import { handleInputErrors, ERRORS_DATA } from './error-template';

function changeIncorrectInput(event: Event) {
  const input = event.currentTarget as HTMLInputElement;
  const currentValue = input.value;
  const filteredValues = [...currentValue].filter((symbol) => symbol.match('[0-9]')).join('');

  input.value = `+${filteredValues}`;
}

function isValidPhoneNumber() {
  const input = document.querySelector('.order__phone') as HTMLInputElement;
  const currentValue = input.value;
  const isValidPhone = currentValue.length >= 10;

  handleInputErrors({
    inputElement: input,
    containerSelector: '.order__phone',
    condition: !isValidPhone,
    errorMessage: ERRORS_DATA.InvalidPhoneNumberError.message,
    errorId: ERRORS_DATA.InvalidPhoneNumberError.id,
  });

  return isValidPhone;
}

function watchPhoneNumber() {
  const input = document.querySelector('.order__phone') as HTMLInputElement;

  input.addEventListener('input', (event: Event) => {
    changeIncorrectInput(event);
  });
}

export { isValidPhoneNumber, watchPhoneNumber };
