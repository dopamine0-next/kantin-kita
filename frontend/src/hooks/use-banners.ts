import useSWR from 'swr'

import { getBanners } from '@/services/banner/banner.service'
import { useAuthStore } from '@/store/useAuthStore'

export function useBanners() {
  const user = useAuthStore((state) => state.user)
  const locationId = user?.locationId

  const { data, error, isLoading } = useSWR(locationId ? `banners-${locationId}` : 'banners', () =>
    getBanners(locationId)
  )

  return {
    banners: data || [],
    error,
    isLoading,
  }
}
