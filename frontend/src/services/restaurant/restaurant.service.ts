import { mapRestaurantItem, mapRestaurantDetail } from './restaurant.mapper'
import { MOCK_RESTAURANT_API_RESPONSE, MOCK_RESTAURANTS_DETAILS_RESPONSE } from './restaurant.mock'
import { RestaurantItem, RestaurantDetail } from './restaurant.types'

export async function getRestaurants(): Promise<RestaurantItem[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))
  return MOCK_RESTAURANT_API_RESPONSE.map(mapRestaurantItem)
}

export async function getRestaurantDetail(id: string): Promise<RestaurantDetail | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))
  
  const mockData = MOCK_RESTAURANTS_DETAILS_RESPONSE[id]
  if (!mockData) {
    return null
  }
  
  return mapRestaurantDetail(mockData)
}

export async function getRestaurantsDetails(): Promise<Record<string, RestaurantDetail>> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600))
    
    const result: Record<string, RestaurantDetail> = {}
    for (const [key, value] of Object.entries(MOCK_RESTAURANTS_DETAILS_RESPONSE)) {
      result[key] = mapRestaurantDetail(value)
    }
    
    return result
}
