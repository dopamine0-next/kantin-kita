import useSWR from 'swr'

import { getUnreviewedOrders } from '@/services/order/order.service'
import { Order } from '@/services/order/order.types'

export function useUnreviewedOrders() {
  const { data, error, isLoading } = useSWR<Order[]>('orders/unreviewed', getUnreviewedOrders)

  return {
    orders: data || [],
    error,
    isLoading,
  }
}
