import { SearchResult, SearchResultApiResponse } from './search.types'

export function mapSearchResult(data: SearchResultApiResponse): SearchResult {
  return {
    id: data.id,
    name: data.name,
    stall: data.stall,
    category: data.category,
    price: data.price,
    rating: data.rating,
    ratingCount: data.rating_count,
    image: data.image_url,
    stallId: data.restaurant_id,
  }
}
