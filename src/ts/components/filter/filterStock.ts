import { Product } from '../types';
import * as noUiSlider from 'nouislider';
import { decodeQueryString, encodeQueryString } from '../../routing/queryString';

export function renderStockFilter(data: Product[]) {
  const minStock = 1;
  const maxStock = 123;

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
      const stockRange = values.map((el: string | number): string => el.toString().replace(/\.00$/, ''));
      const stockData = data.map((item) => item.stock);

      const minStock = stockData.reduce((prev, curr) => {
        return Math.abs(curr - +stockRange[0]) < Math.abs(prev - +stockRange[0]) ? curr : prev;
      });

      const maxStock = stockData.reduce((prev, curr) => {
        return Math.abs(curr - +stockRange[1]) < Math.abs(prev - +stockRange[1]) ? curr : prev;
      });

      encodeQueryString('stock', [minStock.toString(), maxStock.toString()]);
      decodeQueryString(data);
    });

  const stockFilterContainer = document.querySelector('.filter__stock-wrapper') as HTMLLIElement;
  stockFilterContainer.append(stockSlider, stockInputsWrapper);

  if (stockSlider.noUiSlider) {
    const minStockInput = document.querySelector('.min-stock-value') as HTMLDivElement;
    const maxStockInput = document.querySelector('.max-stock-value') as HTMLDivElement;
    const inputs = [minStockInput, maxStockInput];

    stockSlider.noUiSlider.on('update', (values: (string | number)[], handle: number): void => {
      const stockRange = values.map((el: string | number): string => el.toString().replace(/\.00$/, ''));
      inputs[handle].innerHTML = stockRange[handle];
    });
  }
}

export function updateStockFilter(filteredStock: Array<string>) {
  const stockSlider = document.querySelector('.stock-slider') as noUiSlider.target;
  const minStockInput = document.querySelector('.min-stock-value') as HTMLDivElement;
  const maxStockInput = document.querySelector('.max-stock-value') as HTMLDivElement;
  stockSlider?.noUiSlider?.set(filteredStock);
  minStockInput.innerHTML = filteredStock[0];
  maxStockInput.innerHTML = filteredStock[1];
}
