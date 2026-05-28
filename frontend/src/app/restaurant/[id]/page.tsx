import RestaurantDetailContainer from '@/components/restaurant/restaurant-detail-container'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function RestaurantDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  return <RestaurantDetailContainer restaurantId={resolvedParams.id} />
}
