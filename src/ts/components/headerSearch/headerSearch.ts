export function changeSearchButton() {
  const searchFormIcon = document.querySelector('.search-form__icon') as HTMLElement;
  searchFormIcon.addEventListener('click', () => {
    (<HTMLDivElement>document.querySelector('.search-form')).classList.toggle('_active');
  });
}
