import useSWR from 'swr'

import { getBanners } from '@/services/banner/banner.service'

export function useBanners() {
  const { data, error, isLoading } = useSWR('banners', getBanners)

  return {
    banners: data || [],
    error,
    isLoading,
  }
}
