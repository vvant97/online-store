interface ErrorHandlingOptions {
  inputElement: HTMLInputElement;
  containerSelector: string;
  condition: boolean;
  errorMessage: string;
  errorId: number;
}

export const ERRORS_DATA = {
  FirstSymbolError: {
    id: 0,
    message: 'CCN must start with 4, 5 or 6',
  },
  SymbolsLengthError: {
    id: 1,
    message: 'CCN must include 16 numbers',
  },
  SymbolsLengthErrorCvv: {
    id: 2,
    message: 'CVV must include 3 numbers',
  },
  SymbolsLengthErrorExpiration: {
    id: 3,
    message: 'Exp. date must include MM and YY',
  },
  AllSymbolsLengthErrorExpiration: {
    id: 4,
    message: 'Invalid expiration date',
  },
  ExpirationMonthError: {
    id: 5,
    message: 'Month must be 01-12',
  },
  TooShortFullNameError: {
    id: 6,
    message: 'Full name is too short',
  },
  TooShortAddressError: {
    id: 7,
    message: 'Address is too short',
  },
  InvalidEmailAddressError: {
    id: 8,
    message: 'Invalid email address',
  },
  InvalidPhoneNumberError: {
    id: 9,
    message: 'Invalid phone number',
  }
};

export const appendErrorElement = (containerSelector: string, message: string, id: number) => {
  const parentElement = document.querySelector(containerSelector) as HTMLElement;
  const errorTemplate = `
    <p class="input-error" id="error-${id}">${message}</p>
  `;

  parentElement.insertAdjacentHTML('afterend', errorTemplate);
};

export function handleInputErrors(options: ErrorHandlingOptions) {
  const { condition, inputElement, errorId, errorMessage, containerSelector } = options;

  if (condition) {
    const errorElement = document.querySelector(`#error-${errorId}`) as HTMLElement;

    if (errorElement) {
      errorElement.remove();
    }

    inputElement.classList.add('invalid');
    appendErrorElement(containerSelector, errorMessage, errorId);
  } else {
    const errorElement = document.querySelector(`#error-${errorId}`) as HTMLElement;

    if (errorElement) {
      inputElement.classList.remove('invalid');
      errorElement.remove();
    }
  }
}
