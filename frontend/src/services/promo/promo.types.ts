export interface PromoApiResponse {
  id: string
  restaurant_id: string
  name: string
  category: string
  price: number
  original_price?: number
  rating: number
  rating_count?: number
  image_url: string
}

export interface PromoItem {
  id: string
  restaurantId: string
  name: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  ratingCount?: number
  image: string
}
