export const createBreadcrumbs = (directoryName: string) => {
  const main = <HTMLDivElement>document.querySelector('.main');
  const breadcrumbs = document.createElement('div');
  const template = `
    <div class="breadcrumbs__container">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="/">Home</a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">${directoryName}</a>
        </li>
      </ul>
    </div>
  `;

  breadcrumbs.className = 'breadcrumbs';
  breadcrumbs.innerHTML = template;
  main.prepend(breadcrumbs);
};

export const removeBreadcrumbs = () => {
  const breadcrumbs = document.querySelector('.breadcrumbs') as HTMLDivElement;
  const homeLink = breadcrumbs.querySelectorAll('.breadcrumbs__link')[0] as HTMLAnchorElement;

  homeLink.addEventListener('click', () => {
    breadcrumbs.remove();
  });
};
