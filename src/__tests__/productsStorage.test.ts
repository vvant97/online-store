import ProductsStorage from '../ts/storage/ProductsStorage';

jest.mock('../ts/storage/ProductsStorage');
const StorageClass = ProductsStorage as jest.Mock<ProductsStorage>;

beforeEach(() => {
  StorageClass.mockClear();
});

describe('#Products Storage', (): void => {
  const products = new StorageClass();

  jest.spyOn(products, 'save');
  jest.spyOn(products, 'remove');
  jest.spyOn(products, 'removeSome');

  const savedProducts = [
    {
      image: '../../assets/img/97875233511-l.jpg',
      title: 'Apple MacBook Pro M2',
      id: 7,
      price: 2447.5,
      discount: 1223.75,
      quantity: 2,
      priceByOne: 1223.75,
      brand: 'Apple',
      category: 'laptops',
      rating: 4.57,
      oldPrice: 1375,
      discountPercent: 11,
      stock: 83,
    },
    {
      image: '../../assets/img/34565233511-l.jpg',
      title: 'Apple IPad 10',
      id: 10,
      price: 745.36,
      discount: 745.36,
      quantity: 1,
      priceByOne: 745.36,
      brand: 'Apple',
      category: 'tablet',
      rating: 4.54,
      oldPrice: 847,
      discountPercent: 11,
      stock: 96,
    },
  ];

  const loadProducts = jest.spyOn(products, 'load');
  loadProducts.mockImplementation(() => {
    return savedProducts;
  });

  const loadFilterProducts = jest.spyOn(products, 'loadSome');
  loadFilterProducts.mockImplementation(() => savedProducts[1]);

  it('test save products method', () => {
    expect(products.save).toBeDefined();
    products.save(savedProducts[1]);
    products.save(savedProducts[2]);
    expect(products.save).toBeCalledTimes(2);
    expect(typeof products.save).toBe('function');
    expect(products.save).toBeTruthy();
  });

  it('test remove products method', () => {
    expect(products.remove).toBeDefined();
    products.remove();
    expect(products.remove).toBeCalledTimes(1);
    expect(typeof products.remove).toBe('function');
    expect(products.remove).toBeTruthy();
  });

  it('test remove filtered products method', () => {
    expect(products.removeSome).toBeDefined();
    products.removeSome(10);
    expect(products.removeSome).toBeCalledTimes(1);
    expect(typeof products.removeSome).toBe('function');
    expect(products.removeSome).toBeTruthy();
  });

  it('test load storage products method', () => {
    expect(products.load).toBeDefined();
    products.load();
    expect(products.load).toHaveBeenCalledTimes(1);
    expect(typeof products.load).toBe('function');
    expect(products.load).toBeTruthy();
  });

  it('test load storage products value', () => {
    expect(products.load()).toEqual(savedProducts);
  });

  it('test load filtered products method', () => {
    expect(products.loadSome).toBeDefined();
    products.loadSome(10);
    expect(products.loadSome).toHaveBeenCalledTimes(1);
    expect(loadProducts.mock.calls.length).toBe(2);
    expect(typeof products.loadSome).toBe('function');
    expect(products.loadSome).toBeTruthy();
  });

  it('test load filtered products value', () => {
    expect(products.loadSome(10)).toEqual(savedProducts[1]);
  });
});
