import { handleInputErrors, ERRORS_DATA } from './error-template';

export function isCorrectEmailAddress() {
  const input = document.querySelector('.order__email') as HTMLInputElement;

  handleInputErrors({
    inputElement: input,
    containerSelector: '.order__email',
    condition: input.validity.typeMismatch || !input.value.length,
    errorMessage: ERRORS_DATA.InvalidEmailAddressError.message,
    errorId: ERRORS_DATA.InvalidEmailAddressError.id,
  });

  if (input.validity.valid && input.value.length) {
    return true;
  }

  return false;
}
