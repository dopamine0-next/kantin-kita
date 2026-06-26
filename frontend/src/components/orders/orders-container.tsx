'use client'

import { ClipboardList } from 'lucide-react'

import { OrderCard } from '@/components/orders/order-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useOrders } from '@/hooks/use-orders'
import { Order } from '@/services/order/order.types'

const TABS = [
  { value: 'all', label: 'Semua' },
  { value: 'active', label: 'Aktif' },
  { value: 'ready', label: 'Siap' },
  { value: 'completed', label: 'Selesai' },
] as const

const EMPTY_MESSAGES: Record<string, string> = {
  all: 'Belum ada riwayat pesanan',
  active: 'Tidak ada pesanan aktif',
  ready: 'Belum ada pesanan yang siap diambil',
  completed: 'Belum ada riwayat pesanan selesai',
}

function filterOrders(orders: Order[], tab: string): Order[] {
  switch (tab) {
    case 'active':
      return orders.filter((o) => o.status === 'pending' || o.status === 'processing')
    case 'ready':
      return orders.filter((o) => o.status === 'ready')
    case 'completed':
      return orders.filter((o) => o.status === 'completed')
    default:
      return orders
  }
}

export function OrdersContainer() {
  const { orders, isLoading } = useOrders()

  const renderList = (list: Order[], emptyMessage: string) => {
    if (isLoading) {
      return (
        <div className="mt-4 flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      )
    }

    if (list.length === 0) {
      return (
        <div className="text-muted-foreground mt-10 flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-muted/30 mb-3 rounded-full p-4">
            <ClipboardList className="size-8 opacity-50" />
          </div>
          <p className="text-sm font-medium">{emptyMessage}</p>
        </div>
      )
    }

    return (
      <div className="mt-4 flex flex-col">
        {list.map((order, idx) => (
          <OrderCard key={order.id} order={order} index={idx} />
        ))}
      </div>
    )
  }

  return (
    <div className="animate-fade-in flex min-h-full flex-col p-4">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Riwayat Pesanan</h1>
        <p className="text-muted-foreground text-sm font-medium">Lacak semua pesananmu di sini.</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="border-muted/30 -mx-4 overflow-x-auto overflow-y-hidden border-b px-4">
          <TabsList
            variant="line"
            className="inline-flex w-auto min-w-full justify-start gap-2 bg-transparent p-0"
          >
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="shrink-0 rounded-none px-3 py-2.5 text-xs font-semibold group-data-horizontal/tabs:after:bottom-0"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            {renderList(filterOrders(orders, tab.value), EMPTY_MESSAGES[tab.value])}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
