import { decodeQueryString, encodeQueryString } from '../../routing/queryString';
import { Product } from '../types';

export function renderBrandFilter(data: Product[]) {
  const brandList = [...new Set(data.map((item) => item.brand))].sort();
  const brandContainer = document.createElement('div') as HTMLDivElement;
  brandContainer.className = 'filter__brands';
  const createBrandItem = (brandName: string): HTMLDivElement => {
    const brandItem = document.createElement('div');
    brandItem.className = 'filter__brand-item brand-item filter-input';
    brandItem.innerHTML = `
    <input type="checkbox" id="${brandName.toLowerCase()}" name="brand" value="${brandName.toLowerCase()}" class="brand">
    <label for="${brandName.toLowerCase()}">${brandName[0].toUpperCase() + brandName.slice(1)}</label>
    <div class="filter__brand-quantity">(<span class="brand-item__found">${
      data.filter((item) => brandName === item.brand).length
    }</span> | <span class="brand-item__total">${data.filter((item) => brandName === item.brand).length}</span>)</div>
    `;
    return brandItem;
  };
  const brandItems = brandList.map(createBrandItem);
  brandContainer.append(...brandItems);
  const brandFilterContainer = document.querySelector('.filter__brand-wrapper') as HTMLDivElement;
  brandFilterContainer.append(brandContainer);

  filterBrandItems(data);
}

export function filterBrandItems(data: Product[]) {
  const brandFilterInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>('.brand');

  const params = new URLSearchParams(location.search);
  let filteredBrand: Array<string> = [];
  if (params.toString() && params.has('brand')) filteredBrand = params.get('brand')?.split('\u2195') || [];

  [...brandFilterInputs].forEach((input) => {
    if (filteredBrand.some((item) => item === input.value)) {
      input.checked = true;
      decodeQueryString(data);
    }
    input.addEventListener('change', () => {
      if (input.checked) {
        filteredBrand.push(input.value);
      } else {
        filteredBrand = filteredBrand.filter((item) => item !== input.value);
      }
      encodeQueryString('brand', filteredBrand);
      decodeQueryString(data);
    });
  });
}
