'use client'

import { ExternalLink, ReceiptText } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface InvoiceStatusProps {
  orderId: string
  status: string
  paymentStatus: string
  paymentUrl?: string
}

const STATUS_MAP: Record<string, string> = {
  pending: 'Menunggu Pembayaran',
  processing: 'Sedang Diproses',
  ready: 'Siap Diambil',
  completed: 'Selesai',
  cancelled: 'Dibatalkan',
}

export function InvoiceStatus({ orderId, status, paymentStatus, paymentUrl }: InvoiceStatusProps) {
  const label = STATUS_MAP[status] || status

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-4 text-center">
      <div className="bg-primary/20 text-primary rounded-full p-4">
        <ReceiptText className="size-10" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-black tracking-tight">Invoice Pesanan</h2>
        <p className="text-muted-foreground text-sm font-medium">ID: {orderId.toUpperCase()}</p>
      </div>
      <span className="text-muted-foreground mt-1 text-sm font-semibold">{label}</span>

      {status === 'pending' && paymentStatus === 'unpaid' && paymentUrl && (
        <Button
          size="sm"
          className="mt-3 w-full rounded-xl font-bold"
          onClick={() => {
            window.location.href = paymentUrl
          }}
        >
          <ExternalLink className="mr-1 size-4" />
          Bayar Sekarang
        </Button>
      )}
    </div>
  )
}
