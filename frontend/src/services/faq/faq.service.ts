import { fetcher } from '@/lib/fetcher'

import { mapFAQ } from './faq.mapper'
import { FAQ, FAQApiResponse } from './faq.types'

export async function getFAQs(): Promise<FAQ[]> {
  const data = await fetcher<FAQApiResponse[]>('/faqs')
  return data.map(mapFAQ)
}
