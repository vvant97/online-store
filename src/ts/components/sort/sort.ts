import { decodeQueryString, encodeQueryString } from '../../routing/queryString';
import { Product } from '../types';

export function sortItems(data: Product[]) {
  const params = new URLSearchParams(location.search);
  const sorting = params.get('sort') || '';
  const sortSelect = document.querySelector('.sort-select') as HTMLSelectElement;
  if (sorting.length) sortSelect.value = sorting;
  if (!sorting.length) {
    sortSelect.value = 'featured';
    data.sort((a, b) => b.rating - a.rating);
  }
  decodeQueryString(data);

  sortSelect.addEventListener('change', () => {
    encodeQueryString('sort', [sortSelect.value]);
    decodeQueryString(data);
  });
}

export function sortingOptions(option: string, data: Array<Product>): Array<Product> {
  switch (option) {
    case 'featured':
      data.sort((a, b) => b.rating - a.rating);
      break;
    case 'title-ascending':
      data.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
      break;
    case 'title-descending':
      data.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1));
      break;
    case 'price-descending':
      data.sort((a, b) => b.discountPrice - a.discountPrice);
      break;
    case 'price-ascending':
      data.sort((a, b) => a.discountPrice - b.discountPrice);
      break;
  }
  return data;
}
