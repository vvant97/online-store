import { errorComponent } from '../components/404/404';
import { renderFilters } from '../components/filter/filter';
import { createProductCard, productComponent } from '../components/product-card/product-card';
import { productData } from '../components/productData';
import { catalogComponent, renderCatalog } from '../components/renderCatalog/renderCatalog';

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
    window.history.pushState({}, pathname, window.location.origin + pathname);
    if (pathname.slice(1, 8) == 'product') {
      document.title = 'Product';
      content.innerHTML = routes['/product'];
      const productId = +pathname.split('-')[1];
      createProductCard(productId);
      window.addEventListener('popstate', () => {
        loaderComponents('/');
      });
    } else {
      switch (pathname) {
        case '/':
          document.title = 'Elyte';
          content.innerHTML = routes[pathname];
          renderCatalog(productData);
          renderFilters(productData);
          break;
        case '/cart':
          document.title = 'Cart';
          content.innerHTML = routes[pathname];
          break;
        default:
          document.title = 'Error 404';
          content.innerHTML = routes['404'];
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
