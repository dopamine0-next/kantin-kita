import { RestaurantApiResponse, RestaurantDetailApiResponse } from './restaurant.types'

export const MOCK_RESTAURANT_API_RESPONSE: RestaurantApiResponse[] = [
  {
    id: 'stall-1',
    name: 'Soto & Bakso Mbok Sri',
    restaurant_category: { id: 'rct_001', name: 'Masakan Rumah' },
    rating: 4.8,
    reviews_count: 500,
    is_open: true,
    image_url:
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=150&q=80',
    location_id: 'l1',
    cheapest_price: 15000,
  },
  {
    id: 'stall-2',
    name: 'Ayam Geprek Gahar',
    restaurant_category: { id: 'rct_002', name: 'Ayam' },
    rating: 4.7,
    reviews_count: 380,
    is_open: true,
    image_url:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=150&q=80',
    location_id: 'l2',
    cheapest_price: 14000,
  },
  {
    id: 'stall-3',
    name: 'Kopi & Roti Bakar Kanto',
    restaurant_category: { id: 'rct_003', name: 'Kopi & Minuman' },
    rating: 4.9,
    reviews_count: 1200,
    is_open: true,
    image_url:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=150&q=80',
    location_id: 'l1',
    cheapest_price: 10000,
  },
  {
    id: 'stall-4',
    name: 'Dapur Seafood Selera Rasa',
    restaurant_category: { id: 'rct_007', name: 'Ikan Bakar' },
    rating: 4.6,
    reviews_count: 120,
    is_open: false,
    image_url:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=150&q=80',
    location_id: 'l2',
    cheapest_price: 28000,
  },
]

export const MOCK_RESTAURANTS_DETAILS_RESPONSE: Record<string, RestaurantDetailApiResponse> = {
  'stall-1': {
    id: 'stall-1',
    name: 'Soto & Bakso Mbok Sri',
    restaurant_category: { id: 'rct_001', name: 'Masakan Rumah' },
    rating: 4.8,
    reviews_count: 500,
    is_open: true,
    image_url:
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80',
    banner_image_url:
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    address: 'Kantin Pusat, Kantin Kita Utama',
    operational_hours: '09:00 - 20:00',
    location_id: 'l1',
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
        customizations: [
          {
            title: 'Variant',
            type: 'choice',
            required: true,
            options: [
              { label: 'Standard', price: 0 },
              { label: 'Ekstra Koya', price: 3000 },
              { label: 'Ekstra Ceker', price: 5000 },
            ],
          },
        ],
        rating: 4.9,
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
        customizations: [
          {
            title: 'Variant',
            type: 'choice',
            required: true,
            options: [
              { label: 'Standard', price: 0 },
              { label: 'Dengan Nasi', price: 5000 },
              { label: 'Tanpa Nasi', price: 0 },
            ],
          },
        ],
        rating: 4.8,
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
        customizations: [
          {
            title: 'Variant',
            type: 'choice',
            required: true,
            options: [
              { label: 'Mie Campur', price: 0 },
              { label: 'Bihun Saja', price: 0 },
              { label: 'Mie Kuning Saja', price: 0 },
              { label: 'Tanpa Mie', price: 0 },
            ],
          },
          {
            title: 'Tingkat Kepedasan',
            type: 'choice',
            options: [
              { label: 'Level 0 (Tidak Pedas)', price: 0 },
              { label: 'Level 1 (Sedang)', price: 0 },
              { label: 'Level 2 (Pedas)', price: 0 },
              { label: 'Level 3 (Extra Pedas)', price: 2000 },
            ],
          },
          {
            title: 'Tambahan Ekstra',
            type: 'choice',
            options: [
              { label: 'Nasi Putih Ekstra', price: 5000 },
              { label: 'Tahu & Tempe Goreng', price: 3000 },
              { label: 'Telor Ceplok', price: 4000 },
              { label: 'Kerupuk Udang', price: 2000 },
            ],
          },
        ],
        rating: 4.9,
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
        customizations: [
          {
            title: 'Variant',
            type: 'choice',
            required: true,
            options: [
              { label: 'Standard', price: 0 },
              { label: 'Ekstra Tahu', price: 3000 },
            ],
          },
        ],
        rating: 4.7,
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
        customizations: [
          {
            title: 'Variant',
            type: 'choice',
            required: true,
            options: [
              { label: 'Manis Sedang', price: 0 },
              { label: 'Manis Maksimal', price: 0 },
              { label: 'Tawar', price: 0 },
            ],
          },
          {
            title: 'Tingkat Kemanisan',
            type: 'choice',
            options: [
              { label: 'Less Sugar (70%)', price: 0 },
              { label: 'Normal Sugar (100%)', price: 0 },
              { label: 'Extra Sugar', price: 2000 },
            ],
          },
          {
            title: 'Tambahan Ekstra',
            type: 'choice',
            options: [
              { label: 'Extra Espresso Shot', price: 5000 },
              { label: 'Cincau / Grass Jelly', price: 2000 },
              { label: 'Boba Pearls', price: 3000 },
            ],
          },
        ],
        rating: 4.9,
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
      },
    ],
  },
  'stall-2': {
    id: 'stall-2',
    name: 'Ayam Geprek Gahar',
    restaurant_category: { id: 'rct_002', name: 'Ayam' },
    rating: 4.7,
    reviews_count: 380,
    is_open: true,
    image_url:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80',
    banner_image_url:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    address: 'Blok B, Kantin Kita Utama',
    operational_hours: '10:00 - 21:00',
    location_id: 'l2',
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
        customizations: [
          {
            title: 'Variant',
            type: 'choice',
            required: true,
            options: [
              { label: 'Level 1 (Sante)', price: 0 },
              { label: 'Level 3 (Gahar)', price: 0 },
              { label: 'Level 5 (Mampus)', price: 0 },
            ],
          },
        ],
        rating: 4.8,
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
        customizations: [
          {
            title: 'Variant',
            type: 'choice',
            required: true,
            options: [
              { label: 'Level 1', price: 0 },
              { label: 'Level 2', price: 0 },
              { label: 'Level 3', price: 0 },
              { label: 'Level 4', price: 0 },
            ],
          },
        ],
        rating: 4.9,
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
      },
    ],
  },
}
