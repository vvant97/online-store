export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  color: string;
  brand: string;
  category: string;
  images: string[];
};

export interface ProductItem {
  image: string;
  title: string;
  id: number;
  price: number;
  discount: number;
  quantity: number;
  priceByOne: number;
  brand: string;
  category: string;
  rating: number;
  oldPrice: number;
  discountPercent: number;
  stock: number;
}

export type filterOptions = {
  categories: string[];
  brands: string[];
  colors: string[];
  prices: string[];
  stock: string[];
  sorting: string;
  search: string;
};
