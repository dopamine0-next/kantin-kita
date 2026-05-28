import { mapCategoryItem } from './category.mapper'
import { MOCK_CATEGORY_API_RESPONSE } from './category.mock'
import { CategoryItem } from './category.types'

export async function getCategories(): Promise<CategoryItem[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400))
  return MOCK_CATEGORY_API_RESPONSE.map(mapCategoryItem)
}
