import useSWR from 'swr'

import { getFAQs } from '@/services/faq/faq.service'

export function useFAQs() {
  const { data, error, isLoading } = useSWR('faqs', getFAQs)

  return {
    faqs: data || [],
    error,
    isLoading,
  }
}
