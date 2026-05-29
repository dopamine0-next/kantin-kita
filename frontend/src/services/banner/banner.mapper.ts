import { BannerApiResponse, BannerItem } from './banner.types'

export function mapBanner(data: BannerApiResponse): BannerItem {
  return {
    id: data.id,
    restaurantId: data.restaurant_id,
    title: data.title,
    subtitle: data.subtitle,
    promoText: data.promo_text,
    priceText: data.price_text,
    bgGradient: data.bg_gradient,
    image: data.image_url,
  }
}

export function mapBanners(data: BannerApiResponse[]): BannerItem[] {
  return data.map(mapBanner)
}
