import { Product } from '../types';
import * as noUiSlider from 'nouislider';

export function renderStockFilter(data: Product[]) {
  const stockData = data.map((item) => item.stock);
  const maxStock = stockData.reduce((a, b) => Math.max(a, b));
  const minStock = stockData.reduce((a, b) => Math.min(a, b));

  const stockSlider = document.createElement('div') as noUiSlider.target;
  stockSlider.className = 'filter__stock stock-slider slider';
  const stockInputsWrapper = document.createElement('div');
  stockInputsWrapper.className = 'slider__inputs-wrapper';

  stockInputsWrapper.innerHTML = `
    <div class="slider__input min-stock-value">${minStock}</div>
    <div class="slider__input max-stock-value">${maxStock}</div>
  `;

  noUiSlider.create(stockSlider, {
    start: [minStock, maxStock],
    step: 1,
    connect: true,
    range: {
      min: [minStock],
      max: [maxStock],
    },
  });

  const stockFilterContainer = document.querySelector('.filter__stock-wrapper') as HTMLLIElement;
  stockFilterContainer.append(stockSlider, stockInputsWrapper);
}
