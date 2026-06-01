'use client'

import { FileText, Minus, Plus, Settings2 } from 'lucide-react'
import { motion } from 'motion/react'

import { CartItem } from '@/store/useCartStore'

interface CartItemListProps {
  items: CartItem[]
  onUpdateQty: (id: string, qty: number) => void
  onUpdateNote: (id: string, note: string) => void
  onEditItem: (item: CartItem) => void
}

export function CartItemList({ items, onUpdateQty, onUpdateNote, onEditItem }: CartItemListProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-foreground pl-1 text-xs font-black tracking-wider uppercase">
        Daftar Makanan & Minuman
      </h2>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            exit={{ opacity: 0, x: -50 }}
            className="bg-card/40 border-muted/20 flex flex-col gap-3 rounded-2xl border p-3"
          >
            <div className="flex gap-3">
              {/* Thumbnail */}
              <img
                src={item.image}
                alt={item.name}
                className="size-14 shrink-0 rounded-xl object-cover"
              />

              {/* Info and price */}
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex flex-col">
                  <h3 className="text-foreground line-clamp-1 text-xs leading-snug font-black">
                    {item.name}
                  </h3>

                  {/* Price and variant indicator (simplified as requested) */}
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-muted-foreground/60 text-xs font-semibold">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    {item.variant && (
                      <span className="text-muted-foreground/40 text-xs font-medium italic">
                        • {item.variant}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-foreground mt-1 text-xs font-black">
                  Subtotal: Rp {(item.price * item.qty).toLocaleString('id-ID')}
                </div>
              </div>

              {/* Actions: Edit and Qty */}
              <div className="flex flex-col items-end justify-between gap-2">
                <button
                  onClick={() => onEditItem(item)}
                  className="bg-primary/5 text-primary hover:bg-primary/10 flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-black transition-colors"
                >
                  <Settings2 className="size-3" />
                  <span>Ubah</span>
                </button>

                <div className="bg-muted/40 border-muted/15 flex h-7.5 shrink-0 items-center gap-1 rounded-xl border p-0.5 align-middle">
                  <button
                    onClick={() => onUpdateQty(item.id, item.qty - 1)}
                    className="bg-card text-foreground hover:bg-muted flex size-6.5 items-center justify-center rounded-lg shadow-sm transition-colors"
                  >
                    <Minus className="size-2.5" />
                  </button>
                  <span className="text-foreground w-5 text-center text-xs font-black">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => onUpdateQty(item.id, item.qty + 1)}
                    className="bg-card text-foreground hover:bg-muted flex size-6.5 items-center justify-center rounded-lg shadow-sm transition-colors"
                  >
                    <Plus className="size-2.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Note writer input (always visible for convenience) */}
            <div className="border-muted/10 bg-muted/30 border-t pt-2.5">
              <div className="border-muted/15 flex items-center gap-1.5 rounded-lg border px-2 py-1">
                <FileText className="text-muted-foreground/60 size-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Tambah catatan rasa..."
                  value={item.note || ''}
                  onChange={(e) => onUpdateNote(item.id, e.target.value)}
                  className="text-foreground placeholder:text-muted-foreground/45 w-full border-none bg-transparent py-0.5 text-xs font-bold focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
