"use client"

import * as React from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"

const BANNER_PROMOS = [
  {
    id: 1,
    title: "Spesial Combo Hemat",
    subtitle: "Dapatkan paket nasi goreng spesial + es teh manis dingin!",
    promoText: "DISKON 40%",
    priceText: "Cuma Rp 18.000",
    bgGradient: "from-amber-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Soto Legendaris",
    subtitle: "Soto Mbok Sri gurih, resep rahasia turun temurun.",
    promoText: "HARI INI SAJA",
    priceText: "Potongan Rp 5.000",
    bgGradient: "from-rose-500 to-red-600",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Camilan Sore Ceria",
    subtitle: "Pisang goreng keju crispy & kopi susu gula aren hangat.",
    promoText: "FREE ONGKIR",
    priceText: "Hanya Rp 15.000",
    bgGradient: "from-yellow-500 to-amber-600",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80",
  },
]

export function Banner() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [api, setApi] = React.useState<any>(null)

  React.useEffect(() => {
    if (!api) return

    api.on("select", () => {
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
    <div className="px-4 py-2 flex flex-col gap-3">
      <Carousel setApi={setApi} className="w-full overflow-hidden rounded-2xl shadow-md border border-muted/20">
        <CarouselContent>
          {BANNER_PROMOS.map((promo) => (
            <CarouselItem key={promo.id}>
              <div className="relative h-44 w-full overflow-hidden select-none">
                {/* Background Food Image with Dark/Color overlay */}
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${promo.bgGradient} opacity-85 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Content Overlay */}
                <div className="relative size-full p-5 flex flex-col justify-between z-10 text-white">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-none font-bold text-[10px] tracking-wider px-2 py-0.5 rounded-full">
                      {promo.promoText}
                    </Badge>
                    <span className="text-xs font-bold text-amber-200 drop-shadow-md">Kantin Kita</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold leading-tight drop-shadow">{promo.title}</h3>
                    <p className="text-[11px] text-white/90 line-clamp-1 leading-snug">{promo.subtitle}</p>
                    <span className="text-sm font-extrabold text-amber-300 drop-shadow mt-1">{promo.priceText}</span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* custom dot indicators */}
      <div className="flex justify-center items-center gap-1.5 py-1">
        {BANNER_PROMOS.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
