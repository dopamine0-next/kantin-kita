import { fetcher } from '@/lib/fetcher'

import { mapCategoryItem } from './category.mapper'
import { CategoryApiResponse, CategoryItem } from './category.types'

export async function getCategories(): Promise<CategoryItem[]> {
  const data = await fetcher<CategoryApiResponse[]>('/categories')
  return data.map(mapCategoryItem)
}
