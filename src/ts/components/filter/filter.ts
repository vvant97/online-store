import { showOverlay, hideOverlay } from '../bg-overlay/bg-overlay';

export const showFilter = () => {
  const filter = document.querySelector('.filter') as HTMLDivElement;
  const filterButton = document.querySelector('.filter-open') as HTMLButtonElement;

  filterButton.addEventListener('click', () => {
    filter.classList.add('active');

    showOverlay();
  });
};

export const hideFilter = () => {
  const filter = document.querySelector('.filter') as HTMLDivElement;

  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.className.includes('filter__close') || target.className.includes('bg-overlay')) {
      filter.classList.remove('active');

      hideOverlay();
    }
  });
};
