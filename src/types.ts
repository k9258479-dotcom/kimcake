export type Language = 'vi' | 'en' | 'tl';

export interface ThemeCategory {
  id: number;
  name: string;
  name_en: string;
  name_tl?: string;
  count: number;
  slug: string;
}

export interface ThemeItem {
  id: number;
  name: string;
  name_en: string;
  name_tl?: string;
  slug: string;
  category: string;
  category_id: number;
  views: number;
  thumbnail: string;
  thumbnail_full?: string;
  preview_url: string;
  description: string;
  description_en?: string;
  description_tl?: string;
  tags: string[];
  rating: number;
  features: string[];
  theme_type: 'landingpage' | 'storefront';
  dateAdded: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  stock: number;
  badge?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  variant: string;
  comment: string;
  verified: boolean;
  avatar?: string;
  likes: number;
}
