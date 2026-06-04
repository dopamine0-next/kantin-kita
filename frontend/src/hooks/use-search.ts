import useSWR from 'swr'

import { getSearchResults } from '@/services/search/search.service'

export function useSearch(query: string) {
  const { data, error, isLoading } = useSWR(query ? `search-${query}` : null, () =>
    getSearchResults(query)
  )

  return {
    results: data || [],
    error,
    isLoading,
  }
}
