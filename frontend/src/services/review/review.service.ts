import { fetcher } from '@/lib/fetcher'

export interface CreateRestaurantReviewPayload {
  orderId: string
  rating: number
}

export interface CreateMenuItemReviewPayload {
  orderId: string
  menuItemId: string
  rating: number
}

export async function createRestaurantReview(payload: CreateRestaurantReviewPayload) {
  return fetcher('/restaurant-reviews', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function createMenuItemReview(payload: CreateMenuItemReviewPayload) {
  return fetcher('/menu-item-reviews', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
