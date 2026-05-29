'use client'

import { useEffect, useState } from 'react'

import { PanInfo } from 'motion/react'

import { BannerCard } from '@/components/homepage/banner-card'
import { useBanners } from '@/hooks/use-banners'

export function Banner() {
  const { banners, isLoading } = useBanners()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (banners.length === 0) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [banners.length])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) {
      setActiveIndex((prev) => (prev + 1) % banners.length)
    } else if (info.offset.x > 50) {
      setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length)
    }
  }

  if (isLoading) {
    return (
      <div className="px-4 py-2">
        <div className="h-44 w-full animate-pulse rounded-2xl bg-muted/20" />
      </div>
    )
  }

  if (banners.length === 0) return null

  return (
    <div className="flex flex-col gap-3 pb-2 pt-1 overflow-visible">
      {/* Stacked Carousel Container */}
      <div className="relative flex h-48 w-full items-center justify-center">
        {banners.map((item, index) => (
          <BannerCard
            key={item.id}
            item={item}
            index={index}
            activeIndex={activeIndex}
            totalItems={banners.length}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>

      {/* Custom Dot Indicators */}
      <div className="flex items-center justify-center gap-1.5 py-1">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? 'bg-primary w-5'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-1.5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

