import { ERRORS_DATA } from './error-template';

export class FirstSymbolError extends Error {
  constructor(message: string) {
    super(message);
    this.message = ERRORS_DATA.FirstSymbolError.message;
  }
}

export class SymbolsLengthError extends Error {
  constructor(message: string) {
    super(message);
    this.message = ERRORS_DATA.SymbolsLengthError.message;
  }
}

export class SymbolsLengthErrorCvv extends SymbolsLengthError {
  constructor(message: string) {
    super(message);
    this.message = ERRORS_DATA.SymbolsLengthErrorCvv.message;
  }
}

export class SymbolsLengthErrorExpiration extends SymbolsLengthError {
  constructor(message: string) {
    super(message);
    this.message = ERRORS_DATA.SymbolsLengthErrorExpiration.message;
  }
}

export class AllSymbolsLengthErrorExpiration extends SymbolsLengthErrorExpiration {
  constructor(message: string) {
    super(message);
    this.message = ERRORS_DATA.AllSymbolsLengthErrorExpiration.message;
  }
}

export class ExpirationMonthError extends Error {
  constructor(message: string) {
    super(message);
    this.message = ERRORS_DATA.ExpirationMonthError.message;
  }
}
