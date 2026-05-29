import { BottomNav } from '@/components/homepage/bottom-nav'
import { OrdersContainer } from '@/components/orders/orders-container'

export default function OrdersPage() {
  return (
    <>
      <div className="no-scrollbar flex-1 overflow-y-auto pb-24">
        <OrdersContainer />
      </div>
      <BottomNav />
    </>
  )
}
