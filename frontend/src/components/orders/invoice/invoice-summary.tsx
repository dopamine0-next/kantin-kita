'use client'

import { formatRupiah } from '@/lib/utils'

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface InvoiceSummaryProps {
  items: OrderItem[]
  totalAmount: number
  serviceFee?: number
}

export function InvoiceSummary({ items, totalAmount, serviceFee = 2000 }: InvoiceSummaryProps) {
  const subtotal = totalAmount - serviceFee

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold">Ringkasan Pesanan</h3>
      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-bold">
                {item.quantity}x
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-none">{item.name}</span>
              </div>
            </div>
            <span className="text-sm font-bold">{formatRupiah(item.price * item.quantity)}</span>
          </div>
        ))}

        <div className="my-2 h-px w-full border-t border-dashed" />

        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-muted-foreground">Subtotal</span>
          <span className="font-bold">{formatRupiah(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-muted-foreground">Biaya Layanan</span>
          <span className="font-bold">{formatRupiah(serviceFee)}</span>
        </div>
        
        <div className="mt-1 flex items-center justify-between rounded-xl bg-primary/10 p-3">
          <span className="font-bold text-primary">Total Bayar</span>
          <span className="text-lg font-black text-primary">{formatRupiah(totalAmount)}</span>
        </div>
      </div>
    </div>
  )
}
