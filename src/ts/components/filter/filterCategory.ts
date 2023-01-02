import { decodeQueryString, encodeQueryString } from '../../routing/queryString';
import { Product } from '../types';

export function renderCategoryFilter(data: Product[]) {
  const categoryList = [...new Set(data.map((item) => item.category))];
  const categoryContainer = document.createElement('div') as HTMLDivElement;
  categoryContainer.className = 'filter__categories';
  const createCategoryItem = (categoryName: string): HTMLDivElement => {
    const categoryItem = document.createElement('div');
    categoryItem.className = 'filter__category-item category-item filter-input';
    categoryItem.innerHTML = `
    <input type="checkbox" id="${categoryName}" name="category" value="${categoryName}" class="category">
    <label for="${categoryName}">${categoryName[0].toUpperCase() + categoryName.slice(1)}</label>
    `;
    return categoryItem;
  };
  const categoryItems = categoryList.map(createCategoryItem);
  categoryContainer.append(...categoryItems);
  const categoryFilterContainer = document.querySelector('.filter__category-wrapper') as HTMLDivElement;
  categoryFilterContainer.append(categoryContainer);
  filterCategoryItems(data);
}

function filterCategoryItems(data: Product[]) {
  const categoryFilterInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>('.category');

  const params = new URLSearchParams(location.search);
  let filteredCategory: Array<string> = [];
  if (params.toString() && params.has('category')) filteredCategory = params.get('category')?.split('\u2195') || [];

  [...categoryFilterInputs].forEach((input) => {
    if (filteredCategory.some((item) => item === input.value)) {
      input.checked = true;
      decodeQueryString(data);
    }
    input.addEventListener('change', () => {
      if (input.checked) {
        filteredCategory.push(input.value);
      } else {
        filteredCategory = filteredCategory.filter((item) => item !== input.value);
      }
      encodeQueryString('category', filteredCategory);
      decodeQueryString(data);
    });
  });
}
