'use client'

import { ReceiptText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface InvoiceStatusProps {
  orderId: string
  status: string
}

const STATUS_MAP = {
  pending: { label: 'Menunggu', variant: 'outline' },
  processing: { label: 'Sedang Diproses', variant: 'secondary' },
  ready: { label: 'Siap Diambil', variant: 'default' },
  completed: { label: 'Selesai', variant: 'default' },
  cancelled: { label: 'Dibatalkan', variant: 'destructive' },
} as const

export function InvoiceStatus({ orderId, status }: InvoiceStatusProps) {
  const statusConfig = STATUS_MAP[status as keyof typeof STATUS_MAP] || { label: status, variant: 'outline' }

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-4 text-center">
      <div className="rounded-full bg-primary/20 p-4 text-primary">
        <ReceiptText className="size-10" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-black tracking-tight">Invoice Pesanan</h2>
        <p className="text-muted-foreground text-sm font-medium">ID: {orderId.toUpperCase()}</p>
      </div>
      <Badge variant={statusConfig.variant} className="mt-1 px-4 py-1 text-xs">
        {statusConfig.label}
      </Badge>
    </div>
  )
}
