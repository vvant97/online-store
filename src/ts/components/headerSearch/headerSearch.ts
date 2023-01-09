import { decodeQueryString, encodeQueryString } from '../../routing/queryString';
import { Product } from '../types';

export function renderSearch() {
  const searchFormIcon = document.querySelector('.search-form__icon') as HTMLElement;
  const searchFormButton = document.querySelector('.search-form__btn') as HTMLButtonElement;
  searchFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      const searchInput = document.querySelector('.search-input') as HTMLInputElement;
      if (searchInput.value === '') return;
      const searchValue = searchInput.value.toLowerCase();
      location.href = `/?search=${searchValue}`;
    }
  });
  searchFormIcon.addEventListener('click', () => {
    (<HTMLDivElement>document.querySelector('.search-form')).classList.toggle('_active');
  });
}

export function searchItems(data: Product[]) {
  const params = new URLSearchParams(location.search);
  const search = params.get('search') || '';
  const searchInput = document.querySelector('.search-input') as HTMLInputElement;
  if (search.length) searchInput.value = search;
  decodeQueryString(data);

  searchInput.addEventListener('keyup', () => {
    encodeQueryString('search', [searchInput.value.toLowerCase()]);
    decodeQueryString(data);
    if (searchInput.value === '') {
      encodeQueryString('search', []);
      decodeQueryString(data);
    }
  });
}
