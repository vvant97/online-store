import { showOverlay } from '../bg-overlay/bg-overlay';

type Image = 'list' | 'gallery';

const getImageItems = (imagesArray: string[], type: Image) => {
  const imageElements: HTMLLIElement[] = imagesArray.map((source, index) => {
    const item = document.createElement('li');

    item.className = `product-slider__${type}-item`;
    item.style.backgroundImage = `url("${source}")`;
    item.style.backgroundRepeat = 'no-repeat';
    item.style.backgroundSize = '85%';
    item.style.backgroundPosition = '50%';

    if (type === 'gallery') {
      item.dataset.itemId = index.toString();

      if (index === 0) {
        item.classList.add('active');
      }
    }

    return item;
  });

  return imageElements.slice(0, 4);
};

const openFullImage = () => {
  const openButton = document.querySelector('.product-slider__full-image') as HTMLDivElement;

  openButton.addEventListener('click', () => {
    const activeItem = document.querySelector('.product-slider__gallery-item.active') as HTMLLIElement;
    const url = activeItem.style.backgroundImage.slice(5, -2);
    const image = document.createElement('img');

    image.src = url;
    image.className = 'product-full-image';

    showOverlay();

    const overlay = document.querySelector('.bg-overlay') as HTMLDivElement;

    overlay.classList.add('image');
    overlay.append(image);
  });
};

const removeFullImage = () => {
  const overlay = document.querySelector('.bg-overlay') as HTMLDivElement;

  overlay.addEventListener('click', (event: Event) => {
    if (event.target === event.currentTarget) {
      const children = Array.from((<HTMLDivElement>event.currentTarget).children);

      children.forEach((child) => {
        if (child.className === 'product-full-image') {
          child.remove();
        }
      });
    }
  });
};

const resizeCurrentImage = () => {
  const slider = document.querySelector('.product-slider__list-wrapper') as HTMLDialogElement;

  slider.addEventListener('mousemove', (event: Event) => {
    const target = <HTMLLIElement>event.target;
    const percentX = target.clientWidth / 100;
    const percentY = target.clientHeight / 100;
    const coordX = (<MouseEvent>event).offsetX / percentX;
    const coordY = (<MouseEvent>event).offsetY / percentY;

    target.style.backgroundSize = '200%';
    target.style.backgroundPosition = `${coordX}% ${coordY}%`;
  });

  slider.addEventListener('mouseout', () => {
    const sliderItems = Array.from(document.querySelectorAll('.product-slider__list-item')) as HTMLLIElement[];

    sliderItems.forEach((item) => {
      item.style.backgroundSize = '85%';
      item.style.backgroundPosition = '50%';
    });
  });
};

const handleSliderMovement = () => {
  const slider = document.querySelector('.product-slider__list') as HTMLUListElement;
  const gallery = document.querySelector('.product-slider__gallery') as HTMLUListElement;
  const item = slider.firstElementChild as HTMLLIElement;

  gallery.addEventListener('click', (event: Event) => {
    const target = (<HTMLElement>event.target).closest('.product-slider__gallery-item') as HTMLElement;
    const galleryItems = Array.from(
      (<HTMLUListElement>event.currentTarget).querySelectorAll('.product-slider__gallery-item'),
    );

    if (target) {
      const step = item.clientWidth;
      const index = <string>target.dataset.itemId;

      slider.style.transform = `translateX(-${step * +index}px)`;
      galleryItems.forEach((item) => item.classList.remove('active'));
      target.classList.add('active');
    }
  });
};

const handleSliderControlsEvents = () => {
  const gallery = document.querySelector('.product-slider__gallery') as HTMLUListElement;

  gallery.addEventListener('click', (event: Event) => {
    const target =
      (<HTMLElement>event.target).matches('.product-slider__gallery-icon-next') ||
      (<HTMLElement>event.target).matches('.product-slider__gallery-icon-prev');
    const galleryItems = Array.from(
      (<HTMLUListElement>event.currentTarget).querySelectorAll('.product-slider__gallery-item'),
    );
    const activeSlide = galleryItems.find((slide) => slide.classList.contains('active')) as HTMLLIElement;

    let nextSlide = activeSlide.nextElementSibling as HTMLLIElement;

    if ((<HTMLElement>event.target).matches('.product-slider__gallery-icon-next')) {
      if (galleryItems.indexOf(activeSlide) === galleryItems.length - 1) {
        nextSlide = galleryItems[0] as HTMLLIElement;
      }
    } else if ((<HTMLElement>event.target).matches('.product-slider__gallery-icon-prev')) {
      if (galleryItems.indexOf(activeSlide) === 0) {
        nextSlide = galleryItems.at(-1) as HTMLLIElement;
      } else {
        nextSlide = activeSlide.previousElementSibling as HTMLLIElement;
      }
    }

    if (target) {
      const index = <string>nextSlide.dataset.itemId;
      const slider = document.querySelector('.product-slider__list') as HTMLUListElement;
      const item = slider.firstElementChild as HTMLLIElement;
      const step = item.clientWidth;

      activeSlide.classList.remove('active');
      nextSlide.classList.add('active');
      slider.style.transform = `translateX(-${step * +index}px)`;
    }
  });
};

export const createImageSlider = (images: string[]) => {
  const slider = document.querySelector('.product-slider__list') as HTMLUListElement;
  const gallery = document.querySelector('.product-slider__gallery') as HTMLUListElement;

  slider.append(...getImageItems(images, 'list'));
  gallery.append(...getImageItems(images, 'gallery'));

  handleSliderMovement();
  handleSliderControlsEvents();
  resizeCurrentImage();
  openFullImage();
  removeFullImage();
};
