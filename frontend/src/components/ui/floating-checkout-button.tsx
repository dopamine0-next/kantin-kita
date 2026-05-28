'use client'

import * as React from 'react'

import { ChevronRight, ShoppingBag } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname, useRouter } from 'next/navigation'

import { useCartStore } from '@/store/useCartStore'

export function FloatingCheckoutButton() {
  const router = useRouter()
  const pathname = usePathname()
  const items = useCartStore((state) => state.items)

  // Do not show the floating checkout button on the checkout page itself
  if (pathname === '/checkout') return null

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  const showButton = items.length > 0

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-2rem)] max-w-[calc(448px-2rem)] -translate-x-1/2"
        >
          <button
            onClick={() => router.push('/checkout')}
            className="bg-primary text-primary-foreground shadow-primary/20 hover:shadow-primary/30 hover:bg-primary/95 group relative flex h-14 w-full items-center justify-between overflow-hidden rounded-2xl px-5 font-extrabold shadow-xl backdrop-blur-md transition-all duration-300 active:scale-[0.99]"
          >
            {/* Left side: Shopping count */}
            <div className="flex items-center gap-3.5">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white transition-transform group-hover:scale-105">
                <ShoppingBag className="size-4.5" />
              </div>
              <div className="flex flex-col items-start leading-snug">
                <span className="text-[10px] font-bold tracking-wider text-white/70 uppercase">
                  Keranjang Belanja
                </span>
                <span className="text-xs font-black text-white">
                  {totalItems} Item • Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Right side: Click to action */}
            <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/10 px-3 py-1.5 text-xs text-white transition-colors group-hover:bg-white/15">
              <span>Checkout</span>
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </div>

            {/* Ambient sliding light glow reflection */}
            <div className="group-hover:animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
