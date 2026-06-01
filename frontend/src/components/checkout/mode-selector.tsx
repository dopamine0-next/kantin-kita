'use client'

import { Info, ShoppingBag, Utensils } from 'lucide-react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

interface ModeSelectorProps {
  activeMode: 'dine-in' | 'pickup'
  onModeChange: (mode: 'dine-in' | 'pickup') => void
}

export function ModeSelector({ activeMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-muted/40 border-muted/20 relative flex rounded-2xl border p-1.5">
        <button
          onClick={() => onModeChange('dine-in')}
          className={cn(
            'relative z-10 flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all duration-300',
            activeMode === 'dine-in'
              ? 'text-primary-foreground'
              : 'text-muted-foreground/85 hover:text-foreground'
          )}
        >
          <Utensils className="size-4" />
          <span>Makan di Tempat</span>
          {activeMode === 'dine-in' && (
            <motion.div
              layoutId="activeModeBg"
              className="bg-primary shadow-primary/15 absolute inset-0 -z-10 rounded-xl shadow-md"
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            />
          )}
        </button>

        <button
          onClick={() => onModeChange('pickup')}
          className={cn(
            'relative z-10 flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all duration-300',
            activeMode === 'pickup'
              ? 'text-primary-foreground'
              : 'text-muted-foreground/85 hover:text-foreground'
          )}
        >
          <ShoppingBag className="size-4" />
          <span>Bawa Pulang</span>
          {activeMode === 'pickup' && (
            <motion.div
              layoutId="activeModeBg"
              className="bg-primary shadow-primary/15 absolute inset-0 -z-10 rounded-xl shadow-md"
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            />
          )}
        </button>
      </div>

      <div className="bg-primary/5 border-primary/10 text-primary/90 flex gap-2.5 rounded-xl border p-3 text-xs font-medium">
        <Info className="text-primary size-4 shrink-0" />
        <span>
          {activeMode === 'dine-in'
            ? 'Makanan akan disajikan hangat di meja kantin utama. Harap siapkan nomor meja saat memesan.'
            : 'Makanan dikemas untuk dibawa pulang. Anda akan menerima notifikasi siap ambil dalam 10-15 menit.'}
        </span>
      </div>
    </div>
  )
}
