import { RestaurantApiResponse, RestaurantDetailApiResponse } from './restaurant.types'

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

export const MOCK_RESTAURANTS_DETAILS_RESPONSE: Record<string, RestaurantDetailApiResponse> = {
  'stall-1': {
    id: 'stall-1',
    name: 'Soto & Bakso Mbok Sri',
    cuisine: 'Soto Ayam, Bakso Urat, Mie Bakso',
    rating: 4.8,
    reviews_count: '500+',
    walk_time: '8 mnt',
    distance: '50m',
    is_open: true,
    promo_text: 'Diskon 20%',
    image_url:
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80',
    banner_image_url:
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    address: 'Blok A, Kantin Kita Utama',
    operational_hours: '09:00 - 20:00',
    block: 'Blok A',
    categories: ['Soto & Sup', 'Bakso', 'Camilan', 'Minuman'],
    menus: [
      {
        id: 'food-1-1',
        name: 'Soto Ayam Campur Nasi',
        description:
          'Soto ayam dengan kuah kuning aromatik yang gurih, bihun, irisan telur, kol, tauge, taburan koya khas Mbok Sri, lengkap dengan nasi hangat.',
        price: 18000,
        image_url:
          'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=300&q=80',
        category: 'Soto & Sup',
        variants: ['Standard', 'Ekstra Koya', 'Ekstra Ceker'],
        rating: 4.9,
        sales_count: '1.2k+ terjual',
        is_popular: true,
      },
      {
        id: 'food-1-2',
        name: 'Soto Daging Sapi Madura',
        description:
          'Soto daging sapi empuk khas Madura dengan kuah gurih berempah, taburan daun bawang dan bawang goreng yang melimpah.',
        price: 25000,
        image_url:
          'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?auto=format&fit=crop&w=300&q=80',
        category: 'Soto & Sup',
        variants: ['Standard', 'Dengan Nasi', 'Tanpa Nasi'],
        rating: 4.8,
        sales_count: '500+ terjual',
      },
      {
        id: 'food-1-3',
        name: 'Bakso Urat Jumbo Spesial',
        description:
          '1 Bakso Urat super besar yang sangat bertekstur, 3 bakso halus kecil, disajikan dengan mie kuning, bihun, tahu bakso, kuah kaldu sapi pekat.',
        price: 22000,
        image_url:
          'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=300&q=80',
        category: 'Bakso',
        variants: ['Mie Campur', 'Bihun Saja', 'Mie Kuning Saja', 'Tanpa Mie'],
        rating: 4.9,
        sales_count: '800+ terjual',
        is_popular: true,
      },
      {
        id: 'food-1-4',
        name: 'Bakso Halus Telur Puyuh',
        description:
          'Bakso sapi halus premium yang di dalamnya berisi telur puyuh utuh, disajikan dengan kuah bening gurih segar.',
        price: 20000,
        image_url:
          'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80',
        category: 'Bakso',
        variants: ['Standard', 'Ekstra Tahu'],
        rating: 4.7,
        sales_count: '350+ terjual',
      },
      {
        id: 'food-1-5',
        name: 'Tempe Mendoan Hangat (isi 3)',
        description:
          'Tempe lebar dibalur adonan tepung berbumbu kencur dan irisan daun bawang tebal, digoreng setengah matang, disajikan dengan cocolan kecap cabe rawit.',
        price: 10000,
        image_url:
          'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80',
        category: 'Camilan',
        rating: 4.8,
        sales_count: '1.5k+ terjual',
        is_popular: true,
      },
      {
        id: 'food-1-6',
        name: 'Es Teh Manis Selasih',
        description: 'Es teh manis segar beraroma melati ditambah dengan biji selasih yang sehat.',
        price: 5000,
        image_url:
          'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80',
        category: 'Minuman',
        variants: ['Manis Sedang', 'Manis Maksimal', 'Tawar'],
        rating: 4.9,
        sales_count: '2k+ terjual',
      },
      {
        id: 'food-1-7',
        name: 'Es Jeruk Peras Murni',
        description:
          'Jeruk peras segar alami kaya vitamin C, dipadukan es batu kristal dan gula cair murni.',
        price: 8000,
        image_url:
          'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=300&q=80',
        category: 'Minuman',
        rating: 4.8,
        sales_count: '900+ terjual',
      },
    ],
  },
  'stall-2': {
    id: 'stall-2',
    name: 'Ayam Geprek Gahar',
    cuisine: 'Ayam Geprek, Ayam Crispy, Ricebowl Pedas',
    rating: 4.7,
    reviews_count: '380+',
    walk_time: '12 mnt',
    distance: '70m',
    is_open: true,
    promo_text: 'Diskon 30%',
    image_url:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80',
    banner_image_url:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    address: 'Blok B, Kantin Kita Utama',
    operational_hours: '10:00 - 21:00',
    block: 'Blok B',
    categories: ['Paket Geprek', 'A la Carte', 'Minuman'],
    menus: [
      {
        id: 'food-2-1',
        name: 'Paket Geprek Gahar Spesial',
        description:
          'Nasi hangat + Ayam Geprek dada/paha atas yang renyah dan gurih, digeprek dengan sambal korek bawang yang pedas gahar, lengkap dengan lalapan dan es teh manis.',
        price: 23000,
        image_url:
          'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300&q=80',
        category: 'Paket Geprek',
        variants: ['Level 1 (Sante)', 'Level 3 (Gahar)', 'Level 5 (Mampus)'],
        rating: 4.8,
        sales_count: '2.4k+ terjual',
        is_popular: true,
      },
      {
        id: 'food-2-2',
        name: 'Geprek Mozzarella Lumer',
        description:
          'Ayam geprek crispy premium ditutup dengan keju mozzarella melimpah yang dibakar lumer. Sensasi pedas dan gurih creamy berpadu sempurna.',
        price: 27000,
        image_url:
          'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=300&q=80',
        category: 'Paket Geprek',
        variants: ['Level 1', 'Level 2', 'Level 3', 'Level 4'],
        rating: 4.9,
        sales_count: '1.1k+ terjual',
        is_popular: true,
      },
      {
        id: 'food-2-3',
        name: 'Nasi Ayam Geprek Sambal Matah',
        description:
          'Nasi hangat disajikan dengan potongan ayam goreng tepung crispy yang digeprek kasar dan disiram sambal matah khas Bali yang segar aromatik.',
        price: 24000,
        image_url:
          'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=300&q=80',
        category: 'Paket Geprek',
        rating: 4.7,
        sales_count: '850+ terjual'
      }
    ],
  }
}
