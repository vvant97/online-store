import { renderCatalog } from '../components/renderCatalog/renderCatalog';
import { Product } from '../components/types';

export function encodeQueryString(key: string, values: Array<string>) {
  const params = new URLSearchParams(location.search);
  let queryString = '';
  if (values.length === 0 && !params.get('view')) {
    window.history.pushState({}, location.pathname, `${location.pathname}`);
  } else if (values.length === 0 && params.get('view')) {
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
}

export function decodeQueryString(data: Product[]) {
  const params = new URLSearchParams(location.search);
  const gridViewButton = document.querySelector('.grid-view') as HTMLButtonElement;
  const listViewButton = document.querySelector('.list-view') as HTMLButtonElement;
  if (!params.toString()) {
    renderCatalog(data);
  } else if (params.has('view') && !params.has('category') && !params.has('brand')) {
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
  } else if (params.has('category') && !params.has('brand')) {
    const filteredCategory = params.get('category')?.split('\u2195') || [];
    const filtered = data.filter((item) => filteredCategory.includes(item.category));
    checkView(filtered);
  } else if (params.has('brand') && !params.has('category')) {
    const filteredBrand = params.get('brand')?.split('\u2195') || [];
    const filtered = data.filter((item) => filteredBrand.includes(item.brand.toLowerCase()));
    checkView(filtered);
  } else if (params.has('category') && params.has('brand')) {
    const filteredCategory = params.get('category')?.split('\u2195') || [];
    const filteredCategoryProducts = data.filter((item) => filteredCategory.includes(item.category));
    const filteredBrand = params.get('brand')?.split('\u2195') || [];
    const filteredBrandProducts = data.filter((item) => filteredBrand.includes(item.brand.toLowerCase()));
    const filtered = filteredCategoryProducts.filter((item) => filteredBrandProducts.includes(item));
    checkView(filtered);
  }
}

function checkView(filteredProducts: Product[]) {
  const params = new URLSearchParams(location.search);
  const gridViewButton = document.querySelector('.grid-view') as HTMLButtonElement;
  const listViewButton = document.querySelector('.list-view') as HTMLButtonElement;

  if ((params.has('view') && params.has('category')) || params.has('brand')) {
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
