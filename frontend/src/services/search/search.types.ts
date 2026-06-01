export interface SearchResultApiResponse {
  id: string
  name: string
  stall: string
  category: string
  price: number
  rating: number
  prep_time: string
  image_url: string
}

export interface SearchResult {
  id: string
  name: string
  stall: string
  category: string
  price: number
  rating: number
  prepTime: string
  image: string
}

export interface SearchSuggestions {
  popular: string[]
  trends: string[]
}
