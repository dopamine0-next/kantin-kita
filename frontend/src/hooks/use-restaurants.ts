import useSWR from 'swr'

import { getRestaurants } from '@/services/restaurant/restaurant.service'

export function useRestaurants() {
  const { data, error, isLoading } = useSWR('restaurants', getRestaurants)

  return {
    restaurants: data || [],
    error,
    isLoading,
  }
}
