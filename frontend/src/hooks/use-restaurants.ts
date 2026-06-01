import useSWR from 'swr'

import {
  getRestaurantDetail,
  getRestaurants,
  getRestaurantsDetails,
} from '@/services/restaurant/restaurant.service'
import { useAuthStore } from '@/store/useAuthStore'

export function useRestaurants() {
  const user = useAuthStore((state) => state.user)
  const locationId = user?.locationId

  const { data, error, isLoading } = useSWR(
    locationId ? `restaurants-${locationId}` : 'restaurants',
    () => getRestaurants(locationId)
  )

  return {
    restaurants: data || [],
    error,
    isLoading,
  }
}

export function useRestaurantDetail(id: string) {
  const { data, error, isLoading } = useSWR(id ? `restaurant-${id}` : null, () =>
    getRestaurantDetail(id)
  )

  return {
    restaurant: data,
    error,
    isLoading,
  }
}

export function useRestaurantsDetails() {
  const { data, error, isLoading } = useSWR('restaurants-details', getRestaurantsDetails)

  return {
    restaurants: data,
    error,
    isLoading,
  }
}
