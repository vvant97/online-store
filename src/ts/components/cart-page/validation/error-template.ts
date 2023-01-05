export const ERRORS_DATA = {
  FirstSymbolError: {
    id: 0,
    message: 'Must starts with 4, 5 or 6',
  },
  SymbolsLengthError: {
    id: 1,
    message: 'Must include 16 numbers',
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
  }
};

export const appendErrorElement = (containerSelector: string, message: string, id: number) => {
  const parentElement = document.querySelector(containerSelector) as HTMLElement;
  const errorTemplate = `
    <p class="input-error" id="error${id}">${message}</p>
  `;

  parentElement.insertAdjacentHTML('afterend', errorTemplate);
};
