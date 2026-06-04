import { fetcher } from '@/lib/fetcher'

import { mapPromoItem } from './promo.mapper'
import { PromoApiResponse, PromoItem } from './promo.types'

export async function getPromos(): Promise<PromoItem[]> {
  const res = await fetcher<PromoApiResponse[]>('/promos')
  return res.map(mapPromoItem)
}
