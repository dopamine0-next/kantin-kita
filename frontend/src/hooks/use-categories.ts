import useSWR from 'swr'

import { getCategories } from '@/services/category/category.service'

export function useCategories() {
  const { data, error, isLoading } = useSWR('categories', getCategories)

  return {
    categories: data || [],
    error,
    isLoading,
  }
}
