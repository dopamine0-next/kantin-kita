import { Terms, TermsApiResponse } from './terms.types'

export function mapTerms(data: TermsApiResponse): Terms {
  return {
    id: data.id,
    title: data.title,
    content: data.content,
  }
}
