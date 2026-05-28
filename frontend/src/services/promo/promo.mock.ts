import { PromoApiResponse } from './promo.types'

export const MOCK_PROMO_API_RESPONSE: PromoApiResponse[] = [
  {
    id: 'promo-1',
    restaurant_id: 'stall-1',
    name: 'Nasi Goreng Gila Kebon Sirih',
    category: 'nasi',
    price: 16000,
    original_price: 20000,
    rating: 4.8,
    prep_time: '10-15 mnt',
    badge_text: 'Diskon 20%',
    badge_variant: 'destructive',
    image_url:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'promo-2',
    restaurant_id: 'stall-1',
    name: 'Mie Ayam Pangsit Jamur',
    category: 'mie',
    price: 15000,
    original_price: 20000,
    rating: 4.9,
    prep_time: '8-12 mnt',
    badge_text: 'Best Seller',
    badge_variant: 'default',
    image_url:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'promo-3',
    restaurant_id: 'stall-2',
    name: 'Ayam Geprek Mozzarella Melted',
    category: 'ayam',
    price: 18000,
    original_price: 22000,
    rating: 4.7,
    prep_time: '12-18 mnt',
    badge_text: 'Terlaris',
    badge_variant: 'secondary',
    image_url:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'promo-4',
    restaurant_id: 'stall-3',
    name: 'Es Kopi Susu Aren Double Shot',
    category: 'minuman',
    price: 10000,
    original_price: 13000,
    rating: 4.9,
    prep_time: '3-5 mnt',
    badge_text: 'Beli 2 Gratis 1',
    badge_variant: 'default',
    image_url:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80',
  },
]
