import { Product } from '../types';

export const catalogComponent = `
      <section class="main__products products">
          <h2 class="products__title visually-hidden">Catalog</h2>

          <div class="products__top">
            <div class="products__filter">
              <button class="filter__button filter-button" type="button">
                <i class="bi bi-funnel"></i>
                <span class="filter__button-text">Filter</span>
              </button>
            </div>

            <div class="products__view">
              <button type="button" class="products__view-mode grid-view view-mode-active" data-grid-view="3"><i
                  class="bi bi-grid-3x3-gap"></i></button>
              <button type="button" class="products__view-mode list-view" data-grid-view="1"><i
                  class="bi bi-list-ul"></i></button>
            </div>

            <div class="products__sort">
              <p class="products__found found-products">Found:<span class="found-products__count">5</span></p>
              <label class="products__sort-label" for="SortBy">Sort by:</label>
              <select class="products__sort-select" name="sortby" id="SortBy">
                <option selected value="manual">Featured</option>
                <option value="best-selling">Best Selling</option>
                <option value="title-ascending">Alphabetically, A-Z</option>
                <option value="title-descending">Alphabetically, Z-A</option>
                <option value="price-ascending">Price, low to high</option>
                <option value="price-descending">Price, high to low</option>
                <option value="created-descending">Date, new to old</option>
                <option value="created-ascending">Date, old to new</option>
              </select>
            </div>
          </div>

          <div class="products__body"></div>

      </section>

      <div class="filter">
          <i class="filter__close bi bi-x-lg"></i>
          <ul class="filter__list">
            <li class="filter__item">
              <div class="filter__title">Filter</div>
            </li>
            <li class="filter__item">
              <div class="filter__title">Availability</div>
            </li>
            <li class="filter__item">
              <div class="filter__title">Brand</div>
            </li>
            <li class="filter__item">
              <div class="filter__title">Category</div>
            </li>
            <li class="filter__item">
              <div class="filter__title">Price</div>
            </li>
          </ul>
        </div>
`;

export function createProductGridCard(
  product: Pick<Product, 'id' | 'title' | 'price' | 'discountPercentage' | 'images'>,
): HTMLLIElement {
  const productItem = document.createElement('li');
  productItem.className = 'products__item catalog-grid__product';

  productItem.innerHTML = `
    <a class="products__link" href="/product-${product.id}">
    <div class="products__body catalog-grid__body">
      <div class="product__image catalog-grid__image">
        <img src="${product.images[0]}" alt="${product.title}">
      </div>
      <div class="product__info catalog-grid__product-info">
      <p class="product__name catalog-grid__product-name">${product.title}</p>
      <div class="product__price catalog-grid__product-price">
      <span class='product-info__actual-price actual-price'>$${
        product.discountPercentage
          ? (product.price - product.price * (Math.round(product.discountPercentage) / 100)).toFixed(2)
          : product.price.toFixed(2)
      }</span>
      <span class='product-info__old-price old-price'>${
        product.discountPercentage ? '$' + product.price.toFixed(2) : ''
      }</span>
      </div>
      </div>
    </div>
    </a>
    <button class="product__buy-button buy-button catalog-grid__buy-button"><span
    class="buy-button__text">Add</span><i class="bi bi-cart2"></i></button>
`;
  return productItem;
}

function createProductListCard(
  product: Pick<Product, 'id' | 'title' | 'price' | 'discountPercentage' | 'images' | 'description'>,
): HTMLLIElement {
  const productItem = document.createElement('li');
  productItem.className = 'products__item catalog-list__product';

  productItem.innerHTML = `
    <a class="products__link" href="/product-${product.id}">
      <div class="products__body catalog-list__body">
        <div class="product__image catalog-list__image">
          <img src="${product.images[0]}" alt="${product.title}">
        </div>
        <div class="product__info catalog-list__product-info">
        <p class="product__name catalog-list__product-name">${product.title}</p>
        <div class="product__price catalog-list__product-price">
        <span class='product-info__actual-price actual-price'>$${
          product.discountPercentage
            ? (product.price - product.price * (Math.round(product.discountPercentage) / 100)).toFixed(2)
            : product.price.toFixed(2)
        }</span>
        <span class='product-info__old-price old-price'>${
          product.discountPercentage ? '$' + product.price.toFixed(2) : ''
        }</span>
        </div>
        <p class="product__price catalog-list__product-description">${product.description.slice(0, 200) + '...'}</p>
        </div>
        </div>
    </a>
    <button class="product__buy-button buy-button catalog-list__buy-button"><span
      class="buy-button__text">Add</span><i class="bi bi-cart2"></i></button>
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
