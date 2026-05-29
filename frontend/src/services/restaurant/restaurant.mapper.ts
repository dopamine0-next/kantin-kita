import { MenuItem, MenuItemApiResponse, RestaurantApiResponse, RestaurantDetail, RestaurantDetailApiResponse, RestaurantItem } from './restaurant.types'

export function mapRestaurantItem(apiData: RestaurantApiResponse): RestaurantItem {
  return {
    id: apiData.id,
    name: apiData.name,
    cuisine: apiData.cuisine,
    rating: apiData.rating,
    reviewsCount: apiData.reviews_count,
    walkTime: apiData.walk_time,
    distance: apiData.distance,
    isOpen: apiData.is_open,
    promoText: apiData.promo_text,
    image: apiData.image_url,
    block: apiData.block,
  }
}

export function mapMenuItem(apiData: MenuItemApiResponse): MenuItem {
  return {
    id: apiData.id,
    name: apiData.name,
    description: apiData.description,
    price: apiData.price,
    image: apiData.image_url,
    category: apiData.category,
    variants: apiData.variants,
    customizations: apiData.customizations,
    rating: apiData.rating,
    salesCount: apiData.sales_count,
    isPopular: apiData.is_popular,
  }
}

export function mapRestaurantDetail(apiData: RestaurantDetailApiResponse): RestaurantDetail {
  return {
    ...mapRestaurantItem(apiData),
    bannerImage: apiData.banner_image_url,
    address: apiData.address,
    operationalHours: apiData.operational_hours,
    categories: apiData.categories,
    menus: apiData.menus.map(mapMenuItem),
  }
}
