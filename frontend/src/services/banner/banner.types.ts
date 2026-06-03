export interface BannerApiResponse {
  id: string
  imageUrl: string
  title: string | null
  linkUrl: string | null
  isActive: boolean
  locationName: string | null
  locationId: string | null
}

export interface BannerItem {
  id: string
  image: string
  title: string
  linkUrl: string
}
