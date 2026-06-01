import useSWR from 'swr'
import { getPopularSearches, getSearchResults } from '@/services/search/search.service'

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

export function usePopularSearches() {
  const { data, error, isLoading } = useSWR('popular-searches', getPopularSearches)

  return {
    popularSearches: data || [],
    error,
    isLoading,
  }
}
