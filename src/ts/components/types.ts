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
  image: string,
  title: string;
  id: number;
  price: number;
  discount: number;
  quantity: number;
}
