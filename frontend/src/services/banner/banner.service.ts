import { mapBanners } from './banner.mapper'
import { MOCK_BANNER_API_RESPONSE } from './banner.mock'
import { BannerItem } from './banner.types'

export async function getBanners(): Promise<BannerItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mapBanners(MOCK_BANNER_API_RESPONSE)
}
