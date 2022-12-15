export const showOverlay = () => {
  const overlay = document.querySelector('.bg-overlay') as HTMLDivElement;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

export const hideOverlay = () => {
  const overlay = document.querySelector('.bg-overlay') as HTMLDivElement;

  overlay.classList.remove('active');
  document.body.style.overflow = '';
};
