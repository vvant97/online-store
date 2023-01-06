import { Product } from '../types';
import * as noUiSlider from 'nouislider';
import { decodeQueryString, encodeQueryString } from '../../routing/queryString';

export function renderStockFilter(data: Product[]) {
  const stockData = data.map((item) => item.stock);
  const maxStock = stockData.reduce((a, b) => Math.max(a, b));
  const minStock = stockData.reduce((a, b) => Math.min(a, b));

  const stockSlider = document.createElement('div') as noUiSlider.target;
  stockSlider.className = 'filter__stock stock-slider slider';
  const stockInputsWrapper = document.createElement('div');
  stockInputsWrapper.className = 'slider__inputs-wrapper stock-inputs-wrapper';

  stockInputsWrapper.innerHTML = `
    <div class="slider__input min-stock-value">${minStock}</div>
    <div class="slider__input max-stock-value">${maxStock}</div>
  `;

  noUiSlider
    .create(stockSlider, {
      start: [minStock, maxStock],
      step: 1,
      connect: true,
      range: {
        min: [minStock],
        max: [maxStock],
      },
    })
    .on('change', (values: (string | number)[]): void => {
      const minStockInput = document.querySelector('.min-stock-value') as HTMLDivElement;
      const maxStockInput = document.querySelector('.max-stock-value') as HTMLDivElement;
      const stockRange = values.map((el: string | number): string => el.toString().replace(/\.00$/, ''));
      minStockInput.innerHTML = stockRange[0];
      maxStockInput.innerHTML = stockRange[1];
      encodeQueryString('stock', stockRange);
      decodeQueryString(data);
    });

  const stockFilterContainer = document.querySelector('.filter__stock-wrapper') as HTMLLIElement;
  stockFilterContainer.append(stockSlider, stockInputsWrapper);

  if (stockSlider.noUiSlider) {
    decodeQueryString(data);
    const minStockInput = document.querySelector('.min-stock-value') as HTMLDivElement;
    const maxStockInput = document.querySelector('.max-stock-value') as HTMLDivElement;
    const inputs = [minStockInput, maxStockInput];

    stockSlider.noUiSlider.on('update', (values: (string | number)[], handle: number): void => {
      const stockRange = values.map((el: string | number): string => el.toString().replace(/\.00$/, ''));
      inputs[handle].innerHTML = stockRange[handle];
    });

    const params = new URLSearchParams(location.search);

    if (params.toString() && params.has('stock')) {
      const filteredStock = params.get('stock')?.split('\u2195') || [];
      console.log(filteredStock);
      stockSlider.noUiSlider.set(filteredStock);
      minStockInput.innerHTML = filteredStock[0];
      maxStockInput.innerHTML = filteredStock[1];
      decodeQueryString(data);
    }
  }
}
