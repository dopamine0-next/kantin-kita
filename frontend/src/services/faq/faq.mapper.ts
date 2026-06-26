import { FAQ, FAQApiResponse } from './faq.types'

export function mapFAQ(data: FAQApiResponse): FAQ {
  return {
    id: data.id,
    question: data.question,
    answer: data.answer,
  }
}
