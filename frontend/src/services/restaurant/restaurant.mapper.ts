import {
  AddonOption,
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
    cuisine: apiData.cuisine,
    rating: apiData.rating,
    reviewsCount: apiData.reviews_count,
    walkTime: apiData.walk_time,
    distance: apiData.distance,
    isOpen: apiData.is_open,
    promoText: apiData.promo_text,
    image: apiData.image_url,
    locationId: apiData.location_id,
    cheapestPrice: apiData.cheapest_price,
    isInstant: apiData.is_instant,
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
    variants: apiData.variants,
    customizations: mapCustomizations(apiData.customizations),
    rating: apiData.rating,
    salesCount: apiData.sales_count,
    isPopular: apiData.is_popular,
  }
}

function mapCustomizations(
  customizations?: MenuItemApiResponse['customizations']
): MenuItem['customizations'] {
  if (!customizations) return undefined
  return customizations.map((cust) => {
    if (cust.type === 'multiple') {
      return {
        ...cust,
        options: cust.options.map((opt) => {
          const raw = opt as unknown as { label: string; price: number }
          return { name: raw.label, price: raw.price } as AddonOption
        }),
      }
    }
    return cust
  })
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
