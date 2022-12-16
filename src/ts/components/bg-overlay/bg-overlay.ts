export const showOverlay = () => {
  const overlay = document.querySelector('.bg-overlay') as HTMLDivElement;

  overlay.classList.add('active');
  (document.querySelector('.root') as HTMLDivElement).style.overflow = 'hidden';
};

export const hideOverlay = () => {
  const overlay = document.querySelector('.bg-overlay') as HTMLDivElement;

  overlay.classList.remove('active');
  (document.querySelector('.root') as HTMLDivElement).style.overflow = '';
};
