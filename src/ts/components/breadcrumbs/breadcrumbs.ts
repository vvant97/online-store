export const createBreadcrumbs = (title: string, category: string, brand: string) => {
  const breadcrumbs = document.createElement('div');
  const template = `
    <div class="breadcrumbs__container">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="/">Home</a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="/?category=${category}">${
    category[0].toUpperCase() + category.slice(1)
  }</a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="/?brand=${brand.toLowerCase()}">${brand}</a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" style="pointer-events: none">${title}</a>
        </li>
      </ul>
    </div>
  `;

  breadcrumbs.className = 'breadcrumbs';
  breadcrumbs.innerHTML = template;
  return breadcrumbs;
};
