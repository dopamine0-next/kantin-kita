import { mapLocationApiResponseToItem } from './location.mapper'
import { MOCK_LOCATIONS_RESPONSE } from './location.mock'
import { LocationItem } from './location.types'

export const locationService = {
  getLocations: async (): Promise<LocationItem[]> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    return MOCK_LOCATIONS_RESPONSE.map(mapLocationApiResponseToItem)
  },
}
