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
      <div className="group flex items-center gap-2.5">
        <Avatar className="bg-primary/10 flex size-9 items-center justify-center shadow-none">
          <AvatarFallback className="bg-transparent">
            <User className="text-primary size-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-muted-foreground text-[10px] font-medium leading-none">Hallo,</span>
          <span className="text-foreground text-sm font-bold tracking-tight">
            Pengguna <span className="animate-bounce">👋</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="size-9 shrink-0 rounded-full transition-all duration-300"
          aria-label="Toggle Night Mode"
        >
          {theme === 'dark' ? (
            <Sun className="size-4.5 text-amber-500" />
          ) : (
            <Moon className="size-4.5 text-indigo-600" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="size-9 cursor-pointer rounded-full transition-all duration-300"
              >
                <Bell className="size-4.5" />
              </Button>
              {activeNotifications.length > 0 && (
                <span className="absolute top-2 right-2 flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                  <span className="relative inline-flex size-1.5 rounded-full bg-destructive"></span>
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
                  <span className="text-muted-foreground text-xs">
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
