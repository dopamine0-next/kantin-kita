export interface BannerApiResponse {
  id: number
  restaurant_id: string
  title: string
  subtitle: string
  promo_text: string
  price_text: string
  bg_gradient: string
  image_url: string
}

export interface BannerItem {
  id: number
  restaurantId: string
  title: string
  subtitle: string
  promoText: string
  priceText: string
  bgGradient: string
  image: string
}
