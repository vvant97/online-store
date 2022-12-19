import { productData } from '../productData';

type Image = 'list' | 'gallery';

const getImageItems = (id: number, type: Image) => {
  const imagesArray = productData[id - 1].images;
  const alt = productData[id - 1].title;

  const imageElements: HTMLLIElement[] = imagesArray.map((source, index) => {
    const item = document.createElement('li');
    const img = document.createElement('img');

    if (type === 'gallery') {
      item.dataset.itemId = index.toString();
    }

    item.className = `product-slider__${type}-item`;
    img.className = `product-slider__${type}-image`;
    img.src = source;
    img.alt = alt;
    item.append(img);

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
    const galleryItems = Array.from(gallery.children) as HTMLLIElement[];
    
    if (target) {
      const step = item.clientWidth;
      const index = target.dataset.itemId;
      
      if (index) {
        slider.style.transform = `translateX(-${step * +index}px)`;
      }

      galleryItems.forEach((item) => item.classList.remove('active'));
      target.classList.add('active');
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
};
