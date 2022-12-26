import { Product } from '../types';
import * as noUiSlider from 'nouislider';

export function renderPriceFilter(data: Product[]) {
  const priceData = data.map((item) => item.discountPrice);
  const maxPrice = priceData.reduce((a, b) => Math.max(a, b));
  const minPrice = priceData.reduce((a, b) => Math.min(a, b));

  const priceSlider = document.createElement('div') as noUiSlider.target;
  priceSlider.className = 'filter__price price-slider slider';
  const priceInputsWrapper = document.createElement('div');
  priceInputsWrapper.className = 'slider__inputs-wrapper';

  priceInputsWrapper.innerHTML = `
    <div class="slider__input min-price-value">$${minPrice.toFixed(2)}</div>
    <div class="slider__input max-price-value">$${maxPrice.toFixed(2)}</div>
  `;

  noUiSlider.create(priceSlider, {
    start: [minPrice, maxPrice],
    step: 1,
    connect: true,
    range: {
      min: [minPrice],
      max: [maxPrice],
    },
  });

  const priceFilterContainer = document.querySelector('.filter__price-wrapper') as HTMLLIElement;
  priceFilterContainer.append(priceSlider, priceInputsWrapper);
}
