import { Clock, ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Order } from '@/services/order/order.types'

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(val)
}

export interface OrderCardProps {
  order: Order
  index?: number
}

export function OrderCard({ order, index = 0 }: OrderCardProps) {
  const router = useRouter()

  const dateStr = new Date(order.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  // Format the item items text summary
  const itemsSummary =
    order.items
      .slice(0, 2)
      .map((item) => `${item.quantity}x ${item.name}`)
      .join(', ') + (order.items.length > 2 ? `, +${order.items.length - 2} items` : '')

  return (
    <motion.div
      onClick={() => router.push(`/orders/${order.id}`)}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="border-muted/30 bg-card/40 hover:border-primary/20 hover:shadow-primary/[0.02] mb-3 flex cursor-pointer flex-col gap-3 rounded-2xl border p-3 backdrop-blur-md transition-all duration-300 hover:shadow-md active:scale-[0.99]"
    >
      <div className="flex gap-3.5">
        {/* Restaurant Image */}
        <div className="relative size-14 shrink-0 overflow-hidden rounded-xl shadow-inner">
          <Image
            src={
              order.restaurant_image ||
              'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=150&q=80'
            }
            alt={order.restaurant_name}
            fill
            sizes="56px"
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Order Details */}
        <div className="flex h-full min-w-0 flex-1 flex-col justify-between gap-1">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-foreground hover:text-primary line-clamp-1 text-sm leading-snug font-bold tracking-tight transition-colors">
                {order.restaurant_name}
              </h3>
            </div>

            {/* Timestamp */}
            <div className="text-muted-foreground/80 flex items-center gap-1 text-xs font-medium">
              <Clock className="size-3" />
              {dateStr}
            </div>
          </div>

          {/* Items Summary string */}
          <div className="text-muted-foreground/80 mt-1 line-clamp-1 text-xs leading-snug font-medium">
            {itemsSummary}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-border/50 h-px w-full" />

      {/* Footer Total */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold">Total Pembayaran</span>
        <span className="text-primary text-sm font-bold">{formatCurrency(order.total_amount)}</span>
      </div>

      {/* Conditional Action Button */}
      {order.status === 'pending' && order.payment_status === 'unpaid' && order.payment_url && (
        <Button
          size="sm"
          className="mt-1 w-full rounded-xl font-bold"
          onClick={(e) => {
            e.stopPropagation()
            window.location.href = order.payment_url!
          }}
        >
          <ExternalLink className="mr-1 size-4" />
          Bayar Sekarang
        </Button>
      )}
      {order.status === 'ready' && (
        <Button
          size="sm"
          className="mt-1 w-full rounded-xl font-bold"
          onClick={(e) => {
            e.stopPropagation()
            toast.success('Pesanan telah dikonfirmasi sudah diambil!')
          }}
        >
          Konfirmasi Sudah Diambil
        </Button>
      )}
    </motion.div>
  )
}
