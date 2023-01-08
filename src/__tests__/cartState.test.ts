import CartState from '../ts/storage/CartState';

jest.mock('../ts/storage/CartState');
const CartClass = CartState as jest.Mock<CartState>;

beforeEach(() => {
  CartClass.mockClear();
});

describe('#Cart state', (): void => {
  const cart = new CartClass();

  jest.spyOn(cart, 'save');
  jest.spyOn(cart, 'remove');
  jest.spyOn(cart, 'setState');

  const savedProducts = `
    <li class="cart__item" data-product-id="10">
      <div class="cart__product-image" style="background-image: url('../../assets/img/34565233511-l.jpg')"></div>
      <div class="cart__product-wrapper">
        <a class="cart__product-title" href="/product-10">Apple IPad 10</a>
        <div class="cart__product-info">
          <div class="cart__product-price-wrapper">
            <p class="cart__product-quantity">1  x</p>
            <p class="cart__product-price">$745.36</p>
          </div>
          <i class="cart__product-delete bi bi-trash"></i>
        </div>
      </div>
    </li>
  `;

  const loadProducts = jest.spyOn(cart, 'load');
  loadProducts.mockImplementation(() => {
    return savedProducts;
  });

  it('test save cart products method', () => {
    expect(cart.save).toBeDefined();
    cart.save();
    cart.save();
    expect(cart.save).toBeCalledTimes(2);
    expect(typeof cart.save).toBe('function');
    expect(cart.save).toBeTruthy();
  });

  it('test remove cart products method', () => {
    expect(cart.remove).toBeDefined();
    cart.remove();
    expect(cart.remove).toBeCalledTimes(1);
    expect(typeof cart.remove).toBe('function');
    expect(cart.remove).toBeTruthy();
  });

  it('test load cart products method', () => {
    expect(cart.load).toBeDefined();
    cart.load();
    expect(cart.load).toHaveBeenCalledTimes(1);
    expect(typeof cart.load).toBe('function');
    expect(typeof cart.load()).toBe('string');
    expect(cart.load).toBeTruthy();
  });

  it('test load cart products value', () => {
    expect(cart.load()).toEqual(savedProducts);
  });

  it('test set cart state method', () => {
    expect(cart.setState).toBeDefined();
    cart.setState();
    expect(cart.setState).toHaveBeenCalledTimes(1);
    expect(loadProducts.mock.calls.length).toBe(3);
    expect(typeof cart.setState).toBe('function');
    expect(cart.setState).toBeTruthy();
  });
});
