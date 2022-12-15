import './scss/style.scss';
import { changeSearchButton } from './ts/components/headerSearch/headerSearch';
changeSearchButton();

// Filter
const filterTestTemplate = `
  <div class="bg-overlay"></div>
  <button class="filter-open">Filter</button>
  <div class="filter">
    <i class="filter__close bi bi-x-lg"></i>
    <ul class="filter__list">
      <li class="filter__item">
        <div class="filter__title">Filter</div>
      </li>
      <li class="filter__item">
        <div class="filter__title">Availability</div>
      </li>
      <li class="filter__item">
        <div class="filter__title">Brand</div>
      </li>
      <li class="filter__item">
        <div class="filter__title">Category</div>
      </li>
      <li class="filter__item">
        <div class="filter__title">Price</div>
      </li>
    </ul>
  </div>
`;

// document.body.innerHTML = filterTestTemplate;

import { showFilter, hideFilter } from './ts/components/filter/filter';

showFilter();
hideFilter();
