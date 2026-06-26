import { PromoApiResponse, PromoItem } from './promo.types'

export function mapPromoItem(data: PromoApiResponse): PromoItem {
  return {
    id: data.id,
    restaurantId: data.restaurant_id,
    name: data.name,
    category: data.category,
    price: data.price,
    originalPrice: data.original_price,
    rating: data.rating,
    ratingCount: data.rating_count,
    image: data.image_url,
  }
}
