import { showOverlay, hideOverlay } from '../bg-overlay/bg-overlay';
import { Product } from '../types';
import { renderBrandFilter } from './filterBrand';
import { renderCategoryFilter } from './filterCategory';
import { renderColorFilter } from './filterColor';
import { renderPriceFilter } from './filterPrice';
import { renderStockFilter } from './filterStock';

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
}
