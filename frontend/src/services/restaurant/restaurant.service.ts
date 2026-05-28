import { MOCK_RESTAURANT_API_RESPONSE } from './restaurant.mock'
import { mapRestaurantItem } from './restaurant.mapper'
import { RestaurantItem } from './restaurant.types'

export async function getRestaurants(): Promise<RestaurantItem[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))
  return MOCK_RESTAURANT_API_RESPONSE.map(mapRestaurantItem)
}
