import { fetcher } from '@/lib/fetcher'

import { mapOrder } from './order.mapper'
import { CreateOrderPayload, CreateOrderResponse, Order, OrderApiResponse } from './order.types'

export async function get_orders(): Promise<Order[]> {
  const res = await fetcher<OrderApiResponse[]>('/orders')
  return res.map(mapOrder)
}

export async function get_order_by_id(id: string): Promise<Order> {
  const res = await fetcher<OrderApiResponse>(`/orders/${id}`)
  return mapOrder(res)
}

export async function getUnreviewedOrders(): Promise<Order[]> {
  const res = await fetcher<OrderApiResponse[]>('/orders/unreviewed')
  return res.map(mapOrder)
}

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  return fetcher<CreateOrderResponse>('/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
