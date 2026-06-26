import { LocationApiResponse, LocationItem } from './location.types'

export const mapLocationApiResponseToItem = (data: LocationApiResponse): LocationItem => ({
  id: data.id,
  name: data.name,
  address: data.address,
  lat: data.latitude,
  lng: data.longitude,
})
