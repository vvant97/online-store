import { showOverlay, hideOverlay } from '../bg-overlay/bg-overlay';
import { filterOptions, Product } from '../types';
import { renderBrandFilter } from './filterBrand';
import { renderCategoryFilter } from './filterCategory';
import { renderColorFilter } from './filterColor';
import { renderPriceFilter, updatePriceFilter } from './filterPrice';
import { renderStockFilter, updateStockFilter } from './filterStock';
import * as noUiSlider from 'nouislider';
import { sortingOptions } from '../sort/sort';
import { renderFilterButtons } from './filterButtons';

export const showFilter = () => {
  const filter = document.querySelector('.filter') as HTMLDivElement;
  const filterButton = document.querySelector('.filter-button') as HTMLButtonElement;

  filterButton.addEventListener('click', () => {
    filter.classList.add('active');

    showOverlay();
  });
};

export const hideFilter = () => {
  const filter = document.querySelector('.filter') as HTMLDivElement;

  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.className.includes('filter__close') || target.className.includes('bg-overlay')) {
      filter.classList.remove('active');

      hideOverlay();
    }
  });
};

export function renderFilters(data: Array<Product>) {
  showFilter();
  hideFilter();
  renderCategoryFilter(data);
  renderBrandFilter(data);
  renderColorFilter(data);
  renderPriceFilter(data);
  renderStockFilter(data);
  renderFilterButtons(data);
}

export function updateFilters(filteredProducts: Product[]) {
  if (!filteredProducts.length) return;

  const categoryItems: HTMLDivElement[] = [...document.querySelectorAll<HTMLDivElement>('.category-item')];
  categoryItems.forEach((item) => {
    const input = <HTMLInputElement>item.querySelector('.category');
    const inputName = input.value;
    const spanFoundItems = <HTMLSpanElement>item.querySelector('.category-item__found');
    spanFoundItems.innerHTML = `${filteredProducts.filter((item) => inputName === item.category).length}`;
  });

  const brandItems: HTMLDivElement[] = [...document.querySelectorAll<HTMLDivElement>('.brand-item')];
  brandItems.forEach((item) => {
    const input = <HTMLInputElement>item.querySelector('.brand');
    const inputName = input.value;
    const spanFoundItems = <HTMLSpanElement>item.querySelector('.brand-item__found');
    spanFoundItems.innerHTML = `${filteredProducts.filter((item) => inputName === item.brand.toLowerCase()).length}`;
  });

  const priceSlider = document.querySelector('.price-slider') as noUiSlider.target;
  const priceData = filteredProducts.map((item) => item.discountPrice);
  const minPrice = priceData.reduce((a, b) => Math.min(a, b)).toFixed(2);
  const maxPrice = priceData.reduce((a, b) => Math.max(a, b)).toFixed(2);
  const stockSlider = document.querySelector('.stock-slider') as noUiSlider.target;
  const stockData = filteredProducts.map((item) => item.stock);
  const maxStock = stockData.reduce((a, b) => Math.max(a, b)).toString();
  const minStock = stockData.reduce((a, b) => Math.min(a, b)).toString();

  if (priceSlider) {
    updatePriceFilter([minPrice, maxPrice]);
  }

  if (stockSlider) {
    updateStockFilter([minStock, maxStock]);
  }
}

export function updateFiltersCount() {
  const categoryItems: HTMLDivElement[] = [...document.querySelectorAll<HTMLDivElement>('.category-item')];
  categoryItems.forEach((item) => {
    const spanFoundItems = <HTMLSpanElement>item.querySelector('.category-item__found');
    const spanTotalItems = <HTMLSpanElement>item.querySelector('.category-item__total');
    spanFoundItems.innerHTML = spanTotalItems.innerHTML;
  });

  const brandItems: HTMLDivElement[] = [...document.querySelectorAll<HTMLDivElement>('.brand-item')];
  brandItems.forEach((item) => {
    const spanFoundItems = <HTMLSpanElement>item.querySelector('.brand-item__found');
    const spanTotalItems = <HTMLSpanElement>item.querySelector('.brand-item__total');
    spanFoundItems.innerHTML = spanTotalItems.innerHTML;
  });

  const priceSlider = document.querySelector('.price-slider') as noUiSlider.target;
  const stockSlider = document.querySelector('.stock-slider') as noUiSlider.target;

  if (priceSlider) {
    updatePriceFilter(['14.50', '2558.75']);
  }

  if (stockSlider) {
    updateStockFilter(['1', '123']);
  }
}

export function filterProducts(data: Product[], options: filterOptions) {
  let filtered = data.slice();

  if (options.categories.length) {
    filtered = filtered.filter((item) => options.categories.includes(item.category));
  }
  if (options.brands.length) {
    filtered = filtered.filter((item) => options.brands.includes(item.brand.toLowerCase()));
  }
  if (options.colors.length) {
    filtered = filtered.filter((item) => options.colors.includes(item.color));
  }
  if (options.prices.length) {
    const minPrice = options.prices[0];
    const maxPrice = options.prices[1];
    filtered = filtered.filter((item) => item.discountPrice >= +minPrice && item.discountPrice <= +maxPrice);
  }
  if (options.stock.length) {
    const minStock = options.stock[0];
    const maxStock = options.stock[1];
    filtered = filtered.filter((item) => item.stock >= +minStock && item.stock <= +maxStock);
  }

  if (options.search.length) {
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(options.search) ||
        item.description.toLowerCase().includes(options.search) ||
        item.category.toLowerCase().includes(options.search) ||
        item.brand.toLowerCase().includes(options.search) ||
        item.color.toLowerCase().includes(options.search) ||
        item.price.toString().includes(options.search) ||
        item.discountPrice.toString().includes(options.search) ||
        item.stock.toString().includes(options.search) ||
        item.rating.toString().includes(options.search),
    );
  }

  if (options.sorting.length) {
    sortingOptions(options.sorting, filtered);
  }

  return filtered;
}
