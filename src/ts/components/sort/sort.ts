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
