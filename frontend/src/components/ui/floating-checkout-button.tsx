'use client'

import { ChevronRight, ShoppingBag } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
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
  const hasBottomNav = ['/', '/orders', '/profile'].some((path) =>
    path === '/' ? pathname === '/' : pathname?.startsWith(path)
  )

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          className={cn(
            'fixed left-1/2 z-40 w-[calc(100%-3rem)] max-w-md -translate-x-1/2',
            hasBottomNav ? 'bottom-26' : 'bottom-6'
          )}
        >
          <button
            onClick={() => router.push('/checkout')}
            className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/95 flex h-12 w-full items-center justify-between rounded-full px-2 pr-4 shadow-xl transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="bg-secondary/20 flex size-8 items-center justify-center rounded-full">
                <ShoppingBag className="size-4" />
              </div>
              <div className="flex items-center gap-2 text-xs font-black tracking-tight">
                <span>{totalItems} Pesanan</span>
                <span className="bg-primary-foreground/30 h-3 w-px" />
                <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <ChevronRight className="size-4 opacity-70" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
