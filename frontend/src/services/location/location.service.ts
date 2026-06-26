import { fetcher } from '@/lib/fetcher'

import { mapLocationApiResponseToItem } from './location.mapper'
import { LocationApiResponse, LocationItem } from './location.types'

export const locationService = {
  getLocations: async (): Promise<LocationItem[]> => {
    const data = await fetcher<LocationApiResponse[]>('/locations')
    return data.map(mapLocationApiResponseToItem)
  },

  getNearestLocation: async (lat: number, lng: number): Promise<LocationItem> => {
    const data = await fetcher<LocationApiResponse>(`/locations/nearest?lat=${lat}&lng=${lng}`)
    return mapLocationApiResponseToItem(data)
  },
}
