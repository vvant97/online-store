export const createBreadcrumbs = (title: string) => {
  const breadcrumbs = document.createElement('div');
  const template = `
    <div class="breadcrumbs__container">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="/">Home</a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">${title}</a>
        </li>
      </ul>
    </div>
  `;

  breadcrumbs.className = 'breadcrumbs';
  breadcrumbs.innerHTML = template;
  return breadcrumbs;
};
