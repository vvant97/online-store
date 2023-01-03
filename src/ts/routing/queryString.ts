import { updateFilters, updateFiltersCount } from '../components/filter/filter';
import { renderCatalog } from '../components/renderCatalog/renderCatalog';
import { Product } from '../components/types';

export function encodeQueryString(key: string, values: Array<string>) {
  const params = new URLSearchParams(location.search);
  let queryString = '';

  if (values.length === 0) {
    params.delete(key);
    window.history.pushState({}, location.pathname, `${location.pathname}?${params}`);
  } else if (values.length === 1) {
    queryString = `${values.toString()}`;
    params.set(key, queryString);
    window.history.pushState({}, location.pathname, `${location.pathname}?${params}`);
  } else {
    queryString = `${values.join('\u2195')}`;
    params.set(key, queryString);
    window.history.pushState({}, location.pathname, `${location.pathname}?${params}`);
  }

  if (!params.toString().length) {
    window.history.pushState({}, location.pathname, `${location.pathname}`);
  }
}

export function decodeQueryString(data: Product[]) {
  const params = new URLSearchParams(location.search);
  const gridViewButton = document.querySelector('.grid-view') as HTMLButtonElement;
  const listViewButton = document.querySelector('.list-view') as HTMLButtonElement;
  if (!params.toString()) {
    renderCatalog(data);
    updateFiltersCount();
  } else if (
    params.has('view') &&
    !params.has('category') &&
    !params.has('brand') &&
    !params.has('color') &&
    !params.has('price') &&
    !params.has('stock')
  ) {
    updateFiltersCount();
    const catalogView = params.get('view');
    if (catalogView === 'list') {
      gridViewButton.classList.remove('view-mode-active');
      listViewButton.classList.add('view-mode-active');
      renderCatalog(data);
    } else {
      listViewButton.classList.remove('view-mode-active');
      gridViewButton.classList.add('view-mode-active');
      renderCatalog(data);
    }
  } else {
    const filtered = checkParams(data) || [];
    checkView(filtered);
    updateFilters(filtered);
  }
}

function checkView(filteredProducts: Product[]) {
  const params = new URLSearchParams(location.search);
  const gridViewButton = document.querySelector('.grid-view') as HTMLButtonElement;
  const listViewButton = document.querySelector('.list-view') as HTMLButtonElement;

  if (
    params.has('view') &&
    (params.has('category') || params.has('brand') || params.has('color') || params.has('price') || params.has('stock'))
  ) {
    const catalogView = params.get('view');
    if (catalogView === 'list') {
      gridViewButton.classList.remove('view-mode-active');
      listViewButton.classList.add('view-mode-active');
      renderCatalog(filteredProducts);
    } else {
      renderCatalog(filteredProducts);
    }
  } else {
    renderCatalog(filteredProducts);
  }
}

export function checkParams(data: Product[]) {
  const params = new URLSearchParams(location.search);
  let filtered = data.slice();
  if (!params.toString()) return;
  const filteredCategory = params.get('category')?.split('\u2195') || [];
  const filteredBrand = params.get('brand')?.split('\u2195') || [];
  const filteredColor = params.get('color')?.split('\u2195') || [];
  const [minPrice, maxPrice] = params.get('price')?.split('\u2195') || [];
  const [minStock, maxStock] = params.get('stock')?.split('\u2195') || [];

  if (filteredCategory.length) {
    filtered = filtered.filter((item) => filteredCategory.includes(item.category));
  }
  if (filteredBrand.length) {
    filtered = filtered.filter((item) => filteredBrand.includes(item.brand.toLowerCase()));
  }
  if (filteredColor.length) {
    filtered = filtered.filter((item) => filteredColor.includes(item.color));
  }
  if (minPrice && maxPrice) {
    filtered = filtered.filter((item) => item.discountPrice >= +minPrice && item.discountPrice <= +maxPrice);
  }
  if (minStock && maxStock) {
    filtered = filtered.filter((item) => item.stock >= +minStock && item.stock <= +maxStock);
  }

  return filtered;
}
