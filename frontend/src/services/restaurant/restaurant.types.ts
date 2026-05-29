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

export interface MenuItemApiResponse {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  variants?: string[]
  rating?: number
  sales_count?: string
  is_popular?: boolean
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  variants?: string[]
  rating?: number
  salesCount?: string
  isPopular?: boolean
}

export interface RestaurantDetailApiResponse extends RestaurantApiResponse {
  banner_image_url: string
  address: string
  operational_hours: string
  categories: string[]
  menus: MenuItemApiResponse[]
}

export interface RestaurantDetail extends RestaurantItem {
  bannerImage: string
  address: string
  operationalHours: string
  categories: string[]
  menus: MenuItem[]
}
