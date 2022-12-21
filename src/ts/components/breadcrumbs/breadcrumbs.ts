export const createBreadcrumbs = (directoryName: string) => {
  const breadcrumbsContainer = <HTMLDivElement>document.querySelector('.breadcrumbs');
  const template = `
    <div class="breadcrumbs__container">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="./index.html">Home</a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">${directoryName}</a>
        </li>
      </ul>
    </div>
  `;

  breadcrumbsContainer.innerHTML = template;
};
