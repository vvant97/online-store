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
  } else if (params.has('view') && !params.has('category') && !params.has('brand') && !params.has('color')) {
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
  }
}

function checkView(filteredProducts: Product[]) {
  const params = new URLSearchParams(location.search);
  const gridViewButton = document.querySelector('.grid-view') as HTMLButtonElement;
  const listViewButton = document.querySelector('.list-view') as HTMLButtonElement;

  if (params.has('view') && (params.has('category') || params.has('brand') || params.has('color'))) {
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

function checkParams(data: Product[]) {
  const params = new URLSearchParams(location.search);
  let filtered: Array<Product> = [];
  if (!params.toString()) return;
  const filteredCategory = params.get('category')?.split('\u2195') || [];
  const filteredCategoryProducts = data.filter((item) => filteredCategory.includes(item.category));
  const filteredBrand = params.get('brand')?.split('\u2195') || [];
  const filteredBrandProducts = data.filter((item) => filteredBrand.includes(item.brand.toLowerCase()));
  const filteredColor = params.get('color')?.split('\u2195') || [];
  const filteredColorProducts = data.filter((item) => filteredColor.includes(item.color));

  if (params.has('category') && !params.has('brand') && !params.has('color')) {
    filtered = filteredCategoryProducts;
  } else if (params.has('brand') && !params.has('category') && !params.has('color')) {
    filtered = filteredBrandProducts;
  } else if (params.has('color') && !params.has('category') && !params.has('brand')) {
    filtered = filteredColorProducts;
  } else if (params.has('category') && params.has('brand') && params.has('color')) {
    filtered = filteredCategoryProducts.filter(
      (item) => filteredBrandProducts.includes(item) && filteredColorProducts.includes(item),
    );
  } else if (params.has('category') && (params.has('brand') || params.has('color'))) {
    filtered = filteredCategoryProducts.filter(
      (item) => filteredBrandProducts.includes(item) || filteredColorProducts.includes(item),
    );
  } else if (!params.has('category') && params.has('brand') && params.has('color')) {
    filtered = filteredBrandProducts.filter((item) => filteredColorProducts.includes(item));
  }
  return filtered;
}
