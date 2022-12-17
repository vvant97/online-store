import { productData } from '../productData';
import { Product } from '../renderCatalog/renderCatalog';

function createProductTempCard(product: Pick<Product, 'id' | 'title' | 'price' | 'images'>): HTMLLIElement {
  const productItem = document.createElement('li');

  productItem.className = 'products__item catalog-grid__product';
  productItem.innerHTML = `
    <a class="products__link" href="./product.html?${product.id}">
    <div class="products__body catalog-grid__body">
      <div class="product__image catalog-grid__image">
        <img src="${product.images[0]}" alt="${product.title}">
      </div>
      <button class="product__buy-button buy-button catalog-grid__buy-button"><span
          class="buy-button__text">Add</span><i class="bi bi-cart2"></i></button>
      <div class="product__info catalog-grid__product-info">
        <p class="product__name catalog-grid__product-name">${product.title}</p>
        <p class="product__price catalog-grid__product-price">$${product.price}</p>
      </div>
    </div>
  </a>
`;
  return productItem;
}

export function createProductPage() {
  const productContainter = document.querySelector('.product__body') as HTMLDivElement;
  const productId = +location.href.split('?')[1] || 0;
  console.log(typeof productId);
  const productItem = productData.find((item) => item.id === productId);
  console.log(productItem);
  if (productItem !== undefined) {
    const CardTemp = createProductTempCard(productItem);
    productContainter.append(CardTemp);
  }
}
