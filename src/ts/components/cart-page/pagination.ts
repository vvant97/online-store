export function setDefaultProductsLimit() {
  const limit = <HTMLInputElement>document.querySelector('.pagination__limit');
  const products = [...document.querySelectorAll('.product-cart__product-item')] as HTMLLIElement[];
  const productsAmount = products.length;

  if (!products.length) {
    return;
  }

  limit.value = `${productsAmount}`;
}

export function setDefaultProductsPage() {
  return;
}

function getCurrentPage() {
  const currentPageContainer = <HTMLElement>document.querySelector('.pagination__page');
  const estimatedPages = getPagesAmount();
  const currentPage = <string>currentPageContainer.textContent;
  
  if (+currentPage > estimatedPages) {
    return estimatedPages;
  }

  return +currentPage;
}

function getCurrentLimit() {
  const limit = (<HTMLInputElement>document.querySelector('.pagination__limit')).value;

  return +limit;
}

function incrementPageNumber() {
  const currentPageContainer = <HTMLElement>document.querySelector('.pagination__page');
  const currentPage = getCurrentPage();
  const estimatedPages = getPagesAmount();

  currentPageContainer.textContent = `${+currentPage + 1}`;

  if (+currentPageContainer.textContent > estimatedPages) {
    currentPageContainer.textContent = `${estimatedPages}`;
  }
}

function decrementPageNumber() {
  const currentPageContainer = <HTMLElement>document.querySelector('.pagination__page');
  const currentPage = getCurrentPage();

  currentPageContainer.textContent = `${+currentPage - 1}`;

  if (currentPageContainer.textContent === '0') {
    currentPageContainer.textContent = '1';
  }
}

function getPagesAmount() {
  const productsLimit = getCurrentLimit();
  const productsAnount = document.querySelectorAll('.product-cart__product-item').length;
  const estimatedPages = Math.ceil(productsAnount / productsLimit);

  return estimatedPages;
}

export function setCurrentPage() {
  const currentPageContainer = <HTMLElement>document.querySelector('.pagination__page');
  const currentPage = getCurrentPage();

  currentPageContainer.textContent = `${currentPage}`;
}

export function renderProductsList() {
  const products = [...document.querySelectorAll('.product-cart__product-item')] as HTMLLIElement[];
  const currentLimit = getCurrentLimit();
  const currentPage = getCurrentPage();
  const productsStart = +currentLimit * (+currentPage - 1);
  const productsEnd = +currentLimit * +currentPage;

  if (!products.length) {
    return;
  }

  products.forEach((product, index) => {
    const productIndex = index + 1;

    product.style.borderTop = '';
    product.style.paddingBottom = '';
    product.style.display = '';
    product.classList.remove('filtered');

    if (productIndex <= productsStart || productIndex > productsEnd) {
      product.style.display = 'none';
      product.classList.add('filtered');
    }
  });

  const firstProduct = <HTMLLIElement>products
    .filter((product) => !product.classList.contains('filtered'))[0];
  const lastProduct = <HTMLLIElement>products
    .filter((product) => !product.classList.contains('filtered')).at(-1);

  firstProduct.style.borderTop = 'none';
  lastProduct.style.paddingBottom = '0';
}

export function watchPagination() {
  const productsPerPageInput = document.querySelector('.pagination__limit') as HTMLInputElement;
  const paginationControls = document.querySelector('.pagination__controls') as HTMLElement;

  if (!productsPerPageInput) {
    return;
  }

  productsPerPageInput.addEventListener('change', renderProductsList);
  paginationControls.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.matches('.pagination__nav-prev')) {
      decrementPageNumber();
      renderProductsList();
    }

    if (target.matches('.pagination__nav-next')) {
      incrementPageNumber();
      renderProductsList();
    }
  });
}
