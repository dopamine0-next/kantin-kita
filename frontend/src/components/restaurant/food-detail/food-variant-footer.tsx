'use client'

import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'

interface FoodVariantFooterProps {
  qty: number
  totalPrice: number
  onIncrement: () => void
  onDecrement: () => void
  onAddToCart: () => void
}

export function FoodVariantFooter({
  qty,
  totalPrice,
  onIncrement,
  onDecrement,
  onAddToCart,
}: FoodVariantFooterProps) {
  return (
    <div className="border-muted/30 mt-6 flex flex-col gap-4 border-t pt-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black tracking-wider uppercase text-foreground">
          Jumlah Pesanan
        </span>
        <div className="bg-muted/40 border-muted/20 flex shrink-0 items-center gap-1.5 rounded-2xl border p-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onDecrement}
            className="bg-card text-foreground active:bg-muted flex size-8 items-center justify-center rounded-xl shadow-sm transition-colors"
          >
            <Minus className="size-3.5" />
          </motion.button>
          <span className="text-foreground w-8 text-center text-xs font-black">{qty}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onIncrement}
            className="bg-card text-foreground active:bg-muted flex size-8 items-center justify-center rounded-xl shadow-sm transition-colors"
          >
            <Plus className="size-3.5" />
          </motion.button>
        </div>
      </div>

      <motion.div whileTap={{ scale: 0.98 }} className="w-full">
        <Button
          onClick={onAddToCart}
          className="bg-primary flex h-11 w-full items-center justify-center gap-2 rounded-2xl text-xs font-extrabold tracking-wide text-white shadow-lg shadow-primary/20 hover:bg-primary/95 hover:shadow-primary/30"
        >
          <ShoppingBag className="size-4" />
          <span>Masukkan • Rp {totalPrice.toLocaleString('id-ID')}</span>
        </Button>
      </motion.div>
    </div>
  )
}
