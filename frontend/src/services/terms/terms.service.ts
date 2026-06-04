import { fetcher } from '@/lib/fetcher'

import { mapTerms } from './terms.mapper'
import { Terms, TermsApiResponse } from './terms.types'

export async function getTerms(): Promise<Terms> {
  const data = await fetcher<TermsApiResponse>('/terms')
  return mapTerms(data)
}
