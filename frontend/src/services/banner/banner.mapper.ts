import { BannerApiResponse, BannerItem } from './banner.types'

export function mapBanner(data: BannerApiResponse): BannerItem {
  return {
    id: data.id,
    image: data.imageUrl,
    title: data.title ?? '',
    linkUrl: data.linkUrl ?? '/',
  }
}

export function mapBanners(data: BannerApiResponse[]): BannerItem[] {
  return data.map(mapBanner)
}
