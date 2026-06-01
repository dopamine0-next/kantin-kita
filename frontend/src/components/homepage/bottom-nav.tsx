'use client'

import { ClipboardList, Home, User } from 'lucide-react'
import { LayoutGroup, motion } from 'motion/react'
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
    <nav className="bg-background border-muted/30 fixed right-0 bottom-0 left-0 z-40 mx-auto flex h-20 w-full max-w-md items-center justify-around border-t px-4">
      <LayoutGroup id="bottom-nav">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.href === '/' ? pathname === '/' : pathname?.startsWith(tab.href)

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-bold transition-all active:scale-95',
                isActive ? 'text-primary' : 'text-muted-foreground/80 hover:text-foreground'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="bg-primary absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full"
                />
              )}
              <Icon
                className={cn(
                  'size-5.5 transition-all',
                  isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[2]'
                )}
              />
              <span className={cn(isActive ? 'font-extrabold' : 'font-semibold')}>{tab.label}</span>
            </Link>
          )
        })}
      </LayoutGroup>
    </nav>
  )
}
