import useSWR from 'swr'

import { get_order_by_id, get_orders } from '@/services/order/order.service'
import { Order } from '@/services/order/order.types'

export function useOrders() {
  const { data, error, isLoading } = useSWR<Order[]>('orders', get_orders)

  return {
    orders: data || [],
    error,
    isLoading,
  }
}

export function useOrder(id: string) {
  const { data, error, isLoading } = useSWR<Order | undefined>(id ? `order-${id}` : null, () =>
    get_order_by_id(id)
  )

  return {
    order: data,
    error,
    isLoading,
  }
}
