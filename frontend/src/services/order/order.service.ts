import { MOCK_ORDERS } from './order.mock'
import { Order } from './order.types'

export async function get_orders(): Promise<Order[]> {
  // Simulate network delay for API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_ORDERS)
    }, 800)
  })
}

export async function get_order_by_id(id: string): Promise<Order | undefined> {
  const orders = await get_orders()
  return orders.find(order => order.id === id)
}
