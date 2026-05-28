export interface RestaurantApiResponse {
  id: string
  name: string
  cuisine: string
  rating: number
  reviews_count: string
  walk_time: string
  distance: string
  is_open: boolean
  promo_text?: string
  image_url: string
  block?: 'Blok A' | 'Blok B'
}

export interface RestaurantItem {
  id: string
  name: string
  cuisine: string
  rating: number
  reviewsCount: string
  walkTime: string
  distance: string
  isOpen: boolean
  promoText?: string
  image: string
  block?: 'Blok A' | 'Blok B'
}
