type Star = 'star' | 'star-fill' | 'star-half';

interface StarInfo {
  amount: number;
  type: Star;
}

const createRatingStars = ({ amount, type }: StarInfo) => {
  const stars: HTMLElement[] = [];

  for (let i = 0; i < amount; i++) {
    const star = document.createElement('i');

    star.className = `rating__star bi bi-${type}`;
    stars.push(star);
  }

  return stars;
};

export const createRating = (productRating: number) => {
  const maxRating = 5;

  if (productRating < 0 || productRating > maxRating) {
    throw new Error('Incorrect rating');
  }

  const rating = document.createElement('div');
  const container = document.createElement('div');
  const average = document.createElement('span');
  const fullRating = Math.floor(productRating);
  const halfRating = productRating - fullRating;
  const emptyRating = Math.floor(5 - productRating);

  if (fullRating) {
    container.append(...createRatingStars({ amount: fullRating, type: 'star-fill' }));
  }
  if (halfRating) {
    if (halfRating >= 0.5) {
      container.append(...createRatingStars({ amount: 1, type: 'star-half' }));
    } else {
      container.append(...createRatingStars({ amount: 1, type: 'star' }));
    }
  }
  if (emptyRating) {
    container.append(...createRatingStars({ amount: emptyRating, type: 'star' }));
  }

  average.className = 'rating__average';
  average.textContent = `(${productRating})`;
  rating.className = 'rating';
  container.className = 'rating__container';
  rating.append(container, average);

  return rating;
};
