import { productData } from '../productData';
import { createImageSlider } from './image-slider';
import { createRating } from '../rating/rating';

const setProductTitle = (id: number) => {
  const title = document.querySelector('.product-info__title') as HTMLHeadingElement;
  
  title.textContent = productData[id - 1].title;
};

const setProductPrice = (id: number) => {
  const price = productData[id - 1].price;
  const discount = Math.round(productData[id - 1].discountPercentage);
  const actualPriceContainer = document.querySelector('.product-info__actual-price') as HTMLParagraphElement;
  const oldPriceContainer = document.querySelector('.product-info__old-price') as HTMLParagraphElement;
  const discountContainer = document.querySelector('.product-info__discount') as HTMLSpanElement;

  if (discount) {
    
    const newPrice = price - (price * (discount / 100));
    actualPriceContainer.textContent = `$${newPrice.toFixed(2)}`;
    oldPriceContainer.textContent = `$${price.toFixed(2)}`;
    discountContainer.textContent = `-${discount}%`;
  } else {
    actualPriceContainer.textContent = `$${price.toFixed(2)}`;
    oldPriceContainer.remove();
    discountContainer.remove();
  }
};

const setProductAvailability = (id: number) => {
  const availability = productData[id - 1].stock;
  const status = document.querySelector('.product-info__availability') as HTMLParagraphElement;
  const statusTitle = document.querySelector('.product-info__availability-status') as HTMLSpanElement;
  const icon = document.querySelector('.product-info__availability-icon') as HTMLElement;
  const quantity = document.querySelector('.producti-info__availability-quantity') as HTMLSpanElement;

  if (availability) {
    status.dataset.availability = 'in-stock';
    statusTitle.textContent = 'In stock';
    icon.classList.add('bi-check2');
  } else {
    status.dataset.availability = 'out-of-stock';
    statusTitle.textContent = 'Out of stock';
  }

  quantity.textContent = `(${availability})`;
};

const setProductBrand = (id: number) => {
  const brand = document.querySelector('.product-info__brand') as HTMLSpanElement;

  brand.textContent = productData[id - 1].brand;
};

export const createProductCard = (id: number) => {
  const productInfoContainer = document.querySelector('.product-info') as HTMLDivElement;

  createImageSlider(id);
  productInfoContainer.prepend(createRating(id));
  setProductTitle(id);
  setProductPrice(id);
  setProductAvailability(id);
  setProductBrand(id);
};
