export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors: string[];
  sizes?: string[];
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  ageRange: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}