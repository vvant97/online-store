import { productData } from '../productData';
import { createImageSlider } from './image-slider';
import { createRating } from '../rating/rating';
import { createProductQuantity, disableProductButtons } from '../product-quantity/product-quantity';
import { Product } from '../types';
import { createBreadcrumbs } from '../breadcrumbs/breadcrumbs';

const setProductPrice = (price: number, discountNumber: number) => {
  const discount = Math.round(discountNumber);
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

const setProductAvailability = (stock: number) => {
  const status = document.querySelector('.product-info__availability') as HTMLParagraphElement;
  const statusTitle = document.querySelector('.product-info__availability-status') as HTMLSpanElement;
  const icon = document.querySelector('.product-info__availability-icon') as HTMLElement;
  const quantity = document.querySelector('.producti-info__availability-quantity') as HTMLSpanElement;

  if (stock) {
    status.dataset.availability = 'in-stock';
    statusTitle.textContent = 'In stock';
    icon.classList.add('bi-check2');
  } else {
    status.dataset.availability = 'out-of-stock';
    statusTitle.textContent = 'Out of stock';
    disableProductButtons();
  }

  quantity.textContent = `(${stock})`;
};

export const createProductCard = (id: number) => {
  const product: Product | undefined = productData.find((item) => item.id === id);
  const productBody = document.querySelector('.product__body') as HTMLDivElement;

  if (!product) {
    productBody.innerHTML = `
      <h2 class="product-error-title">
        There is no product with id
        <span class="product-error-id">${id || 0}</span>.
      </h2>
    `;
  } else {
    productBody.innerHTML = `
    <div class="product-slider">
    <div class="product-slider__list-wrapper">
      <ul class="product-slider__list"></ul>
      <div class="product-slider__full-image">
        <i class="product-slider__full-image-button bi bi-arrows-fullscreen"></i>
      </div>
    </div>
    <ul class="product-slider__gallery">
      <i class="product-slider__gallery-icon product-slider__gallery-icon-prev bi bi-caret-left"></i>
      <i class="product-slider__gallery-icon product-slider__gallery-icon-next bi bi-caret-right"></i>
    </ul>
  </div>
  <div class="product-info">
    <div class="product-info__rating"></div>
    <h2 class="product-info__title">${product.title}</h2>
    <div class="product-info__price">
      <p class="product-info__actual-price"></p>
      <div class="product-info__old-price-wrapper">
        <p class="product-info__old-price"></p>
        <p class="product-info__discount"></p>
      </div>
    </div>
    <div class="product-info__availability-wrapper">
      <p class="product-info__availability-title">Availability:</p>
      <p class="product-info__availability" data-availability="in-stock">
        <span class="product-info__availability-status"></span> 
        <i class="product-info__availability-icon bi"></i> 
        <span class="producti-info__availability-quantity"></span>
      </p>
    </div>
    <p class="product-info__brand-title">Brand: <span class="product-info__brand">${product.brand}</span></p>
    <div class="product-info__quantity-wrapper">
      <p class="product-info__quantity-title">Quantity:</p>
    </div>
    <div class="product-info__buttons-wrapper">
      <button class="product-info__cart-button product-info__cart-button_rounded">Add to cart</button>
      <button class="product-info__buy-button">Buy now</button>
    </div>
    <p class="product-info__id-title">
      SKU: 
      <span class="product-info__id">${product.id}</span>
    </p>
    <p class="product-info__category-title">
      Category: 
      <span class="product-info__category">${product.category}</span>
    </p>
    <div class="product-info__description-wrapper">
      <p class="product-info__description-title">Description:</p>
      <p class="product-info__description">${product.description}</p>
    </div>
  </div>
  `;

    const productInfoContainer = document.querySelector('.product-info') as HTMLDivElement;
    const productQuantity = document.querySelector('.product-info__quantity-wrapper') as HTMLDivElement;

    productInfoContainer.prepend(createRating(product.rating));
    productQuantity.append(createProductQuantity(product.stock));
    productBody.before(createBreadcrumbs(product.title));

    createImageSlider(product.images);
    setProductPrice(product.price, product.discountPercentage);
    setProductAvailability(product.stock);
  }
};

export const productComponent = `
<div class="product__body">
</div>
`;
