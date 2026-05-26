'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const BANNER_PROMOS = [
  {
    id: 1,
    restaurantId: 'stall-1',
    title: 'Spesial Combo Hemat',
    subtitle: 'Dapatkan paket nasi goreng spesial + es teh manis dingin!',
    promoText: 'DISKON 40%',
    priceText: 'Cuma Rp 18.000',
    bgGradient: 'from-amber-500 to-orange-600',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    restaurantId: 'stall-1',
    title: 'Soto Legendaris',
    subtitle: 'Soto Mbok Sri gurih, resep rahasia turun temurun.',
    promoText: 'HARI INI SAJA',
    priceText: 'Potongan Rp 5.000',
    bgGradient: 'from-rose-500 to-red-600',
    image:
      'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    restaurantId: 'stall-3',
    title: 'Camilan Sore Ceria',
    subtitle: 'Pisang goreng keju crispy & kopi susu gula aren hangat.',
    promoText: 'DISKON S.D 30%',
    priceText: 'Hanya Rp 15.000',
    bgGradient: 'from-yellow-500 to-amber-600',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80',
  },
]

export function Banner() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return

    api.on('select', () => {
      setActiveIndex(api.selectedScrollSnap())
    })

    // Setup automatic swiping every 3 seconds
    const autoplayInterval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0) // Wrap around to the first slide
      }
    }, 3000)

    return () => clearInterval(autoplayInterval)
  }, [api])

  return (
    <div className="flex flex-col gap-3 pb-2">
      <Carousel
        setApi={setApi}
        className="w-full overflow-hidden shadow-sm"
      >
        <CarouselContent>
          {BANNER_PROMOS.map((promo) => (
            <CarouselItem key={promo.id}>
              <Link href={`/restaurant/${promo.restaurantId}`} className="relative block h-44 w-full overflow-hidden select-none">
                {/* Background Food Image with Dark/Color overlay */}
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${promo.bgGradient} opacity-85 mix-blend-multiply`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
                  <div className="flex items-start justify-between">
                    <Badge className="rounded-full border-none bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white backdrop-blur-md hover:bg-white/30">
                      {promo.promoText}
                    </Badge>
                    <span className="text-xs font-bold text-amber-200 drop-shadow-md">
                      Kantin Kita
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg leading-tight font-bold drop-shadow">{promo.title}</h3>
                    <p className="line-clamp-1 text-[11px] leading-snug text-white/90">
                      {promo.subtitle}
                    </p>
                    <span className="mt-1 text-sm font-extrabold text-amber-300 drop-shadow">
                      {promo.priceText}
                    </span>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* custom dot indicators */}
      <div className="flex items-center justify-center gap-1.5 py-1">
        {BANNER_PROMOS.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
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
