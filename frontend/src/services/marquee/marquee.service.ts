import { fetcher } from '@/lib/fetcher'

import { mapMarqueeItem } from './marquee.mapper'
import { MarqueeApiResponse, MarqueeItem } from './marquee.types'

export async function getMarqueeItems(): Promise<MarqueeItem[]> {
  const data = await fetcher<MarqueeApiResponse[]>('/marquee')
  return data.map(mapMarqueeItem)
}
