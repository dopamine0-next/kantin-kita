import { fetcher } from '@/lib/fetcher'

import { mapPromoItem } from './promo.mapper'
import { PromoApiResponse, PromoItem } from './promo.types'

export async function getPromos(locationId?: string | null): Promise<PromoItem[]> {
  const params = locationId ? `?locationId=${locationId}` : ''
  const res = await fetcher<PromoApiResponse[]>(`/promos${params}`)
  return res.map(mapPromoItem)
}
