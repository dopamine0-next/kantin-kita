import useSWR from 'swr'

import {
  getRestaurantDetail,
  getRestaurants,
  getRestaurantsDetails,
} from '@/services/restaurant/restaurant.service'

export function useRestaurants() {
  const { data, error, isLoading } = useSWR('restaurants', getRestaurants)

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
