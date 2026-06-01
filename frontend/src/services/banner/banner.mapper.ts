import { BannerApiResponse, BannerItem } from './banner.types'

export function mapBanner(data: BannerApiResponse): BannerItem {
  return {
    id: data.id,
    image: data.image_url,
    title: data.title,
    restaurantId: data.restaurant_id,
  }
}

export function mapBanners(data: BannerApiResponse[]): BannerItem[] {
  return data.map(mapBanner)
}
