import { filterProducts, updateFilters, updateFiltersCount } from '../components/filter/filter';
import { renderCatalog } from '../components/renderCatalog/renderCatalog';
import { filterOptions, Product } from '../components/types';

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

  return params.toString();
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
    !params.has('stock') &&
    !params.has('sort') &&
    !params.has('search')
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
    const options = checkParams();
    const filtered = filterProducts(data, options);
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
    (params.has('category') ||
      params.has('brand') ||
      params.has('color') ||
      params.has('price') ||
      params.has('stock') ||
      params.has('sort') ||
      params.has('search'))
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

export function checkParams(): filterOptions {
  const params = new URLSearchParams(location.search);

  const result: filterOptions = {
    categories: params.get('category')?.split('\u2195') || [],
    brands: params.get('brand')?.split('\u2195') || [],
    colors: params.get('color')?.split('\u2195') || [],
    prices: params.get('price')?.split('\u2195') || [],
    stock: params.get('stock')?.split('\u2195') || [],
    sorting: params.get('sort') || '',
    search: params.get('search') || '',
  };

  return result;
}
