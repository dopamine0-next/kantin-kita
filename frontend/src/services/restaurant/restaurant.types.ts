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
  location_id?: string
  cheapest_price?: number
  is_instant?: boolean
  promos?: string[]
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
  locationId?: string
  cheapestPrice?: number
  isInstant?: boolean
  promos?: string[]
}

export interface AddonOption {
  name: string
  price: number
}

export interface ChoiceOption {
  label: string
  price: number
}

export interface MenuCustomization {
  title: string
  type: 'choice' | 'multiple'
  options: (ChoiceOption | AddonOption)[]
  required?: boolean
}

export interface MenuItemApiResponse {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  variants?: string[]
  customizations?: MenuCustomization[]
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
  customizations?: MenuCustomization[]
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
