import { RatingForm } from './rating-form'

export const metadata = { title: 'Beri Rating' }

export default async function RatePage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  return <RatingForm orderId={orderId} />
}
