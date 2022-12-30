import { decodeQueryString, encodeQueryString } from '../../routing/queryString';
import { Product } from '../types';

export function renderColorFilter(data: Product[]) {
  const colorList = [...new Set(data.map((item) => item.color))];
  const colorContainer = document.createElement('div') as HTMLDivElement;
  colorContainer.className = 'filter__colors';
  const createColorItem = (colorName: string): HTMLButtonElement => {
    const colorItem = document.createElement('button');
    colorItem.className = `filter__color-item color color_${colorName}`;
    colorItem.value = `${colorName}`;
    return colorItem;
  };
  const colorItems = colorList.map(createColorItem);
  colorContainer.append(...colorItems);
  const colorFilterContainer = document.querySelector('.filter__color-wrapper') as HTMLDivElement;
  colorFilterContainer.append(colorContainer);
  filterColorItems(data);
}

function filterColorItems(data: Product[]) {
  const colorFilterButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll<HTMLButtonElement>('.color');

  const params = new URLSearchParams(location.search);
  let filteredColor: Array<string> = [];
  if (params.toString() && params.has('color')) filteredColor = params.get('color')?.split('\u2195') || [];

  [...colorFilterButtons].forEach((button) => {
    if (filteredColor.some((item) => item === button.value)) {
      if (button.classList.contains('color_black')) {
        button.classList.add('color_active-black');
      } else {
        button.classList.add('color_active');
      }
      decodeQueryString(data);
    }
    button.addEventListener('click', () => {
      if (button.classList.contains('color_active')) {
        button.classList.remove('color_active');
        filteredColor = filteredColor.filter((item) => item !== button.value);
      } else if (button.classList.contains('color_active-black')) {
        button.classList.remove('color_active-black');
        filteredColor = filteredColor.filter((item) => item !== button.value);
      } else {
        if (button.classList.contains('color_black')) {
          button.classList.add('color_active-black');
        } else {
          button.classList.add('color_active');
        }
        filteredColor.push(button.value);
      }
      encodeQueryString('color', filteredColor);
      decodeQueryString(data);
    });
  });
}
