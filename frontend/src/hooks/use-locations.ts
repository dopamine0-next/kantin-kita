import useSWR from 'swr'

import { locationService } from '@/services/location/location.service'

export function useLocations() {
  const { data, error, isLoading } = useSWR('api/v1/locations', () => locationService.getLocations())

  return {
    locations: data || [],
    isLoading,
    isError: error,
  }
}
