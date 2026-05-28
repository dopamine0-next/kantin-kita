import useSWR from 'swr'

import { getPromos } from '@/services/promo/promo.service'

export function usePromos() {
  const { data, error, isLoading } = useSWR('promos', getPromos)

  return {
    promos: data || [],
    error,
    isLoading,
  }
}
