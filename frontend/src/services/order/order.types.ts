export type OrderStatus = 'pending' | 'processing' | 'ready' | 'completed' | 'cancelled'

export interface OrderApiResponse {
  id: string
  restaurant_id: string
  restaurant_name: string
  restaurant_image?: string
  status: string
  total_amount: number
  mode: string
  order_number: string
  payment_url?: string
  payment_status: string
  discount_amount?: number
  app_fee?: number
  created_at: string
  updated_at: string
  items: OrderItemApiResponse[]
}

export interface OrderItemApiResponse {
  id: string
  name: string
  quantity: number
  price: number
  image_url?: string
  variant_name?: string
  menu_item_id?: string
  note?: string
  addons?: OrderAddonApiResponse[]
}

export interface OrderAddonApiResponse {
  name: string
  price: number
}

export interface CreateOrderPayload {
  restaurantId: string
  items: CreateOrderItemPayload[]
  mode: string
  voucherCode?: string
}

export interface CreateOrderItemPayload {
  menuItemId: string
  qty: number
  variantName?: string
  note?: string
  addons?: { name: string; price: number }[]
}

export interface CreateOrderResponse {
  order_id: string
  order_number: string
  payment_url?: string
  total_amount: number
  status: string
}

export interface OrderItem {
  id: string
  menuItemId?: string
  name: string
  quantity: number
  price: number
  image?: string
  variantName?: string
  note?: string
  addons?: { name: string; price: number }[]
}

export interface Order {
  id: string
  restaurant_id: string
  restaurant_name: string
  restaurant_image?: string
  status: OrderStatus
  total_amount: number
  mode: string
  order_number: string
  payment_url?: string
  payment_status: string
  discount_amount?: number
  app_fee?: number
  items: OrderItem[]
  created_at: string
  updated_at: string
}
