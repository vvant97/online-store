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
}
