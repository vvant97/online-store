import { Product } from '../types';
import * as noUiSlider from 'nouislider';
import { decodeQueryString, encodeQueryString } from '../../routing/queryString';

export function renderPriceFilter(data: Product[]) {
  const priceData = data.map((item) => item.discountPrice);
  const minPrice = priceData.reduce((a, b) => Math.min(a, b));
  const maxPrice = priceData.reduce((a, b) => Math.max(a, b));

  const priceSlider = document.createElement('div') as noUiSlider.target;
  priceSlider.className = 'filter__price price-slider slider';
  const priceInputsWrapper = document.createElement('div');
  priceInputsWrapper.className = 'slider__inputs-wrapper price-inputs-wrapper';

  priceInputsWrapper.innerHTML = `
    <div class="slider__input min-price-value">$${minPrice}</div>
    <div class="slider__input max-price-value">$${maxPrice}</div>
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
    }
  }
}
