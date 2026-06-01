'use client'

import { ClipboardList, Home, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export function BottomNav() {
  const pathname = usePathname()

  const tabs = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/orders', label: 'Pesanan', icon: ClipboardList },
    { href: '/profile', label: 'Saya', icon: User },
  ]

  return (
    <div className="bg-background/80 border-muted/30 fixed right-0 bottom-0 left-0 z-40 mx-auto flex h-20 w-full max-w-md items-center justify-around border-t px-4 shadow-sm backdrop-blur-xl">
      {tabs.map((tab) => {
        const Icon = tab.icon
        // Simple pathname matching
        const isActive = tab.href === '/' ? pathname === '/' : pathname?.startsWith(tab.href)

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="text-muted-foreground/80 hover:text-foreground flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-bold transition-all duration-300 active:scale-95"
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
          </Link>
        )
      })}
    </div>
  )
}
