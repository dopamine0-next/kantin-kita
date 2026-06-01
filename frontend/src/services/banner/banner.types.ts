export interface BannerApiResponse {
  id: number
  image_url: string
  title: string
  restaurant_id: string
  is_active: boolean
  location_id: number | null
  location_name: string | null
}

export interface BannerItem {
  id: number
  image: string
  title: string
  restaurantId: string
}
