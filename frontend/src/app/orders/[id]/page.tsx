'use client'

import { use } from 'react'
import { ArrowLeft, CheckCircle2, Clock, MapPin, ReceiptText, AlertCircle } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useOrders } from '@/hooks/use-orders'

const STATUS_MAP = {
  pending: { label: 'Menunggu', variant: 'outline' },
  processing: { label: 'Sedang Diproses', variant: 'secondary' },
  ready: { label: 'Siap Diambil', variant: 'default' },
  completed: { label: 'Selesai', variant: 'default' },
  cancelled: { label: 'Dibatalkan', variant: 'destructive' },
} as const

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(val)
}

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { orders } = useOrders()
  
  const order = orders.find((o) => o.id === resolvedParams.id)

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <AlertCircle className="size-10 text-muted-foreground" />
          <h2 className="font-bold">Pesanan tidak ditemukan</h2>
          <Link href="/orders" className="text-primary mt-2 text-sm underline">
            Kembali ke Riwayat
          </Link>
        </div>
      </div>
    )
  }

  const statusConfig = STATUS_MAP[order.status] || { label: order.status, variant: 'outline' }
  
  return (
    <div className="bg-background flex min-h-screen w-full max-w-md flex-col mx-auto border-x border-muted/50 pb-10">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/80 p-4 backdrop-blur-md">
        <Link href="/orders" className="rounded-full bg-muted/50 p-2 hover:bg-muted">
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-base font-bold">Detail Pesanan</h1>
        <div className="w-9" /> {/* Spacer */}
      </div>

      <div className="animate-fade-in flex flex-col gap-5 p-4">
        {/* Status Header */}
        <div className="flex flex-col items-center justify-center gap-3 py-4 text-center">
          <div className="rounded-full bg-primary/20 p-4 text-primary">
            <ReceiptText className="size-10" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-black tracking-tight">Invoice Pesanan</h2>
            <p className="text-muted-foreground text-sm font-medium">ID: {resolvedParams.id.toUpperCase()}</p>
          </div>
          <Badge variant={statusConfig.variant} className="mt-1 px-4 py-1 text-xs">{statusConfig.label}</Badge>
        </div>

        {/* Info Card */}
        <Card className="overflow-hidden border-none bg-muted/30 shadow-none">
          <CardContent className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-background p-2 shadow-sm">
                <MapPin className="size-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-muted-foreground">Lokasi Ambil</span>
                <span className="text-sm font-bold">Kantin Kita - Blok A</span>
              </div>
            </div>
            <div className="h-px w-full bg-border/50" />
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-background p-2 shadow-sm">
                <Clock className="size-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-muted-foreground">Waktu Pesanan</span>
                <span className="text-sm font-bold">
                  {new Date(order.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })} WIB
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items Summary */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold">Ringkasan Pesanan</h3>
          <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-bold">
                    {item.quantity}x
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold leading-none">{item.name}</span>
                  </div>
                </div>
                <span className="text-sm font-bold">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}

            <div className="my-2 h-px w-full border-t border-dashed" />

            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-muted-foreground">Subtotal</span>
              <span className="font-bold">{formatCurrency(order.total_amount - 2000)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-muted-foreground">Biaya Layanan</span>
              <span className="font-bold">Rp 2.000</span>
            </div>
            
            <div className="mt-1 flex items-center justify-between rounded-xl bg-primary/10 p-3">
              <span className="font-bold text-primary">Total Bayar</span>
              <span className="text-lg font-black text-primary">{formatCurrency(order.total_amount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
