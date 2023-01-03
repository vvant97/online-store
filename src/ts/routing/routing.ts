import { errorComponent } from '../components/404/404';
import { renderFilterButtons, renderFilters } from '../components/filter/filter';
import { createProductCard, productComponent } from '../components/product-card/product-card';
import { productData } from '../components/productData';
import { catalogComponent, controlCatalogView } from '../components/renderCatalog/renderCatalog';
import { decodeQueryString } from './queryString';

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
    window.history.pushState({}, pathname, window.location.origin + pathname + window.location.search);

    if (pathname.slice(1, 8) == 'product') {
      document.title = 'Product';
      content.innerHTML = routes['/product'];
      const productId = +pathname.split('-')[1];
      createProductCard(productId);
      window.history.replaceState({}, pathname, window.location.origin + pathname);
    } else {
      switch (pathname) {
        case '/':
          document.title = 'Elyte';
          content.innerHTML = routes[pathname];
          controlCatalogView(productData);
          renderFilters(productData);
          renderFilterButtons(productData);
          decodeQueryString(productData);
          break;
        case '/cart':
          document.title = 'Cart';
          content.innerHTML = routes[pathname];
          window.history.replaceState({}, pathname, window.location.origin + pathname);
          break;
        default:
          document.title = 'Error 404';
          content.innerHTML = routes['404'];
          window.history.replaceState({}, pathname, window.location.origin + pathname);
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
      } else {
        loaderComponents(href);
      }
    });
  });

  window.addEventListener('popstate', () => {
    loaderComponents(window.location.pathname);
  });
}
