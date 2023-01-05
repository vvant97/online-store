import { sortingOptions } from '../ts/components/sort/sort';
import { Product } from '../ts/components/types';

describe('#Sort function', () => {
  const products = [
    {
      id: 1,
      title: 'Lenovo IdeaPad L3',
      description: `The Lenovo IdeaPad L3 has everything you need from a laptop for everyday use. However, models with more RAM and high-performance Intel® processors are also available. These are ideal devices for those who need something more than just access to the Internet. An FHD display, stereo speakers and a long battery life let you enjoy your favorite movies and TV series wherever you are. At work, at school and at home, the IdeaPad L3 has a place everywhere.
                Opt for a model with a 10th Gen Intel® Core™ processor and up to 16GB of RAM and a world of new possibilities will open up before you: use demanding applications for photo and video editing, play the latest games and perform many other tasks.
               The Dolby Audio™-enabled speaker system and narrow bezel FHD display are purpose-built to bring your favorite videos to life, immersed in rich colors and surround sound.
               Wherever you go, the IdeaPad L3 is your go-to laptop with up to 11 hours of battery life. And if you do need to recharge, Rapid Charge technology allows you to replenish up to 80% of the charge in less than an hour, and you can immediately return to your activities.`,
      price: 930.85,
      discountPrice: 809.84,
      discountPercentage: 12.96,
      rating: 4.75,
      stock: 72,
      color: 'silver',
      brand: 'Lenovo',
      category: 'laptop',
      images: [
        '../../assets/img/71742465351-l.jpg',
        '../../assets/img/71742465352-l.jpg',
        '../../assets/img/71742465353-l.jpg',
        '../../assets/img/71742465354-l.jpg',
      ],
    },
    {
      id: 2,
      title: 'IPhone 9',
      description: `The design of IPhone 9 64GB will repeat the "eighth" version, but the classic body will be thicker to accommodate a larger battery. The round Home button will return, where Touch ID (fingerprint scanner) is located. Most likely, the rear panel of the device will be matte, it will house a mid-range single camera.
      IPhone 9 will appeal to connoisseurs of flagship devices with moderate dimensions and small monitor.
      Part of the internal filling will be taken from last year's top "eleventh" series. The productivity of the 6-core processor of the new generation A13 Bionic will allow the gadget to execute commands and tasks faster by 20%. Its production is based on the 7nm process technology with the 3rd generation Neural Engine system.
      The product with 64 GB of internal memory will be equipped with 3 GB of RAM and a graphics coprocessor of its own brand design. The IPhone 9 runs on the proprietary operating system iOS 13.`,
      price: 256,
      discountPrice: 240.64,
      discountPercentage: 5.7,
      rating: 4.69,
      stock: 94,
      color: 'white',
      brand: 'Apple',
      category: 'smartphone',
      images: [
        '../../assets/img/71742465251-l.jpg',
        '../../assets/img/71742465252-l.jpg',
        '../../assets/img/71742465253-l.jpg',
        '../../assets/img/71742465254-l.jpg',
      ],
    },
    {
      id: 5,
      title: 'Oppo A53',
      description: `The lightweight and ultra-thin Oppo A53 is designed to fit comfortably in one hand. And its design, inspired by the shining translucent reflection of ocean waves, makes the look of the smartphone not only elegant, but also attractive.
      Get the most out of everything you do with a screen with a high refresh rate of 90Hz. It not only occupies almost 90% of the entire surface of the front panel, but also provides more comfortable and smooth operation. Watch videos, play games and keep up with the latest trends, enjoying every touch of the display.
      A large capacity 5000 mAh battery combined with support for high-speed 18-watt charging will allow you to focus on your business instead of searching for an outlet. In addition, the phone has an advanced power saving mode, which helps to extend the time of its operation, so that you can stay connected no matter what.
      Thanks to the efficient Qualcomm Snapdragon processor, you can calmly communicate via video call, watch movies and do many other things. No annoying waiting or hangs. What's more, the use of fast LPDDR4x RAM and UFS2.1 type storage further reduces the lag time when launching applications and opening files.`,
      price: 201,
      discountPrice: 201.0,
      discountPercentage: 0,
      rating: 4.3,
      stock: 123,
      color: 'blue',
      brand: 'Oppo',
      category: 'smartphone',
      images: [
        '../../assets/img/96865477511-l.jpg',
        '../../assets/img/96865477512-l.jpg',
        '../../assets/img/96865477513-l.jpg',
        '../../assets/img/96865477514-l.jpg',
      ],
    },
    {
      id: 6,
      title: 'Huawei Matebook X Pro',
      description: `Huawei MateBook X Pro is equipped with a sensitive touch screen on which you can perform scrolling, zooming and pressing gestures for even more convenient and intuitive control. Now the touchscreen allows you to take a screenshot in an instant: just swipe the screen with three fingers.
        A professional laptop that does not take up much space in your bag. The elegant diamond-cut and sandblasted metal body is about 14.6mm thick and weighs just 1.33kg. Carry MateBook X Rgo with you always and everywhere.
        Huawei MateBook X Pro is an improved Intel Core i7 processor of the 10th generation, a discrete NVIDIA GeForce MX250 video card, 16 GB of RAM and 1 TB of SSD storage. The power of the laptop is enough to perform all the tasks you need. Thanks to the powerful hardware, Huawei MateBook X Pro supports multitasking, fast image processing and smooth frame changes in games. The updated high-speed Wi-Fi module and the Bluetooth 5.0 standard guarantee a smooth connection.`,
      price: 1075,
      discountPrice: 956.75,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: 32,
      color: 'green',
      brand: 'Huawei',
      category: 'laptop',
      images: [
        '../../assets/img/97875477511-l.jpg',
        '../../assets/img/97875477512-l.jpg',
        '../../assets/img/97875477513-l.jpg',
        '../../assets/img/97875477514-l.jpg',
      ],
    },
    {
      id: 12,
      title: 'Realme 9 Pro+',
      description:
        'The Realme 9 Pro+ smartphone has 3 main cameras: 50 + 8 + 4 megapixels that allow you to shoot 4K video, take excellent portraits with bokeh effect, panoramic shots and photos of distant objects, slow motion at 960 fps. The 16 MP front camera makes it possible to take great selfies. The Super AMOLED display with a resolution of 2400x1080 will amaze you with bright, rich and deep blacks. A capacious 4500 mAh battery is enough for a long battery life. The supplied 60W power adapter will help you quickly replenish the charge. An in-display fingerprint scanner and software face unlock protect your data if your device is lost. An NFC module is provided for contactless payment.',
      price: 368,
      discountPrice: 368.0,
      discountPercentage: 0,
      rating: 4.58,
      stock: 5,
      color: 'black',
      brand: 'Realme',
      category: 'smartphone',
      images: [
        '../../assets/img/71114058551-l.jpg',
        '../../assets/img/71114058553-l.jpg',
        '../../assets/img/71114058554-l.jpg',
        '../../assets/img/71114058555-l.jpg',
      ],
    },
  ];

  beforeEach(() => {
    jest.resetModules();
  });

  it('Test sorting products by rating, top to bottom', () => {
    const sorted = products.sort((a: Product, b: Product) => b.rating - a.rating);

    expect(sortingOptions('featured', products)).toEqual(sorted);
  });

  it('Test sorting products by title, A-Z', () => {
    const sorted = products.sort((a: Product, b: Product) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      return 0;
    });

    expect(sortingOptions('title-ascending', products)).toEqual(sorted);
  });

  it('Test sorting product by title, Z-A', () => {
    const sorted = products.sort((a: Product, b: Product) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
      if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
      return 0;
    });

    expect(sortingOptions('title-descending', products)).toEqual(sorted);
  });

  it('Test sorting products by price, low to high', () => {
    const sorted = products.sort((a: Product, b: Product) => a.discountPrice - b.discountPrice);

    expect(sortingOptions('price-ascending', products)).toEqual(sorted);
  });

  it('Test sorting products by price, high to low', () => {
    const sorted = products.sort((a: Product, b: Product) => b.discountPrice - a.discountPrice);

    expect(sortingOptions('price-descending', products)).toEqual(sorted);
  });
});
