
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Canvas' | 'Denim' | 'Corduroy' | 'Custom';
  vibe: 'Abstract' | 'Heritage' | 'Minimalist' | 'Custom Art';
  image: string;
  description: string;
  isNew?: boolean;
  isSoldOut?: boolean;
  isBestSeller?: boolean;
  discount?: number;
  rating: number;
  reviewsCount: number;
  collection: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Review {
  id: string;
  userName: string;
  userUniversity: string;
  rating: number;
  comment: string;
  date: string;
}
