export interface StallRestaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  reviewsCount: string
  walkTime: number // in minutes
  distance: string
  isOpen: boolean
  promos: string[] // List of promos
  cheapestItemPrice: number // for "Di bawah 30rb" filter
  isInstant: boolean // for "Instant (<10 mnt)" filter
  image: string
  block?: "Blok A" | "Blok B"
}

export interface FilterBadge {
  id: string
  label: string
}
