import { ProductItem } from "../types";

export const createCartLayoutTemplate = () => {
  const template = `
    <div class="product-cart">
      <div class="product-cart__info">
        <div class="product-cart__title-area">
          <h2 class="product-cart__title">My cart:</h2>
        </div>
        <ul class="product-cart__product-list"></ul>
      </div>
      <div class="product-cart__checkout"></div>
    </div>
  `;

  return template;
};

export const createCartProductItemTemplate = (options: ProductItem) => {
  const discountPercent = options.discountPercent;

  let priceTemplate = `$${options.price}`;

  if (discountPercent) {
    priceTemplate += `
      <span class="product-cart__product-item-old-price">$${options.oldPrice}</span>
      <span class="product-cart__product-item-discount">-${options.discountPercent}%</span>
    `;
  }

  const template = `
    <div class="product-cart__product-item-info">
      <div class="product-cart__product-item-image" style="background-image: url('${options.image}')"></div>
      <div class="product-cart__product-item-about">
        <div class="product-cart__product-item-rating">${options.rating}</div>
        <a class="product-cart__product-item-title" href="/product-${options.id}">${options.title}</a>
        <p class="product-cart__product-item-price">${priceTemplate}</p>
        <p class="product-cart__product-item-id">SKU: <span>${options.id}</span></p>
        <p class="product-cart__product-item-brand">Brand: <span>${options.brand}</span></p>
        <p class="product-cart__product-item-category">Category: <span>${options.category}</span></p>
      </div>
    </div>
    <div class="product-cart__product-item__qty"></div>
    <p class="product-cart__product-item__price">$178.00</p>
  `;

  return template;
};
