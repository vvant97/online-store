import { handleInputErrors, ERRORS_DATA } from './error-template';

export function isCorrectAddress() {
  const input = document.querySelector('.order__address') as HTMLInputElement;
  const currentValue = input.value;
  const [...args] = currentValue.split(' ').filter((symbol) => symbol !== '');
  const isCorrectAddress = args.every((arg) => arg.length >= 5) && args.length >= 3;

  if (isCorrectAddress) {
    input.value = args.join(' ');
  }

  handleInputErrors({
    inputElement: input,
    condition: !isCorrectAddress,
    containerSelector: '.order__address',
    errorId: ERRORS_DATA.TooShortAddressError.id,
    errorMessage: ERRORS_DATA.TooShortAddressError.message,
  });

  return isCorrectAddress;
}
