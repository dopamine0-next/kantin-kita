export interface CategoryApiResponse {
  id: string
  name: string
  iconUrl: string | null
  priority: number | null
}

export interface CategoryItem {
  id: string
  name: string
  iconUrl: string
  priority: number | null
}
