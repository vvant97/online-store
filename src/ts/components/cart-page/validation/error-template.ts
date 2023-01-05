export const ERRORS_DATA = {
  FirstSymbolError: {
    id: 0,
    message: 'Must starts with 4, 5 or 6',
  },
  SymbolsLengthError: {
    id: 1,
    message: 'Must include 16 numbers',
  },
};

export const appendErrorElement = (containerSelector: string, message: string, id: number) => {
  const parentElement = document.querySelector(containerSelector) as HTMLElement;
  const errorTemplate = `
    <p class="input-error" id="error${id}">${message}</p>
  `;

  parentElement.insertAdjacentHTML('afterend', errorTemplate);
};
