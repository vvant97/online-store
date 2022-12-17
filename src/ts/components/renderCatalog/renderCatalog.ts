export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export function createProductGridCard(product: Pick<Product, 'id' | 'title' | 'price' | 'images'>): HTMLLIElement {
  const productItem = document.createElement('li');

  productItem.className = 'products__item catalog-grid__product';
  productItem.id = 'product-item';
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

export function renderCatalog(dataList: Product[] | null) {
  const catalogContainer = document.querySelector('.products__body') as HTMLDivElement;
  const catalogGridUl = document.querySelector('.catalog-grid') as HTMLUListElement;
  if (dataList) {
    const productList = [...dataList];
    // catalogContainer.textContent = '';
    catalogGridUl.textContent = '';
    const listCards = productList.map(createProductGridCard);
    catalogGridUl.append(...listCards);
  } else {
    catalogContainer.textContent = '';
    const message = document.createElement('p') as HTMLParagraphElement;
    message.innerText = "Sorry, there're no products found";
    catalogContainer.append(message);
  }
}
