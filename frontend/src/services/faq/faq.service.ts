import { mapFAQ } from './faq.mapper'
import { MOCK_FAQ_API_RESPONSE } from './faq.mock'
import { FAQ } from './faq.types'

export async function getFAQs(): Promise<FAQ[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return MOCK_FAQ_API_RESPONSE.map(mapFAQ)
}
