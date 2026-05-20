"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { useCartStore } from "@/store/useCartStore"
import { ShoppingBag, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export function FloatingCheckoutButton() {
  const router = useRouter()
  const pathname = usePathname()
  const items = useCartStore((state) => state.items)

  // Do not show the floating checkout button on the checkout page itself
  if (pathname === "/checkout") return null

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
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[calc(448px-2rem)] z-40"
        >
          <button
            onClick={() => router.push("/checkout")}
            className="w-full h-14 bg-primary text-primary-foreground font-extrabold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 flex items-center justify-between px-5 hover:bg-primary/95 active:scale-[0.99] transition-all duration-300 backdrop-blur-md relative overflow-hidden group"
          >
            {/* Left side: Shopping count */}
            <div className="flex items-center gap-3.5">
              <div className="size-8 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                <ShoppingBag className="size-4.5" />
              </div>
              <div className="flex flex-col items-start leading-snug">
                <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider">
                  Keranjang Belanja
                </span>
                <span className="text-xs font-black text-white">
                  {totalItems} Item • Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Right side: Click to action */}
            <div className="flex items-center gap-1.5 text-xs text-white bg-white/10 px-3 py-1.5 rounded-xl border border-white/5 group-hover:bg-white/15 transition-colors">
              <span>Checkout</span>
              <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* Ambient sliding light glow reflection */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
