'use client'

import { Star } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { formatRupiah } from '@/lib/utils'
import { SearchResult } from '@/services/search/search.types'

interface MenuCardProps {
  menu: SearchResult
  index?: number
}

export function MenuCard({ menu, index = 0 }: MenuCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/restaurant/${menu.stallId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      onClick={handleClick}
      className="border-muted/30 hover:border-primary/20 bg-card/40 group flex cursor-pointer items-center gap-3 rounded-xl border p-2.5 backdrop-blur-md transition-all duration-300 hover:shadow-sm active:scale-[0.99]"
    >
      <div className="bg-muted relative size-14 shrink-0 overflow-hidden rounded-lg shadow-inner">
        <Image
          src={menu.image}
          alt={menu.name}
          fill
          sizes="56px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h4 className="text-foreground group-hover:text-primary line-clamp-1 text-xs leading-snug font-semibold transition-colors">
            {menu.name}
          </h4>
          <span className="text-muted-foreground line-clamp-1 text-[11px] leading-none font-medium">
            {menu.stall}
          </span>
          <div className="text-muted-foreground/80 mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold">
            {menu.rating && menu.ratingCount != null && menu.ratingCount >= 10 && (
              <span className="flex items-center gap-0.5 text-amber-500">
                <Star className="size-3 fill-amber-500 stroke-none" />
                <span className="text-foreground">{menu.rating}</span>
              </span>
            )}
            <span className="text-muted-foreground/60">•</span>
            <span>{menu.prepTime}</span>
          </div>
        </div>
        <span className="text-primary shrink-0 text-xs font-semibold">
          {formatRupiah(menu.price)}
        </span>
      </div>
    </motion.div>
  )
}
