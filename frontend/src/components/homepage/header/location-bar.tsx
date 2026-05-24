'use client'

import { MapPin } from 'lucide-react'

import { ModeToggle } from './mode-toggle'

interface LocationBarProps {
  activeMode: 'dine-in' | 'pickup'
  setActiveMode: (mode: 'dine-in' | 'pickup') => void
}

export function LocationBar({ activeMode, setActiveMode }: LocationBarProps) {
  return (
    <div className="bg-card/45 border-muted/20 flex flex-col gap-3 rounded-[20px] border p-3.5 shadow-sm backdrop-blur-md">
      <div className="flex items-center justify-between text-xs">
        <div className="text-muted-foreground flex items-center gap-1.5 font-semibold">
          <MapPin className="text-primary size-3.5 shrink-0" />
          <span className="text-foreground font-bold">
            Kantin Kita - Pusat
          </span>
        </div>
        <button
          className="text-primary text-[10px] font-extrabold tracking-wider uppercase opacity-50 cursor-not-allowed"
          disabled
        >
          Pilih Lokasi
        </button>
      </div>

      <ModeToggle activeMode={activeMode} setActiveMode={setActiveMode} />
    </div>
  )
}
