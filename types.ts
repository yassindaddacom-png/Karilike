
export enum PropertyType {
  APARTMENT = 'Apartment',
  HOUSE = 'House',
  ROOM = 'Shared Room',
  STUDIO = 'Studio'
}

export type UserRole = 'owner' | 'renter';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  password?: string;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  type: PropertyType;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  amenities: string[];
  images: string[];
  ownerName: string;
  ownerContact: string;
  ownerId?: string;
  ownerRating?: number;
  ownerReviewCount?: number;
  isFeatured?: boolean;
}

export interface SearchFilters {
  query: string;
  minPrice?: number;
  maxPrice?: number;
  type?: PropertyType;
}
