import { fetcher } from '@/lib/fetcher'

import { mapSearchResult } from './search.mapper'
import { SearchResult, SearchResultApiResponse } from './search.types'

export async function getSearchResults(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return []

  const res = await fetcher<SearchResultApiResponse[]>(
    `/menus/search?q=${encodeURIComponent(query.trim())}`
  )

  return res.map(mapSearchResult)
}
