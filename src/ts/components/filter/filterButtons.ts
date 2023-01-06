import { Product } from '../types';
import { renderBrandFilter } from './filterBrand';
import { renderCategoryFilter } from './filterCategory';
import { renderColorFilter } from './filterColor';
import { renderCatalog } from '../renderCatalog/renderCatalog';
import { renderPriceFilter } from './filterPrice';
import { renderStockFilter } from './filterStock';

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

    const priceSlider = document.querySelector('.filter__price') as HTMLDivElement;
    const priceInputs = document.querySelector('.price-inputs-wrapper') as HTMLDivElement;
    priceSlider.remove();
    priceInputs.remove();
    renderPriceFilter(data);

    const stockSlider = document.querySelector('.filter__stock') as HTMLDivElement;
    const stockInputs = document.querySelector('.stock-inputs-wrapper') as HTMLDivElement;
    stockSlider.remove();
    stockInputs.remove();
    renderStockFilter(data);

    const sortSelect = document.querySelector('.sort-select') as HTMLSelectElement;
    sortSelect.value = 'featured';
    data.sort((a, b) => b.rating - a.rating);

    renderCatalog(data);
  });
}
