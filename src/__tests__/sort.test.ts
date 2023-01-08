import { productData } from '../ts/components/productData';
import { sortingOptions } from '../ts/components/sort/sort';

describe('#Sort function', () => {
  let products = productData.slice(0, 5);

  beforeEach(() => {
    products = productData.slice(0, 5);
  });

  it('should sort products by rating, top to bottom', () => {
    const sorted = [products[2], products[0], products[1], products[4], products[3]];

    expect(sortingOptions('featured', products)).toEqual(sorted);
  });

  it('should sort products by title, A-Z', () => {
    const sorted = [products[3], products[1], products[2], products[0], products[4]];

    expect(sortingOptions('title-ascending', products)).toEqual(sorted);
  });

  it('should sort products by title, Z-A', () => {
    const sorted = [products[4], products[0], products[2], products[1], products[3]];

    expect(sortingOptions('title-descending', products)).toEqual(sorted);
  });

  it('should sort products by price, low to high', () => {
    const sorted = [products[4], products[1], products[2], products[3], products[0]];

    expect(sortingOptions('price-ascending', products)).toEqual(sorted);
  });

  it('should sort products by price, high to low', () => {
    const sorted = [products[0], products[3], products[2], products[1], products[4]];

    expect(sortingOptions('price-descending', products)).toEqual(sorted);
  });
});
