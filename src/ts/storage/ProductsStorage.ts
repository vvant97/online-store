import Storage from './Storage';
import { ProductItem } from '../components/types';

class ProductsStorage extends Storage {
  constructor(key: string) {
    super(key);
  }

  save(data: ProductItem) {
    const products = this.load();

    products.push(data);
    localStorage.setItem(this._key, JSON.stringify(products));
  }

  load(): ProductItem[] {
    return JSON.parse(<string>localStorage.getItem(this._key)) || [];
  }

  removeSome(id: number) {
    const updatedProducts = this.load().filter((product) => product.id !== id);

    localStorage.setItem(this._key, JSON.stringify(updatedProducts));
  }

  loadSome(id: number): ProductItem {
    const products = this.load();

    return products.find((product) => product.id === id) as ProductItem;
  }
}

export default ProductsStorage;
