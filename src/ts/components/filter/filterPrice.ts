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
      const priceData = data.map((item) => item.discountPrice);

      const minPrice = priceData.reduce((prev, curr) => {
        return Math.abs(curr - +pricesRange[0]) < Math.abs(prev - +pricesRange[0]) ? curr : prev;
      });

      const maxPrice = priceData.reduce((prev, curr) => {
        return Math.abs(curr - +pricesRange[1]) < Math.abs(prev - +pricesRange[1]) ? curr : prev;
      });

      encodeQueryString('price', [minPrice.toFixed(2), maxPrice.toFixed(2)]);
      decodeQueryString(data);
    });

  const priceFilterContainer = document.querySelector('.filter__price-wrapper') as HTMLLIElement;
  priceFilterContainer.append(priceSlider, priceInputsWrapper);

  if (priceSlider.noUiSlider) {
    const minPriceInput = document.querySelector('.min-price-value') as HTMLDivElement;
    const maxPriceInput = document.querySelector('.max-price-value') as HTMLDivElement;
    const inputs = [minPriceInput, maxPriceInput];

    priceSlider.noUiSlider.on('update', (values: (string | number)[], handle: number): void => {
      const pricesRange = values.map((el: string | number): string => el.toString());
      inputs[handle].innerHTML = pricesRange[handle];
    });
  }
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
