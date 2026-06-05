import { Order, OrderApiResponse, OrderItem, OrderItemApiResponse } from './order.types'

export function mapOrderItem(data: OrderItemApiResponse): OrderItem {
  return {
    id: data.id,
    menuItemId: data.menu_item_id,
    name: data.name,
    quantity: data.quantity,
    price: data.price,
    image: data.image_url,
    variantName: data.variant_name,
    note: data.note,
    addons: data.addons,
  }
}

export function mapOrder(data: OrderApiResponse): Order {
  return {
    id: data.id,
    restaurant_id: data.restaurant_id,
    restaurant_name: data.restaurant_name,
    restaurant_image: data.restaurant_image,
    status: data.status as Order['status'],
    total_amount: data.total_amount,
    mode: data.mode,
    order_number: data.order_number,
    payment_url: data.payment_url,
    payment_status: data.payment_status,
    discount_amount: data.discount_amount,
    app_fee: data.app_fee,
    items: data.items.map(mapOrderItem),
    created_at: data.created_at,
    updated_at: data.updated_at,
  }
}
