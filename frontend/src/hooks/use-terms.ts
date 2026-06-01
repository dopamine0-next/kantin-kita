import useSWR from 'swr'
import { getTerms } from '@/services/terms/terms.service'

export function useTerms() {
  const { data, error, isLoading } = useSWR('terms', getTerms)

  return {
    terms: data,
    error,
    isLoading,
  }
}
