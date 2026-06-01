'use client'

import { Gift, Percent, Sparkles, TrendingUp } from 'lucide-react'

import { useMarquee } from '@/hooks/use-marquee'

export function PromoMarquee() {
  const { marqueeItems, isLoading } = useMarquee()

  // Jika loading atau kosong, kita bisa mereturn null atau skeleton
  if (isLoading)
    return <div className="h-10 w-full animate-pulse border-y border-border bg-secondary" />
  if (marqueeItems.length === 0) return null

  // Duplicate the promo items to create a seamless infinite scroll loop
  const duplicatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems]

  return (
    <div className="relative flex w-full items-center overflow-hidden border-y border-border bg-primary py-2.5 text-primary-foreground shadow-sm select-none">
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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-primary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-primary to-transparent" />

      {/* Scrolling Track */}
      <div className="marquee-track-container flex items-center gap-8 pl-4">
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex shrink-0 items-center gap-2 text-xs font-extrabold tracking-wider text-primary-foreground uppercase"
          >
            <span className="text-xs">{item.icon}</span>
            <span>{item.text}</span>
            <span className="mx-2 text-primary-foreground/40">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}
