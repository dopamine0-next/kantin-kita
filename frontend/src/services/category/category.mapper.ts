import { CategoryApiResponse, CategoryItem } from './category.types'

export function mapCategoryItem(data: CategoryApiResponse): CategoryItem {
  return {
    id: data.id,
    name: data.name,
    priority: data.priority,
  }
}
