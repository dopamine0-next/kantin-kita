"use client"

import * as React from "react"
import { Sparkles, TrendingUp, Percent, Gift } from "lucide-react"

interface PromoItem {
  icon: string
  text: string
  color: string
}

const PROMO_ITEMS: PromoItem[] = [
  { icon: "🔥", text: "Soto Mbok Sri: Diskon 20%", color: "text-amber-500" },
  { icon: "🌶️", text: "Ayam Geprek Gahar: Diskon 30%", color: "text-rose-500" },
  { icon: "☕", text: "Kopi Kanto: Combo Hemat", color: "text-amber-600" },
  { icon: "🍜", text: "Mie Ayam Pak Dadi: Diskon 25%", color: "text-yellow-500" },
  { icon: "🍤", text: "Seafood Selera Rasa: Diskon 15%", color: "text-cyan-500" },
]

export function PromoMarquee() {
  // Duplicate the promo items to create a seamless infinite scroll loop
  const duplicatedItems = [...PROMO_ITEMS, ...PROMO_ITEMS, ...PROMO_ITEMS]

  return (
    <div className="relative w-full overflow-hidden bg-zinc-950 text-white py-2.5 border-y border-zinc-900 shadow-sm flex items-center select-none">
      {/* Self-contained CSS for the marquee animation */}
      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .marquee-track-container {
          display: flex;
          width: max-content;
          animation: marqueeScroll 25s linear infinite !important;
        }
      `}</style>

      {/* Decorative Glow */}
      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* Scrolling Track */}
      <div className="marquee-track-container flex items-center gap-8 pl-4">
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 shrink-0 font-extrabold text-[10px] uppercase tracking-wider text-zinc-300"
          >
            <span className="text-xs">{item.icon}</span>
            <span>{item.text}</span>
            <span className="mx-2 text-zinc-700">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}
