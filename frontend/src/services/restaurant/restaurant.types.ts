export interface RestaurantApiResponse {
  id: string
  name: string
  cuisine: string
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
  cuisine: string
  rating: number
  reviewsCount: number
  isOpen: boolean
  image: string
  locationId?: string
  cheapestPrice?: number
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
  restaurant_id?: string
  variants?: string[]
  customizations?: MenuCustomization[]
  rating?: number
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
  variants?: string[]
  customizations?: MenuCustomization[]
  rating?: number
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
