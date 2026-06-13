import {
  MenuItem,
  MenuItemApiResponse,
  RestaurantApiResponse,
  RestaurantDetail,
  RestaurantDetailApiResponse,
  RestaurantItem,
} from './restaurant.types'

export function mapRestaurantItem(apiData: RestaurantApiResponse): RestaurantItem {
  return {
    id: apiData.id,
    name: apiData.name,
    restaurantCategory: apiData.restaurant_category,
    rating: apiData.rating,
    reviewsCount: Number(apiData.reviews_count),
    isOpen: apiData.is_open,
    image: apiData.image_url,
    locationId: apiData.location_id,
    cheapestPrice: apiData.cheapest_price,
    promos: apiData.promos,
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
    restaurantId: apiData.restaurant_id,
    customizations: mapCustomizations(apiData.customizations),
    rating: apiData.rating,
    ratingCount: apiData.rating_count,
    isPopular: apiData.is_popular,
  }
}

function mapCustomizations(
  customizations?: MenuItemApiResponse['customizations']
): MenuItem['customizations'] {
  if (!customizations) return undefined
  return customizations.map((cust) => cust)
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
