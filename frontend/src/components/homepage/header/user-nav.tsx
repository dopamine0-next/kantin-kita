'use client'

import { useEffect, useState } from 'react'

import { Bell, Moon, Sun, User } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useOrders } from '@/hooks/use-orders'

export function UserNav() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { orders } = useOrders()

  // Filter for active notifications (e.g. not completed/cancelled yet)
  const activeNotifications = orders.filter(
    (o) => o.status === 'processing' || o.status === 'ready'
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center justify-between">
      <div className="group flex items-center gap-3">
        <Avatar className="border-primary/25 bg-primary/10 flex size-11 items-center justify-center border-2 shadow-sm">
          <AvatarFallback className="bg-transparent">
            <User className="text-primary size-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-muted-foreground/80 text-[10px] font-medium">Hallo,</span>
          <span className="text-foreground flex items-center gap-1 text-sm font-black tracking-tight">
            Pengguna <span className="animate-bounce">👋</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="border-muted/80 bg-background/50 hover:bg-muted size-10 shrink-0 rounded-full shadow-sm backdrop-blur-sm transition-all duration-300"
          aria-label="Toggle Night Mode"
        >
          {theme === 'dark' ? (
            <Sun className="size-5 fill-amber-400/20 text-amber-500" />
          ) : (
            <Moon className="size-5 fill-indigo-50/20 text-indigo-600" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="border-muted/80 bg-background/50 hover:bg-muted size-10 cursor-pointer rounded-full shadow-sm backdrop-blur-sm transition-all duration-300"
              >
                <Bell className="size-5" />
              </Button>
              {activeNotifications.length > 0 && (
                <span className="absolute top-1 right-1 flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-75"></span>
                  <span className="relative inline-flex size-2.5 rounded-full bg-rose-500"></span>
                </span>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Notifikasi Pesanan</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {activeNotifications.length === 0 ? (
              <div className="text-muted-foreground px-2 py-4 text-center text-xs">
                Tidak ada notifikasi pesanan baru.
              </div>
            ) : (
              activeNotifications.map((order) => (
                <DropdownMenuItem key={order.id} className="flex flex-col items-start gap-1 p-3">
                  <span className="text-xs font-semibold">{order.restaurant_name}</span>
                  <span className="text-muted-foreground text-[10px]">
                    {order.status === 'processing'
                      ? 'Pesanan Anda sedang diproses oleh restoran.'
                      : 'Pesanan telah selesai dan siap diambil!'}
                  </span>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
