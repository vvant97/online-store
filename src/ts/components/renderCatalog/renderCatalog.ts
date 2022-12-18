import { Product } from '../types';

export function createProductGridCard(product: Pick<Product, 'id' | 'title' | 'price' | 'images'>): HTMLLIElement {
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

function createProductListCard(
  product: Pick<Product, 'id' | 'title' | 'price' | 'images' | 'description'>,
): HTMLLIElement {
  const productItem = document.createElement('li');
  productItem.className = 'products__item catalog-list__product';

  productItem.innerHTML = `
    <a class="products__link" href="./product.html?${product.id}">
      <div class="products__body catalog-list__body">
        <div class="product__image catalog-list__image">
          <img src="${product.images[0]}" alt="${product.title}">
        </div>
        <div class="product__info catalog-list__product-info">
        <p class="product__name catalog-list__product-name">${product.title}</p>
        <p class="product__price catalog-list__product-price">$${product.price}</p>
        <button class="product__buy-button buy-button catalog-list__buy-button"><span
            class="buy-button__text">Add</span><i class="bi bi-cart2"></i></button>
        <p class="product__price catalog-list__product-description">${product.description}</p>
        </div>
      </div>
    </a>
`;
  return productItem;
}

export function renderCatalog(dataList: Product[] | null) {
  const catalogContainer = document.querySelector('.products__body') as HTMLDivElement;
  const gridViewButton = document.querySelector('.grid-view') as HTMLButtonElement;
  const listViewButton = document.querySelector('.list-view') as HTMLButtonElement;
  gridViewButton.addEventListener('click', () => {
    if (listViewButton.classList.contains('view-mode-active')) {
      listViewButton.classList.remove('view-mode-active');
      gridViewButton.classList.add('view-mode-active');
      renderCatalog(dataList);
    }
  });
  listViewButton.addEventListener('click', () => {
    if (gridViewButton.classList.contains('view-mode-active')) {
      gridViewButton.classList.remove('view-mode-active');
      listViewButton.classList.add('view-mode-active');
      renderCatalog(dataList);
    }
  });

  if (gridViewButton.classList.contains('view-mode-active') && dataList) {
    const catalogGridUl = document.createElement('ul');
    catalogGridUl.className = 'products__catalog catalog-grid';
    catalogContainer.textContent = '';
    const productList = [...dataList];
    const listCards = productList.map(createProductGridCard);
    catalogGridUl.append(...listCards);
    catalogContainer.append(catalogGridUl);
  } else if (listViewButton.classList.contains('view-mode-active') && dataList) {
    const catalogListUl = document.createElement('ul');
    catalogListUl.className = 'products__catalog catalog-list';
    catalogContainer.textContent = '';
    const productList = [...dataList];
    const listCards = productList.map(createProductListCard);
    catalogListUl.append(...listCards);
    catalogContainer.append(catalogListUl);
  } else {
    catalogContainer.textContent = '';
    const message = document.createElement('p') as HTMLParagraphElement;
    message.innerText = "Sorry, there're no products found";
    catalogContainer.append(message);
  }
}
