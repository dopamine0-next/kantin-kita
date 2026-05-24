import { Order } from './order.types'

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-1001',
    restaurant_id: 'R01',
    restaurant_name: 'Warung Bu Ani',
    restaurant_image:
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=150&q=80',
    status: 'processing',
    total_amount: 35000,
    items: [
      { id: 'I01', name: 'Nasi Goreng Spesial', quantity: 1, price: 25000 },
      { id: 'I02', name: 'Es Teh Manis', quantity: 2, price: 5000 },
    ],
    created_at: new Date(Date.now() - 15 * 60000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: 'ORD-1002',
    restaurant_id: 'R02',
    restaurant_name: 'Ayam Geprek Bensu',
    restaurant_image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=150&q=80',
    status: 'completed',
    total_amount: 45000,
    items: [
      { id: 'I03', name: 'Ayam Geprek Level 5', quantity: 2, price: 20000 },
      { id: 'I04', name: 'Es Jeruk', quantity: 1, price: 5000 },
    ],
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 85000000).toISOString(),
  },
  {
    id: 'ORD-1003',
    restaurant_id: 'R03',
    restaurant_name: 'Kopi Kenangan',
    restaurant_image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=150&q=80',
    status: 'cancelled',
    total_amount: 54000,
    items: [{ id: 'I05', name: 'Kopi Susu Mantan', quantity: 3, price: 18000 }],
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 170000000).toISOString(),
  },
]
