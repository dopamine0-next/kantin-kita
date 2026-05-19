"use client"

import * as React from "react"
import { Bell, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  activeMode: "dine-in" | "pickup"
  setActiveMode: (mode: "dine-in" | "pickup") => void
}

export function Header({ activeMode, setActiveMode }: HeaderProps) {
  return (
    <div className="flex flex-col gap-5 px-4 pt-6 pb-2">
      {/* Top Profile & Welcome Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-11 border-2 border-primary/20 transition-transform duration-300 hover:scale-105">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Marwah" />
            <AvatarFallback>MH</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-medium">Selamat datang,</span>
            <span className="text-base font-bold text-foreground tracking-tight flex items-center gap-1">
              Marwah Hamzah <span className="animate-bounce">👋</span>
            </span>
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <Button variant="outline" size="icon" className="size-10 rounded-full border-muted/80 bg-background/50 backdrop-blur-sm shadow-sm hover:bg-muted transition-all duration-300">
            <Bell className="size-5" />
          </Button>
          <span className="absolute top-1 right-1 flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2.5 bg-rose-500"></span>
          </span>
        </div>
      </div>

      {/* Location Bar & Dine In / Pickup Switcher */}
      <div className="flex flex-col gap-3 bg-muted/30 p-3 rounded-2xl border border-muted/50 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="size-3.5 text-primary" />
            <span className="font-semibold text-foreground">Kantin Utama - Lantai 2</span>
          </div>
          <span className="text-primary font-medium">Ubah Lokasi</span>
        </div>

        {/* High-fidelity Sliding Toggle */}
        <div className="relative flex p-1 bg-secondary/80 rounded-xl border border-muted/20">
          {/* Active Highlight Slider */}
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-background rounded-lg shadow-sm transition-all duration-300 ease-out ${
              activeMode === "pickup" ? "left-[calc(50%+2px)]" : "left-1"
            }`}
          />
          
          <button
            onClick={() => setActiveMode("dine-in")}
            className={`relative z-10 flex-1 py-2 text-xs font-semibold text-center transition-colors duration-300 rounded-lg ${
              activeMode === "dine-in" ? "text-foreground" : "text-muted-foreground/80 hover:text-foreground"
            }`}
          >
            🍽️ Makan di Sini
          </button>
          
          <button
            onClick={() => setActiveMode("pickup")}
            className={`relative z-10 flex-1 py-2 text-xs font-semibold text-center transition-colors duration-300 rounded-lg ${
              activeMode === "pickup" ? "text-foreground" : "text-muted-foreground/80 hover:text-foreground"
            }`}
          >
            🛍️ Bawa Pulang
          </button>
        </div>
      </div>
    </div>
  )
}
