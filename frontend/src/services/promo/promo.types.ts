export interface PromoApiResponse {
  id: string
  restaurant_id: string
  name: string
  category: string
  price: number
  original_price?: number
  rating: number
  rating_count?: number
  badge_text?: string
  badge_variant?: 'default' | 'secondary' | 'destructive' | 'outline'
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
  badgeText?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  image: string
}
