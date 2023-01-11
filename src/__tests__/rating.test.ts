import { createRating } from '../ts/components/rating/rating';

describe('#Create rating', () => {
  it('should work correctly', () => {
    expect(createRating(4.5)).toBeDefined();
    expect(typeof createRating).toBe('function');
    expect(createRating(4.5)).toBeTruthy();
  });

  it('should return HTMLDivElement', () => {
    expect(createRating(4.5).toString()).toBe('[object HTMLDivElement]');
  });
});
