import { mapSearchResult } from './search.mapper'
import { MOCK_POPULAR_SEARCHES, MOCK_SEARCH_DATABASE } from './search.mock'
import { SearchResult } from './search.types'

export async function getSearchResults(query: string): Promise<SearchResult[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!query.trim()) return []

  return MOCK_SEARCH_DATABASE.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.stall.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  ).map(mapSearchResult)
}

export async function getPopularSearches(): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return MOCK_POPULAR_SEARCHES
}
