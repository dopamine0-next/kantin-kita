import { fetcher } from '@/lib/fetcher'

import { mapBanners } from './banner.mapper'
import { BannerApiResponse, BannerItem } from './banner.types'

export async function getBanners(locationId?: number | null): Promise<BannerItem[]> {
  const params = locationId ? `?locationId=${locationId}` : ''
  const data = await fetcher<BannerApiResponse[]>(`/banners${params}`)
  return mapBanners(data)
}
