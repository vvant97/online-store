import Storage from '../../storage/Storage';

const limitStorage = new Storage('limit');
const pageStorage = new Storage('page');

function getQueryParam(query: string) {
  let params: string | string[] = location.href.split('?')[1];
  let paramToReplace: string;

  if (params.split('&')) {
    params = params.split('&');

    if (params[0].includes(query)) {
      paramToReplace = params[0];
    } else {
      paramToReplace = params[1];
    }
  } else {
    paramToReplace = params;
  }

  return paramToReplace;
}

function addQuery(query: string, param: string) {
  const queryString = `${query}=${param}`;

  if (!location.href.includes('?')) {
    window.history.pushState({}, '', `${location.href}?${queryString}`);
  } else {
    if (!location.href.includes(query)) {
      window.history.pushState({}, '', `${location.href}&${queryString}`);
    } else {
      const paramToReplace = getQueryParam(query);
      const newQuery = location.href.replace(paramToReplace, queryString);

      window.history.pushState({}, '', newQuery);
    }
  }
}

export function setDefaultProductsLimit() {
  const limit = <HTMLInputElement>document.querySelector('.pagination__limit');
  const products = [...document.querySelectorAll('.product-cart__product-item')] as HTMLLIElement[];
  const productsAmount = products.length;
  const query = <string>limitStorage.load() || undefined;

  if (!products.length) {
    return;
  }

  if (query) {
    addQuery(query.split('=')[0], query.split('=')[1]);

    limit.value = query.split('=')[1];
  } else {
    limit.value = `${productsAmount}`;
  }
}

export function setDefaultProductsPage() {
  const currentPageContainer = <HTMLElement>document.querySelector('.pagination__page');
  const query = <string>pageStorage.load() || undefined;

  if (!currentPageContainer) {
    return;
  }

  if (query) {
    addQuery(query.split('=')[0], query.split('=')[1]);

    currentPageContainer.textContent = query.split('=')[1];
  }
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
  const input = <HTMLInputElement>document.querySelector('.pagination__limit');

  if (!input) {
    return;
  }

  const limit = input.value;

  if (+limit < 1) {
    input.value = '1';

    return 1;
  }

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
  const productsLimit = <number>getCurrentLimit();
  const productsAnount = document.querySelectorAll('.product-cart__product-item').length;
  const estimatedPages = Math.ceil(productsAnount / productsLimit);

  return estimatedPages;
}

export function setCurrentPage() {
  const currentPageContainer = <HTMLElement>document.querySelector('.pagination__page');
  const currentPage = getCurrentPage();

  currentPageContainer.textContent = `${currentPage}`;
  addQuery(`page`, `${currentPage}`);
  pageStorage.save(`page=${currentPage}`);
}

export function renderProductsList() {
  const products = [...document.querySelectorAll('.product-cart__product-item')] as HTMLLIElement[];
  const currentLimit = <number>getCurrentLimit();
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

  productsPerPageInput.addEventListener('change', () => {
    renderProductsList();

    const limit = getCurrentLimit();

    addQuery(`limit`, `${limit}`);
    limitStorage.save(`limit=${limit}`);
  });

  paginationControls.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.matches('.pagination__nav-prev')) {
      decrementPageNumber();
      renderProductsList();
      
      const page = getCurrentPage();
  
      addQuery(`page`, `${page}`);
      pageStorage.save(`page=${page}`);
    }

    if (target.matches('.pagination__nav-next')) {
      incrementPageNumber();
      renderProductsList();

      const page = getCurrentPage();
  
      addQuery(`page`, `${page}`);
      pageStorage.save(`page=${page}`);
    }
  });
}
