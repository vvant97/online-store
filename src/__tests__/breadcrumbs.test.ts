import { createBreadcrumbs } from '../ts/components/breadcrumbs/breadcrumbs';

describe('#Create breadcrumbs', () => {
  it('should work correctly', () => {
    expect(createBreadcrumbs('Iphone X', 'smartphone', 'Apple')).toBeDefined();
    expect(typeof createBreadcrumbs).toBe('function');
    expect(createBreadcrumbs('Iphone X', 'smartphone', 'Apple')).toBeTruthy();
  });

  it('should return HTMLDivElement', () => {
    expect(createBreadcrumbs('Iphone X', 'smartphone', 'Apple').toString()).toBe('[object HTMLDivElement]');
  });

  it('should create correct HTML code', () => {
    const template = `
    <div class="breadcrumbs__container">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="/">Home</a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="/?category=smartphone">Smartphone</a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="/?brand=apple">Apple</a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" style="pointer-events: none">Iphone X</a>
        </li>
      </ul>
    </div>
  `;
    expect(createBreadcrumbs('Iphone X', 'smartphone', 'Apple').innerHTML).toBe(template);
  });
});
