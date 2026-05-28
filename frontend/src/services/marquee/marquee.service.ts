import { MOCK_MARQUEE_API_RESPONSE } from './marquee.mock'
import { mapMarqueeItem } from './marquee.mapper'
import { MarqueeItem } from './marquee.types'

export async function getMarqueeItems(): Promise<MarqueeItem[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return MOCK_MARQUEE_API_RESPONSE.map(mapMarqueeItem)
}
