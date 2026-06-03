import { fetcher } from '@/lib/fetcher'

import { mapRestaurantDetail, mapRestaurantItem } from './restaurant.mapper'
import {
  RestaurantApiResponse,
  RestaurantDetail,
  RestaurantDetailApiResponse,
  RestaurantItem,
} from './restaurant.types'

export async function getRestaurants(locationId?: string | null, search?: string | null): Promise<RestaurantItem[]> {
  const params = new URLSearchParams()
  if (locationId) params.append('locationId', locationId)
  if (search) params.append('search', search)
  const queryString = params.toString()
  const url = `/restaurants${queryString ? `?${queryString}` : ''}`
  const data = await fetcher<RestaurantApiResponse[]>(url)
  return data.map(mapRestaurantItem)
}

export async function getRestaurantDetail(id: string): Promise<RestaurantDetail | null> {
  try {
    const data = await fetcher<RestaurantDetailApiResponse>(`/restaurants/${id}`)
    return mapRestaurantDetail(data)
  } catch {
    return null
  }
}

export async function getRestaurantsDetails(): Promise<Record<string, RestaurantDetail>> {
  return {}
}
