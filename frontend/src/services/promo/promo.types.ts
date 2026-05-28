export interface PromoApiResponse {
  id: string
  restaurant_id: string
  name: string
  category: string
  price: number
  original_price?: number
  rating: number
  prep_time: string
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
  prepTime: string
  badgeText?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  image: string
}
