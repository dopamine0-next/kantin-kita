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
      <div className="bg-card flex flex-col gap-3 rounded-2xl border p-4 shadow-sm">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <div className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-bold">
                {item.quantity}x
              </div>
              <div className="flex flex-col">
                <span className="text-sm leading-none font-bold">{item.name}</span>
              </div>
            </div>
            <span className="text-sm font-bold">{formatRupiah(item.price * item.quantity)}</span>
          </div>
        ))}

        <div className="my-2 h-px w-full border-t border-dashed" />

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-semibold">Subtotal</span>
          <span className="font-bold">{formatRupiah(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-semibold">Biaya Layanan</span>
          <span className="font-bold">{formatRupiah(serviceFee)}</span>
        </div>

        <div className="bg-primary/10 mt-1 flex items-center justify-between rounded-xl p-3">
          <span className="text-primary font-bold">Total Bayar</span>
          <span className="text-primary text-lg font-black">{formatRupiah(totalAmount)}</span>
        </div>
      </div>
    </div>
  )
}
