'use client'

import { ClipboardList, Gift, Home, ShoppingBag, User } from 'lucide-react'

import { cn } from '@/lib/utils'

interface BottomNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  cartCount: number
  onCartClick?: () => void
}

export function BottomNav({ activeTab, setActiveTab, cartCount, onCartClick }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'orders', label: 'Pesanan', icon: ClipboardList },
    { id: 'cart', label: 'Keranjang', icon: ShoppingBag, isCenter: true },
    { id: 'promo', label: 'Promo', icon: Gift },
    { id: 'profile', label: 'Saya', icon: User },
  ]

  return (
    <div className="bg-background/80 border-muted/30 absolute right-0 bottom-0 left-0 z-40 flex h-20 items-center justify-around border-t px-4 shadow-2xl backdrop-blur-xl">
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
                  'flex size-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 active:scale-95',
                  activeTab === 'cart'
                    ? 'bg-primary shadow-primary/30'
                    : 'bg-primary/90 hover:bg-primary shadow-primary/20'
                )}
                aria-label="Keranjang Belanja"
              >
                <Icon className="size-6 animate-pulse" />
              </button>

              {/* Cart Count Badge */}
              {cartCount > 0 && (
                <span className="border-background absolute -top-1.5 -right-1.5 flex size-5 animate-bounce items-center justify-center rounded-full border-2 bg-rose-500 text-[10px] font-extrabold text-white shadow-md">
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
            className="text-muted-foreground/80 hover:text-foreground flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-bold transition-all duration-300 active:scale-95"
          >
            <Icon
              className={cn(
                'size-5.5 transition-all duration-300',
                isActive
                  ? 'text-primary scale-110 stroke-[2.5]'
                  : 'text-muted-foreground/60 stroke-[2]'
              )}
            />
            <span
              className={cn(
                'transition-colors duration-300',
                isActive ? 'text-primary font-extrabold' : 'font-semibold'
              )}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
