import { fetcher } from '@/lib/fetcher'

import { mapRestaurantDetail, mapRestaurantItem } from './restaurant.mapper'
import {
  RestaurantApiResponse,
  RestaurantDetail,
  RestaurantDetailApiResponse,
  RestaurantItem,
} from './restaurant.types'

export async function getRestaurants(locationId?: string | null): Promise<RestaurantItem[]> {
  const params = locationId ? `?locationId=${locationId}` : ''
  const data = await fetcher<RestaurantApiResponse[]>(`/restaurants${params}`)
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
