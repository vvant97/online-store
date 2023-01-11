import Storage from './Storage';

class CartState extends Storage {
  readonly _selector: string;

  constructor(key: string, selector: string) {
    super(key);
    this._selector = selector;
  }

  save() {
    const products = (<HTMLUListElement>document.querySelector(this._selector)).innerHTML;

    localStorage.setItem(this._key, products);
  }

  load(): string {
    return <string>localStorage.getItem(this._key) || '';
  }

  setState() {
    const list = <HTMLUListElement>document.querySelector(this._selector);
    const products = this.load();

    list.innerHTML = products;
  }
}

export default CartState;
