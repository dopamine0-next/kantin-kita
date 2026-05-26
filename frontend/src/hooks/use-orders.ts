import useSWR from 'swr'

import { get_orders } from '@/services/order/order.service'
import { Order } from '@/services/order/order.types'

export function useOrders() {
  const { data, error, isLoading } = useSWR<Order[]>('orders', get_orders)

  return {
    orders: data || [],
    error,
    isLoading,
  }
}
