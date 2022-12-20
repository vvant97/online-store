import { productData } from '../productData';

type Image = 'list' | 'gallery';

const getImageItems = (id: number, type: Image) => {
  const imagesArray = productData[id - 1].images;
  const alt = productData[id - 1].title;

  const imageElements: HTMLLIElement[] = imagesArray.map((source, index) => {
    const item = document.createElement('li');
    const img = document.createElement('img');

    item.className = `product-slider__${type}-item`;
    img.className = `product-slider__${type}-image`;
    img.src = source;
    img.alt = alt;
    item.append(img);

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

export const createImageSlider = (id: number) => {
  if (!productData[id]) {
    throw new Error('There is no data!');
  }

  const slider = document.querySelector('.product-slider__list') as HTMLUListElement;
  const gallery = document.querySelector('.product-slider__gallery') as HTMLUListElement;

  slider.append(...getImageItems(id, 'list'));
  gallery.append(...getImageItems(id, 'gallery'));

  handleSliderMovement();
  handleSliderControlsEvents();
};
