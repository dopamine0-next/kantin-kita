import useSWR from 'swr'

import { getPromos } from '@/services/promo/promo.service'
import { useAuthStore } from '@/store/useAuthStore'

export function usePromos() {
  const user = useAuthStore((state) => state.user)
  const locationId = user?.locationId

  const { data, error, isLoading } = useSWR(locationId ? `promos-${locationId}` : 'promos', () =>
    getPromos(locationId)
  )

  return {
    promos: data || [],
    error,
    isLoading,
  }
}
