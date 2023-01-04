import { showOverlay, hideOverlay } from '../bg-overlay/bg-overlay';
import { Product } from '../types';
import { renderBrandFilter } from './filterBrand';
import { renderCategoryFilter } from './filterCategory';
import { renderColorFilter } from './filterColor';
import { renderPriceFilter } from './filterPrice';
import { renderStockFilter } from './filterStock';
import * as noUiSlider from 'nouislider';
import { renderCatalog } from '../renderCatalog/renderCatalog';

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

export function renderFilterButtons(data: Array<Product>) {
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
    window.history.pushState({}, location.pathname, `${location.pathname}`);
    const categoryContainer = document.querySelector('.filter__categories') as HTMLDivElement;
    categoryContainer.remove();
    renderCategoryFilter(data);

    const brandContainer = document.querySelector('.filter__brands') as HTMLDivElement;
    brandContainer.remove();
    renderBrandFilter(data);

    const colorContainer = document.querySelector('.filter__colors') as HTMLDivElement;
    colorContainer.remove();
    renderColorFilter(data);

    const priceSlider = document.querySelector('.price-slider') as noUiSlider.target;
    const stockSlider = document.querySelector('.stock-slider') as noUiSlider.target;
    priceSlider.noUiSlider?.reset();
    stockSlider.noUiSlider?.reset();

    renderCatalog(data);
  });
}

export function updateFilters(filteredProducts: Product[]) {
  const categoryItems: HTMLDivElement[] = [...document.querySelectorAll<HTMLDivElement>('.category-item')];
  categoryItems.forEach((item) => {
    const input = <HTMLInputElement>item.querySelector('.category');
    const inputName = input.value;
    const spanFoundItems = <HTMLSpanElement>item.querySelector('.category-item__found');
    const spanTotalItems = <HTMLSpanElement>item.querySelector('.category-item__total');
    console.log(spanTotalItems.innerHTML);
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
  console.log(priceData);
  const minPrice = priceData.reduce((a, b) => Math.min(a, b));
  const maxPrice = priceData.reduce((a, b) => Math.max(a, b));

  if (priceSlider) {
    priceSlider.noUiSlider?.set([minPrice, maxPrice]);
  }

  const stockSlider = document.querySelector('.stock-slider') as noUiSlider.target;
  const stockData = filteredProducts.map((item) => item.stock);
  const maxStock = stockData.reduce((a, b) => Math.max(a, b));
  const minStock = stockData.reduce((a, b) => Math.min(a, b));

  if (stockSlider) {
    stockSlider.noUiSlider?.set([minStock, maxStock]);
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

  priceSlider?.noUiSlider?.reset();
  stockSlider?.noUiSlider?.reset();
}
