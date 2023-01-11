import { errorComponent } from '../components/404/404';
import { renderFilters } from '../components/filter/filter';
import { searchItems } from '../components/headerSearch/headerSearch';
import { createProductCard, productComponent } from '../components/product-card/product-card';
import { productData } from '../components/productData';
import { catalogComponent, controlCatalogView } from '../components/renderCatalog/renderCatalog';
import { sortItems } from '../components/sort/sort';

export function routing() {
  const content = document.querySelector('#app') as HTMLDivElement;

  type Routes = {
    [route: string]: string;
  };

  const routes: Routes = {
    '/': catalogComponent,
    '/product': productComponent,
    '/cart': 'This is cart page',
    '404': errorComponent,
  };

  const loaderComponents = (pathname: string) => {
    if (pathname.slice(1, 8) == 'product') {
      document.title = 'Product';
      content.innerHTML = routes['/product'];
      const productId = +pathname.split('-')[1];
      createProductCard(productId);
      window.history.pushState({}, pathname, pathname);
    } else {
      switch (pathname) {
        case '/':
          document.title = 'Elyte';
          content.innerHTML = routes[pathname];
          controlCatalogView(productData);
          renderFilters(productData);
          sortItems(productData);
          searchItems(productData);
          window.history.pushState({}, pathname, pathname + window.location.search);
          break;
        case '/cart':
          document.title = 'Cart';
          content.innerHTML = routes[pathname];
          window.history.pushState({}, pathname, pathname);
          window.addEventListener('popstate', () => {
            loaderComponents('/');
            window.history.pushState({}, '/', '/');
          });
          break;
        default:
          document.title = 'Error 404';
          content.innerHTML = routes['404'];
          window.history.pushState({}, pathname, pathname);
      }
    }
  };

  content.innerHTML = routes[window.location.pathname];
  loaderComponents(document.location.pathname);

  const allLinks = document.querySelectorAll('a');
  allLinks.forEach((link) => {
    if (link.classList.contains('footer-link')) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (!href) {
        loaderComponents('/');
        const params = new URLSearchParams(location.search);
        if (params.toString().length) location.reload();
      } else if (href === '/') {
        loaderComponents(href);
        window.history.pushState({}, '/', '/');
      } else {
        loaderComponents(href);
        const params = new URLSearchParams(location.search);
        if (params.toString().length) location.reload();
      }
    });
  });

  window.addEventListener('popstate', () => {
    loaderComponents(window.location.pathname);
  });
}
