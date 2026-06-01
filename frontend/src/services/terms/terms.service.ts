import { mapTerms } from './terms.mapper'
import { MOCK_TERMS_API_RESPONSE } from './terms.mock'
import { Terms } from './terms.types'

export async function getTerms(): Promise<Terms> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mapTerms(MOCK_TERMS_API_RESPONSE)
}
