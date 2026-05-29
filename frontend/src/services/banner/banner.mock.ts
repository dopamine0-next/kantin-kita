import { BannerApiResponse } from './banner.types'

export const MOCK_BANNER_API_RESPONSE: BannerApiResponse[] = [
  {
    id: 1,
    restaurant_id: 'stall-1',
    title: 'Spesial Combo Hemat',
    subtitle: 'Dapatkan paket nasi goreng spesial + es teh manis dingin!',
    promo_text: 'DISKON 40%',
    price_text: 'Cuma Rp 18.000',
    bg_gradient: 'from-amber-500 to-orange-600',
    image_url:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    restaurant_id: 'stall-1',
    title: 'Soto Legendaris',
    subtitle: 'Soto Mbok Sri gurih, resep rahasia turun temurun.',
    promo_text: 'HARI INI SAJA',
    price_text: 'Potongan Rp 5.000',
    bg_gradient: 'from-rose-500 to-red-600',
    image_url:
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    restaurant_id: 'stall-3',
    title: 'Camilan Sore Ceria',
    subtitle: 'Pisang goreng keju crispy & kopi susu gula aren hangat.',
    promo_text: 'DISKON S.D 30%',
    price_text: 'Hanya Rp 15.000',
    bg_gradient: 'from-yellow-500 to-amber-600',
    image_url:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80',
  },
]
