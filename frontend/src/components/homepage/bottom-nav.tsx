"use client"

import * as React from "react"
import { Home, ClipboardList, ShoppingBag, Gift, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  cartCount: number
  onCartClick?: () => void
}

export function BottomNav({ activeTab, setActiveTab, cartCount, onCartClick }: BottomNavProps) {
  const tabs = [
    { id: "home", label: "Beranda", icon: Home },
    { id: "orders", label: "Pesanan", icon: ClipboardList },
    { id: "cart", label: "Keranjang", icon: ShoppingBag, isCenter: true },
    { id: "promo", label: "Promo", icon: Gift },
    { id: "profile", label: "Saya", icon: User },
  ]

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-xl border-t border-muted/30 shadow-2xl flex items-center justify-around px-4 z-40">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        if (tab.isCenter) {
          return (
            <div key={tab.id} className="relative -top-5 z-50">
              <button
                onClick={() => {
                  setActiveTab(tab.id)
                  onCartClick?.()
                }}
                className={cn(
                  "size-14 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-all duration-300",
                  activeTab === "cart"
                    ? "bg-primary shadow-primary/30"
                    : "bg-primary/90 hover:bg-primary shadow-primary/20"
                )}
                aria-label="Keranjang Belanja"
              >
                <Icon className="size-6 animate-pulse" />
              </button>

              {/* Cart Count Badge */}
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-extrabold text-[10px] size-5 rounded-full flex items-center justify-center border-2 border-background animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </div>
          )
        }

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex flex-col items-center justify-center gap-1 flex-1 py-2 text-[10px] font-bold transition-all duration-300 active:scale-95 text-muted-foreground/80 hover:text-foreground"
          >
            <Icon
              className={cn(
                "size-5.5 transition-all duration-300",
                isActive ? "text-primary scale-110 stroke-[2.5]" : "text-muted-foreground/60 stroke-[2]"
              )}
            />
            <span className={cn("transition-colors duration-300", isActive ? "text-primary font-extrabold" : "font-semibold")}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
