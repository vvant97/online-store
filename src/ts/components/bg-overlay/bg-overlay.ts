export const showOverlay = ():void => {
  const overlay = document.querySelector('.bg-overlay') as HTMLDivElement;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

export const hideOverlay = (): void => {
  const overlay = document.querySelector('.bg-overlay') as HTMLDivElement;

  overlay.classList.remove('active');
  document.body.style.overflow = '';
};
