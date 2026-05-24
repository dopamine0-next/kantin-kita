import useSWR from 'swr'

import { get_orders } from '@/services/order/order.service'

export function useOrders() {
  const { data, error, isLoading } = useSWR('orders', get_orders)

  return {
    orders: data || [],
    error,
    isLoading,
  }
}
