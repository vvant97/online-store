import { Product } from '../types';

export function renderBrandFilter(data: Product[]) {
  const brandList = [...new Set(data.map((item) => item.brand))];
  const brandContainer = document.createElement('div') as HTMLDivElement;
  brandContainer.className = 'filter__brands';
  const createBrandItem = (brandName: string): HTMLDivElement => {
    const brandItem = document.createElement('div');
    brandItem.className = 'filter__brand-item brand-item';
    brandItem.innerHTML = `
    <input type="checkbox" id="${brandName.toLowerCase()}" name="brand" value="${brandName.toLowerCase()}" class="brand">
    <label for="${brandName.toLowerCase()}">${brandName[0].toUpperCase() + brandName.slice(1)}</label>
    `;
    return brandItem;
  };
  const brandItems = brandList.map(createBrandItem);
  brandContainer.append(...brandItems);
  const brandFilterContainer = document.querySelector('.filter__brand-wrapper') as HTMLDivElement;
  brandFilterContainer.append(brandContainer);
}
