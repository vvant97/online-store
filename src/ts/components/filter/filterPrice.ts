import { Product } from '../types';
import * as noUiSlider from 'nouislider';
import { decodeQueryString, encodeQueryString } from '../../routing/queryString';

export function renderPriceFilter(data: Product[]) {
  const priceData = data.map((item) => item.discountPrice);
  const minPrice = priceData.reduce((a, b) => Math.min(a, b));
  const maxPrice = priceData.reduce((a, b) => Math.max(a, b));
  // const minPrice = 14.5;
  // const maxPrice = 2558.75;

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
      const minPriceInput = document.querySelector('.min-price-value') as HTMLDivElement;
      const maxPriceInput = document.querySelector('.max-price-value') as HTMLDivElement;
      const pricesRange = values.map((el: string | number): string => el.toString());
      minPriceInput.innerHTML = pricesRange[0];
      maxPriceInput.innerHTML = pricesRange[1];
      encodeQueryString('price', pricesRange);
      decodeQueryString(data);
    });

  const priceFilterContainer = document.querySelector('.filter__price-wrapper') as HTMLLIElement;
  priceFilterContainer.append(priceSlider, priceInputsWrapper);

  if (priceSlider.noUiSlider) {
    decodeQueryString(data);
    const minPriceInput = document.querySelector('.min-price-value') as HTMLDivElement;
    const maxPriceInput = document.querySelector('.max-price-value') as HTMLDivElement;
    const inputs = [minPriceInput, maxPriceInput];

    priceSlider.noUiSlider.on('update', (values: (string | number)[], handle: number): void => {
      const pricesRange = values.map((el: string | number): string => el.toString());
      inputs[handle].innerHTML = pricesRange[handle];
    });

    const params = new URLSearchParams(location.search);

    if (params.toString() && params.has('price')) {
      const filteredPrice = params.get('price')?.split('\u2195') || [];
      priceSlider.noUiSlider.set(filteredPrice);
      minPriceInput.innerHTML = filteredPrice[0];
      maxPriceInput.innerHTML = filteredPrice[1];
      decodeQueryString(data);
    }
  }
}
