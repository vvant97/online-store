import { filterProducts } from '../ts/components/filter/filter';
import { productData } from '../ts/components/productData';
import { filterOptions } from '../ts/components/types';

let products = productData.slice();

describe('#Filter function', () => {
  beforeEach(() => {
    products = productData.slice();
  });

  it('should filter products according to the category', () => {
    const options: filterOptions = {
      categories: ['tablet'],
      brands: [],
      colors: [],
      prices: [],
      stock: [],
      sorting: 'featured',
      search: '',
    };

    expect(filterProducts(products, options)).toEqual([products[21], products[9], products[13], products[20]]);
  });

  it('should filter products according to the brand', () => {
    const options: filterOptions = {
      categories: [],
      brands: ['huawei'],
      colors: [],
      prices: [],
      stock: [],
      sorting: 'featured',
      search: '',
    };

    expect(filterProducts(products, options)).toEqual([products[13], products[5], products[31]]);
  });

  it('should filter products according to the color', () => {
    const options: filterOptions = {
      categories: [],
      brands: [],
      colors: ['green'],
      prices: [],
      stock: [],
      sorting: 'featured',
      search: '',
    };

    expect(filterProducts(products, options)).toEqual([products[39], products[5]]);
  });

  it('should filter products according to the price', () => {
    const options: filterOptions = {
      categories: [],
      brands: [],
      colors: [],
      prices: ['1111.50', '1354.50'],
      stock: [],
      sorting: 'featured',
      search: '',
    };

    expect(filterProducts(products, options)).toEqual([products[19], products[6]]);
  });

  it('should filter products according to the stock', () => {
    const options: filterOptions = {
      categories: [],
      brands: [],
      colors: [],
      prices: [],
      stock: ['89', '96'],
      sorting: 'featured',
      search: '',
    };

    expect(filterProducts(products, options)).toEqual([products[1], products[9], products[10]]);
  });

  it('should filter products according to the search', () => {
    const options: filterOptions = {
      categories: [],
      brands: [],
      colors: [],
      prices: [],
      stock: [],
      sorting: 'featured',
      search: 'macb',
    };

    expect(filterProducts(products, options)).toEqual([products[18], products[6]]);
  });

  it('should filter products according to the multiple selected options', () => {
    const options: filterOptions = {
      categories: ['smartphone'],
      brands: ['apple'],
      colors: ['white'],
      prices: ['220', '250'],
      stock: [],
      sorting: 'featured',
      search: '',
    };

    expect(filterProducts(products, options)).toEqual([products[1]]);
  });
});
