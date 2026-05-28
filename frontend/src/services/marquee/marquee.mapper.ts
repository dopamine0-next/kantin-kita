import { MarqueeApiResponse, MarqueeItem } from './marquee.types'

export function mapMarqueeItem(data: MarqueeApiResponse): MarqueeItem {
  return {
    id: data.id,
    icon: data.icon_emoji,
    text: data.promo_text,
    color: data.color_class,
  }
}
