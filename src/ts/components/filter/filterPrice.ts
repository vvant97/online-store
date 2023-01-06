import { Product } from '../types';
import * as noUiSlider from 'nouislider';
import { decodeQueryString, encodeQueryString } from '../../routing/queryString';

export function renderPriceFilter(data: Product[]) {
  const minPrice = 14.5;
  const maxPrice = 2558.75;

  const priceSlider = document.createElement('div') as noUiSlider.target;
  priceSlider.className = 'filter__price price-slider slider';
  const priceInputsWrapper = document.createElement('div');
  priceInputsWrapper.className = 'slider__inputs-wrapper price-inputs-wrapper';

  priceInputsWrapper.innerHTML = `
    <div class="slider__input min-price-value">$${minPrice.toFixed(2)}</div>
    <div class="slider__input max-price-value">$${maxPrice.toFixed(2)}</div>
  `;

  noUiSlider
    .create(priceSlider, {
      start: [minPrice, maxPrice],
      step: 1,
      connect: true,
      range: {
        min: [minPrice],
        max: [maxPrice],
      },
    })
    .on('change', (values: (string | number)[]): void => {
      const pricesRange = values.map((el: string | number): string => el.toString());
      encodeQueryString('price', pricesRange);
      decodeQueryString(data);

      const params = new URLSearchParams(location.search);
      if (params.toString() && params.has('price')) {
        const filteredPrice = params.get('price')?.split('\u2195') || [];
        updatePriceFilter(filteredPrice);
      }
    });

  const priceFilterContainer = document.querySelector('.filter__price-wrapper') as HTMLLIElement;
  priceFilterContainer.append(priceSlider, priceInputsWrapper);

  const params = new URLSearchParams(location.search);
  window.addEventListener('load', () => {
    if (priceSlider && params.toString() && params.has('price')) {
      const filteredPrice = params.get('price')?.split('\u2195') || [];
      updatePriceFilter(filteredPrice);
    }
  });
}

export function updatePriceFilter(filteredPrice: Array<string>) {
  if (!filteredPrice.length) return;
  const priceSlider = document.querySelector('.price-slider') as noUiSlider.target;
  const minPriceInput = document.querySelector('.min-price-value') as HTMLDivElement;
  const maxPriceInput = document.querySelector('.max-price-value') as HTMLDivElement;
  priceSlider?.noUiSlider?.set(filteredPrice);
  minPriceInput.innerHTML = filteredPrice[0];
  maxPriceInput.innerHTML = filteredPrice[1];
}
