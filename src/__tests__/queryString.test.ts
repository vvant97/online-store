import { checkParams, encodeQueryString } from '../ts/routing/queryString';

describe('#Encode query string', () => {
  beforeEach(() => {
    window.history.pushState({}, location.pathname, `${location.pathname}`);
  });

  it('should encode correct search params for a single value passed', () => {
    const brandString = 'brand=apple';

    expect(encodeQueryString('brand', ['apple'])).toEqual(brandString);
  });

  it('should encode correct search params for multiple values passed', () => {
    const categoryString = 'category=smartphone%E2%86%95laptop';

    expect(encodeQueryString('category', ['smartphone', 'laptop'])).toEqual(categoryString);
  });

  it('should encode an empty string for no values passed', () => {
    expect(encodeQueryString('search', [''])).toEqual('search=');
    expect(encodeQueryString('search', [''])).toBeTruthy();
  });
});

describe('#Decode query string', () => {
  it('should return an object with params', () => {
    expect(checkParams()).toBeTruthy();
    expect(typeof checkParams()).toBe('object');
  });
});
