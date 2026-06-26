import { MarqueeApiResponse, MarqueeItem } from './marquee.types'

export function mapMarqueeItem(data: MarqueeApiResponse): MarqueeItem {
  return {
    id: data.id,
    text: data.text,
  }
}
