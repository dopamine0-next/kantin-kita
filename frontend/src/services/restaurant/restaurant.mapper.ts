import { RestaurantApiResponse, RestaurantItem } from './restaurant.types'

export function mapRestaurantItem(data: RestaurantApiResponse): RestaurantItem {
  return {
    id: data.id,
    name: data.name,
    cuisine: data.cuisine,
    rating: data.rating,
    reviewsCount: data.reviews_count,
    walkTime: data.walk_time,
    distance: data.distance,
    isOpen: data.is_open,
    promoText: data.promo_text,
    image: data.image_url,
    block: data.block,
  }
}
