import { mapPromoItem } from './promo.mapper'
import { MOCK_PROMO_API_RESPONSE } from './promo.mock'
import { PromoItem } from './promo.types'

export async function getPromos(): Promise<PromoItem[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return MOCK_PROMO_API_RESPONSE.map(mapPromoItem)
}
