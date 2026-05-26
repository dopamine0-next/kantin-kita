'use client'

import { ClipboardList } from 'lucide-react'
import { OrderCard } from '@/components/orders/order-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useOrders } from '@/hooks/use-orders'
import { Order } from '@/services/order/order.types'

export function OrdersContainer() {
  const { orders, isLoading } = useOrders()

  const activeOrders = orders.filter(
    (o) => o.status === 'pending' || o.status === 'processing'
  )
  const readyOrders = orders.filter((o) => o.status === 'ready')
  const completedOrders = orders.filter((o) => o.status === 'completed')
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
        <h1 className="text-xl font-extrabold tracking-tight">Riwayat Pesanan</h1>
        <p className="text-muted-foreground text-sm font-medium">Lacak semua pesananmu di sini.</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-muted/50 grid w-full grid-cols-3 rounded-lg p-1">
          <TabsTrigger value="active" className="rounded-md text-xs font-bold">
            Proses
          </TabsTrigger>
          <TabsTrigger value="ready" className="rounded-md text-xs font-bold">
            Siap Diambil
          </TabsTrigger>
          <TabsTrigger value="completed" className="rounded-md text-xs font-bold">
            Selesai
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          {renderList(activeOrders, 'Belum ada pesanan yang sedang diproses')}
        </TabsContent>
        <TabsContent value="ready" className="mt-4">
          {renderList(readyOrders, 'Belum ada pesanan yang siap diambil')}
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          {renderList(completedOrders, 'Belum ada riwayat pesanan selesai')}
        </TabsContent>
      </Tabs>
    </div>
  )
}
