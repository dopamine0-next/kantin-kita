'use client'

import { AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

import { useOrder } from '@/hooks/use-orders'

import { InvoiceHeader } from './invoice-header'
import { InvoiceInfo } from './invoice-info'
import { InvoiceStatus } from './invoice-status'
import { InvoiceSummary } from './invoice-summary'

interface InvoiceContainerProps {
  orderId: string
}

export function InvoiceContainer({ orderId }: InvoiceContainerProps) {
  const { order, isLoading } = useOrder(orderId)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="text-primary size-10 animate-spin" />
          <h2 className="font-semibold">Memuat Detail Pesanan...</h2>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="text-muted-foreground size-10" />
          <h2 className="font-semibold">Pesanan tidak ditemukan</h2>
          <Link href="/orders" className="text-primary mt-2 text-sm underline">
            Kembali ke Riwayat
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col pb-10">
      <InvoiceHeader />

      <div className="animate-fade-in flex flex-col gap-5 p-4">
        <InvoiceStatus
          orderId={orderId}
          status={order.status}
          paymentStatus={order.payment_status}
          paymentUrl={order.payment_url}
        />
        <InvoiceInfo createdAt={order.created_at} />
        <InvoiceSummary
          items={order.items}
          totalAmount={order.total_amount}
          discountAmount={order.discount_amount}
          appFee={order.app_fee}
        />
      </div>
    </div>
  )
}
