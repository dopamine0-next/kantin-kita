"use client"

import * as React from "react"
import { Star, Clock, MapPin, BadgePercent } from "lucide-react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { StallRestaurant } from "./types"

interface StallCardProps {
  stall: StallRestaurant
  index: number
}

export function StallCard({ stall, index }: StallCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
    >
      <Card className="flex flex-row items-stretch rounded-3xl border border-muted/30 hover:border-primary/20 bg-card/60 backdrop-blur-md overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300 cursor-pointer h-36">
        
        {/* Left: 1:1 Aspect-Square Side Cover Image (size-36) */}
        <div className="relative size-36 shrink-0 overflow-hidden bg-muted">
          <img
            src={stall.image}
            alt={stall.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Floating Rating Card */}
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-md text-amber-400 px-1.8 py-0.5 rounded-xl text-[9px] font-bold shadow-md">
            <Star className="size-3 fill-amber-400 stroke-none" />
            <span className="text-white">{stall.rating}</span>
          </div>

          {/* Walk time floating badge */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/95 text-zinc-900 px-1.8 py-0.5 rounded-xl text-[9px] font-bold shadow-md">
            <Clock className="size-3 text-primary" />
            <span>{stall.walkTime} m</span>
          </div>
        </div>

        {/* Right: Stall Details CardContent */}
        <CardContent className="p-4 flex-1 flex flex-col justify-between min-w-0">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors tracking-tight line-clamp-1">
                {stall.name}
              </h3>
              <span className="text-emerald-500 font-extrabold text-[8px] uppercase tracking-wider bg-emerald-500/10 px-1.5 py-0.5 rounded-lg border border-emerald-500/20 shrink-0">
                Buka
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground/80 line-clamp-1 leading-snug font-medium">
              {stall.cuisine}
            </p>
          </div>

          {/* Distance & Stall Stats Row */}
          <div className="flex items-center justify-between text-[10px] font-semibold text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="size-3 text-muted-foreground" />
              <span className="line-clamp-1">Canteen Utama ({stall.distance})</span>
            </div>
          </div>

          {/* PROMO BADGES LIST INSIDE THE STALL CARD */}
          <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-muted/20">
            {stall.promos.map((promo, pIdx) => (
              <Badge
                key={pIdx}
                className="bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-600 border-none font-bold text-[9px] px-2 py-0.5 rounded-lg flex items-center gap-0.8"
              >
                <BadgePercent className="size-3" />
                <span>{promo}</span>
              </Badge>
            ))}
          </div>

        </CardContent>
      </Card>
    </motion.div>
  )
}
