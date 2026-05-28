import { RestaurantApiResponse } from './restaurant.types'

export const MOCK_RESTAURANT_API_RESPONSE: RestaurantApiResponse[] = [
  {
    id: 'stall-1',
    name: 'Soto & Bakso Mbok Sri',
    cuisine: 'Soto, Bakso, Masakan Indonesia',
    rating: 4.8,
    reviews_count: '500+',
    walk_time: '2 mnt',
    distance: '50m',
    is_open: true,
    promo_text: 'Diskon 20%',
    image_url:
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=150&q=80',
    block: 'Blok A',
  },
  {
    id: 'stall-2',
    name: 'Ayam Geprek Gahar',
    cuisine: 'Ayam Geprek, Fried Chicken, Pedas',
    rating: 4.7,
    reviews_count: '380+',
    walk_time: '3 mnt',
    distance: '70m',
    is_open: true,
    promo_text: 'Diskon 30%',
    image_url:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=150&q=80',
    block: 'Blok B',
  },
  {
    id: 'stall-3',
    name: 'Kopi & Roti Bakar Kanto',
    cuisine: 'Kopi Susu, Toast, Roti Bakar',
    rating: 4.9,
    reviews_count: '1.2k+',
    walk_time: '1 mnt',
    distance: '15m',
    is_open: true,
    promo_text: 'Combo Hemat',
    image_url:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=150&q=80',
    block: 'Blok A',
  },
  {
    id: 'stall-4',
    name: 'Dapur Seafood Selera Rasa',
    cuisine: 'Seafood, Ikan Bakar, Udang Geprek',
    rating: 4.6,
    reviews_count: '120+',
    walk_time: '5 mnt',
    distance: '120m',
    is_open: false,
    image_url:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=150&q=80',
    block: 'Blok B',
  },
]
