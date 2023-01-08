import { productData } from '../ts/components/productData';
import { createProductGridCard, createProductListCard } from '../ts/components/renderCatalog/renderCatalog';

describe('#Create catalog grid product card', () => {
  const product = productData[0];

  it('should work correctly', () => {
    expect(createProductGridCard(product)).toBeDefined();
    expect(typeof createProductGridCard).toBe('function');
    expect(createProductGridCard(product)).toBeTruthy();
  });

  it('should return HTMLLIElement', () => {
    expect(createProductGridCard(product).toString()).toBe('[object HTMLLIElement]');
  });
});

describe('#Create catalog list product card', () => {
  const product = productData[0];

  it('should work correctly', () => {
    expect(createProductListCard(product)).toBeDefined();
    expect(typeof createProductListCard).toBe('function');
    expect(createProductListCard(product)).toBeTruthy();
  });

  it('should return HTMLLIElement', () => {
    expect(createProductListCard(product).toString()).toBe('[object HTMLLIElement]');
  });
});
