import { decodeQueryString } from '../../routing/queryString';
import { showOverlay, hideOverlay } from '../bg-overlay/bg-overlay';
import { Product } from '../types';
import { renderBrandFilter } from './filterBrand';
import { renderCategoryFilter } from './filterCategory';
import { renderColorFilter } from './filterColor';
import { renderPriceFilter } from './filterPrice';
import { renderStockFilter } from './filterStock';
import * as noUiSlider from 'nouislider';

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

function renderFilterButtons(data: Array<Product>) {
  const copyLinkButton = document.querySelector('.filter__copy-button') as HTMLButtonElement;
  const resetFiltersButton = document.querySelector('.filter__reset-button') as HTMLButtonElement;

  copyLinkButton.addEventListener('click', () => {
    copyLinkButton.innerHTML = 'Copied!';
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setTimeout(() => (copyLinkButton.innerHTML = 'Copy Link'), 500);
      })
      .catch((e) => console.log(e));
  });

  resetFiltersButton.addEventListener('click', () => {
    window.history.replaceState({}, location.pathname, `${location.pathname}`);
    const inputFilters: HTMLInputElement[] = [...document.querySelectorAll<HTMLInputElement>('.filter-input input')];
    inputFilters.forEach((input) => (input.checked = false));

    const colorFilterButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll<HTMLButtonElement>('.color');
    [...colorFilterButtons].forEach((button) => {
      if (button.classList.contains('color_active-black')) {
        button.classList.remove('color_active-black');
      } else {
        button.classList.remove('color_active');
      }
    });

    const priceSlider = document.querySelector('.price-slider') as noUiSlider.target;
    const stockSlider = document.querySelector('.stock-slider') as noUiSlider.target;
    priceSlider.noUiSlider?.reset();
    stockSlider.noUiSlider?.reset();

    decodeQueryString(data);
  });
}
