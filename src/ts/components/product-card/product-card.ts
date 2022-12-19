import { productData } from '../productData';
import { createImageSlider } from './image-slider';
import { createRating } from '../rating/rating';
import { createProductQuantity, disableProductButtons } from '../product-quantity/product-quantity';

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
    const newPrice = price - price * (discount / 100);

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
    disableProductButtons();
  }

  quantity.textContent = `(${availability})`;
};

const setProductBrand = (id: number) => {
  const brand = document.querySelector('.product-info__brand') as HTMLSpanElement;

  brand.textContent = productData[id - 1].brand;
};

export const createProductCard = () => {
  const productId = +location.href.slice(-1);
  const productInfoContainer = document.querySelector('.product-info') as HTMLDivElement;
  const productQuantity = document.querySelector('.product-info__quantity-wrapper') as HTMLDivElement;

  productInfoContainer.prepend(createRating(productId));
  productQuantity.append(createProductQuantity());
  createImageSlider(productId);
  setProductTitle(productId);
  setProductPrice(productId);
  setProductAvailability(productId);
  setProductBrand(productId);
};
