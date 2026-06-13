export interface RestaurantCategoryResponse {
  id: string
  name: string
}

export interface RestaurantApiResponse {
  id: string
  name: string
  restaurant_category: RestaurantCategoryResponse
  rating: number
  reviews_count: number
  is_open: boolean
  image_url: string
  location_id?: string
  cheapest_price?: number
  promos?: string[]
}

export interface RestaurantItem {
  id: string
  name: string
  restaurantCategory: RestaurantCategoryResponse
  rating: number
  reviewsCount: number
  isOpen: boolean
  image: string
  locationId?: string
  cheapestPrice?: number
  promos?: string[]
}

export interface ChoiceOption {
  label: string
  price: number
}

export interface MenuCustomization {
  title: string
  type: 'choice'
  options: ChoiceOption[]
  required?: boolean
}

export interface MenuItemApiResponse {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  restaurant_id?: string
  customizations?: MenuCustomization[]
  rating?: number
  rating_count?: number
  is_popular?: boolean
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  restaurantId?: string
  customizations?: MenuCustomization[]
  rating?: number
  ratingCount?: number
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
