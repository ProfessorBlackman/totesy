
import { Product, Review } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'The Legon Flow',
    price: 150,
    category: 'Canvas',
    vibe: 'Heritage',
    image: 'https://images.pexels.com/photos/8148587/pexels-photo-8148587.jpeg',
    description: 'A masterpiece from our Adinkra Collection. This tote carries the spirit of Legon with its flowing lines and traditional patterns.',
    isNew: true,
    rating: 4.8,
    reviewsCount: 124,
    collection: 'Adinkra Collection'
  },
  {
    id: '2',
    name: 'Campus Essential',
    price: 120,
    category: 'Canvas',
    vibe: 'Minimalist',
    image: 'https://images.pexels.com/photos/1214212/pexels-photo-1214212.jpeg',
    description: 'Simple, sturdy, and elegant. The perfect companion for long walks between lecture halls.',
    rating: 4.5,
    reviewsCount: 89,
    collection: 'Basics Collection'
  },
  {
    id: '3',
    name: 'Art Soul',
    price: 144,
    category: 'Canvas',
    vibe: 'Abstract',
    image: 'https://images.unsplash.com/photo-1572196284554-4e321b0e7e0b?q=80&w=1000&auto=format&fit=crop',
    description: 'Designed by Kojo A., this piece captures the vibrant energy of the student artist soul.',
    discount: 20,
    rating: 5.0,
    reviewsCount: 56,
    collection: 'Artist Series: Kojo A.'
  },
  {
    id: '4',
    name: 'Heritage Sack',
    price: 200,
    category: 'Corduroy',
    vibe: 'Heritage',
    image: 'https://images.pexels.com/photos/7735610/pexels-photo-7735610.png',
    description: 'Woven with history. A premium corduroy bag that stands the test of time.',
    rating: 4.9,
    reviewsCount: 42,
    collection: 'Heritage Collection'
  },
  {
    id: '5',
    name: "The 'Legon' Daily",
    price: 85,
    category: 'Canvas',
    vibe: 'Minimalist',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
    description: 'Heavy-duty canvas for heavy books. Built for the daily campus grind.',
    isNew: true,
    rating: 4.8,
    reviewsCount: 156,
    collection: 'Daily Grind'
  },
  {
    id: '6',
    name: 'Vintage Denim',
    price: 105,
    category: 'Denim',
    vibe: 'Custom Art',
    image: 'https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg',
    description: 'Upcycled denim with hand-painted accents. Uniquely yours.',
    isSoldOut: true,
    rating: 4.7,
    reviewsCount: 31,
    collection: 'Upcycle Series'
  }
];

export const reviews: Review[] = [
  {
    id: 'r1',
    userName: 'Ama K.',
    userUniversity: 'University of Ghana',
    rating: 5,
    comment: "Absolutely love this tote! It's so sturdy and fits my laptop perfectly. The print is even more vibrant in person. Best purchase this semester!",
    date: '2 days ago'
  },
  {
    id: 'r2',
    userName: 'Kojo B.',
    userUniversity: 'KNUST',
    rating: 4,
    comment: 'Great bag, very spacious. Delivery to KNUST was super fast, got it on Friday as promised. Only wish it had a smaller pocket for coins.',
    date: '1 week ago'
  }
];
