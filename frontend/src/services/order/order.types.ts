export type OrderStatus = 'pending' | 'processing' | 'ready' | 'completed' | 'cancelled'

export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image?: string
}

export interface Order {
  id: string
  restaurant_id: string
  restaurant_name: string
  restaurant_image?: string
  status: OrderStatus
  total_amount: number
  items: OrderItem[]
  created_at: string
  updated_at: string
}
