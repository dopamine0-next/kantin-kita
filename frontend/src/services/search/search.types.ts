export interface SearchResultApiResponse {
  id: string
  name: string
  stall: string
  category: string
  price: number
  rating: number
  rating_count?: number
  image_url: string
  restaurant_id: string
}

export interface SearchResult {
  id: string
  name: string
  stall: string
  category: string
  price: number
  rating: number
  ratingCount?: number
  image: string
  stallId: string
}
