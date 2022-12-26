import { Product } from '../types';

export function renderCategoryFilter(data: Product[]) {
  const categoryList = [...new Set(data.map((item) => item.category))];
  const categoryContainer = document.createElement('div') as HTMLDivElement;
  categoryContainer.className = 'filter__categories';
  const createCategoryItem = (categoryName: string): HTMLDivElement => {
    const categoryItem = document.createElement('div');
    categoryItem.className = 'filter__category-item category-item';
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
}
