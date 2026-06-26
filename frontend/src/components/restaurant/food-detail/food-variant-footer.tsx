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
  disabled?: boolean
}

export function FoodVariantFooter({
  qty,
  totalPrice,
  onIncrement,
  onDecrement,
  onAddToCart,
  disabled,
}: FoodVariantFooterProps) {
  return (
    <div className="border-muted/30 mt-6 flex flex-col gap-4 border-t pt-4">
      <div className="flex items-center justify-between">
        <span className="text-foreground text-xs font-semibold">Jumlah Pesanan</span>
        <div className="bg-muted/40 border-muted/20 flex shrink-0 items-center gap-1.5 rounded-2xl border p-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onDecrement}
            className="bg-card text-foreground active:bg-muted flex size-8 items-center justify-center rounded-xl shadow-sm transition-colors"
          >
            <Minus className="size-3.5" />
          </motion.button>
          <span className="text-foreground w-8 text-center text-xs font-semibold">{qty}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onIncrement}
            className="bg-card text-foreground active:bg-muted flex size-8 items-center justify-center rounded-xl shadow-sm transition-colors"
          >
            <Plus className="size-3.5" />
          </motion.button>
        </div>
      </div>

      <motion.div whileTap={disabled ? undefined : { scale: 0.98 }} className="w-full">
        <Button
          onClick={onAddToCart}
          disabled={disabled}
          className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/95 hover:shadow-primary/30 flex h-11 w-full items-center justify-center gap-2 rounded-2xl text-xs font-semibold shadow-lg disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ShoppingBag className="size-4" />
          <span>
            {disabled
              ? 'Restoran Sedang Tutup'
              : `Masukkan • Rp ${totalPrice.toLocaleString('id-ID')}`}
          </span>
        </Button>
      </motion.div>
    </div>
  )
}
