
import { Property, PropertyType } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Sunny Studio near University',
    price: 3500,
    type: PropertyType.STUDIO,
    location: 'Madinat Al Irfane, Rabat',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 450,
    description: 'Perfect for students! A bright, fully furnished studio apartment just a 5-minute walk from campus. Includes high-speed internet and study desk.',
    amenities: ['Furnished', 'WiFi', 'Near Transit', 'Laundry in Building'],
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=101',
      'https://picsum.photos/800/600?random=102'
    ],
    ownerName: 'Sarah Jenkins',
    ownerContact: 'sarah.j@email.com',
    ownerRating: 4.8,
    ownerReviewCount: 24,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Modern 2BHK near Casanearshore',
    price: 6500,
    type: PropertyType.APARTMENT,
    location: 'Sidi Maarouf, Casablanca',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    description: 'Luxury living for professionals. This modern apartment features a gym, pool access, and is located right in the heart of the tech corridor.',
    amenities: ['Gym', 'Pool', 'Parking', 'AC', 'Dishwasher'],
    images: [
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=201'
    ],
    ownerName: 'David Chen',
    ownerContact: 'david.c@email.com',
    ownerRating: 4.5,
    ownerReviewCount: 12,
    isFeatured: true
  },
  {
    id: '3',
    title: 'Cozy Shared Room in Medina',
    price: 1500,
    type: PropertyType.ROOM,
    location: 'Medina, Fez',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 200,
    description: 'Affordable shared living in a beautiful renovated heritage house. Huge backyard and shared kitchen. Great community vibe.',
    amenities: ['Garden', 'Shared Kitchen', 'Pets Allowed', 'Utilities Included'],
    images: ['https://picsum.photos/800/600?random=3'],
    ownerName: 'Martha Stewart',
    ownerContact: 'martha.s@email.com',
    ownerRating: 4.9,
    ownerReviewCount: 56
  },
  {
    id: '4',
    title: 'Spacious Family House',
    price: 12000,
    type: PropertyType.HOUSE,
    location: 'Hay Riad, Rabat',
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2200,
    description: 'A wonderful home for a family. Quiet neighborhood, excellent schools nearby, and a private garage. Freshly painted.',
    amenities: ['Garage', 'Private Garden', 'Fireplace', 'Pet Friendly'],
    images: [
      'https://picsum.photos/800/600?random=4',
      'https://picsum.photos/800/600?random=401',
      'https://picsum.photos/800/600?random=402',
      'https://picsum.photos/800/600?random=403'
    ],
    ownerName: 'Robert Wilson',
    ownerContact: 'rob.w@email.com',
    ownerRating: 4.2,
    ownerReviewCount: 8
  },
  {
    id: '5',
    title: 'Artistic Loft',
    price: 8000,
    type: PropertyType.APARTMENT,
    location: 'Gueliz, Marrakech',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 950,
    description: 'High ceilings, exposed brick, and huge windows. This loft is perfect for artists or creative professionals working from home.',
    amenities: ['Elevator', 'Security', 'Smart Home', 'Balcony'],
    images: ['https://picsum.photos/800/600?random=5'],
    ownerName: 'Elena Rodriguez',
    ownerContact: 'elena.r@email.com',
    ownerRating: 5.0,
    ownerReviewCount: 5
  },
  {
    id: '6',
    title: 'Budget Friendly Student Room',
    price: 1200,
    type: PropertyType.ROOM,
    location: 'Martil, Tetouan',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 150,
    description: 'Basic but comfortable room in a shared student house. Includes weekly cleaning of common areas.',
    amenities: ['WiFi', 'Cleaning Service', 'Bicycle Parking'],
    images: ['https://picsum.photos/800/600?random=6'],
    ownerName: 'Tom Baker',
    ownerContact: 'tom.b@email.com',
    ownerRating: 3.8,
    ownerReviewCount: 15
  }
];
