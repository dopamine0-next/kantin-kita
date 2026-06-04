'use client'

import { useEffect, useState } from 'react'

import { Bell, LogOut, Moon, Settings, Sun, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { useAuthStore } from '@/store/useAuthStore'

export function UserNav() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { orders } = useOrders()
  const { user, logout } = useAuthStore()

  // Filter for active notifications (e.g. not completed/cancelled yet)
  const activeNotifications = orders.filter(
    (o) => o.status === 'processing' || o.status === 'ready'
  )

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center justify-between">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="group flex items-center gap-2.5 text-left outline-none">
              <Avatar className="border-primary/20 size-9 border shadow-none transition-transform active:scale-95">
                <AvatarImage
                  src={
                    user.avatar ||
                    `https://api.dicebear.com/10.x/adventurer/svg?seed=${encodeURIComponent(user.name)}`
                  }
                  alt={user.name}
                />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-[10px] leading-none font-semibold">
                  Semester {user.semester}
                </span>
                <span className="text-foreground line-clamp-1 text-sm font-semibold">
                  {user.name.split(' ')[0]} <span className="animate-bounce">👋</span>
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 rounded-2xl p-2 shadow-xl">
            <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold">
              Akun Saya
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 rounded-xl px-2 py-2 text-xs font-semibold">
              <User className="size-4" />
              Lihat Profil
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 rounded-xl px-2 py-2 text-xs font-semibold">
              <Settings className="size-4" />
              Pengaturan
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout()
                toast.success('Berhasil keluar.')
              }}
              className="text-destructive focus:text-destructive gap-2 rounded-xl px-2 py-2 text-xs font-semibold"
            >
              <LogOut className="size-4" />
              Keluar Akun
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/login"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <Avatar className="bg-muted flex size-9 items-center justify-center shadow-none">
            <AvatarFallback className="bg-transparent">
              <User className="text-muted-foreground size-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs leading-none font-medium">
              Belum Masuk,
            </span>
            <span className="text-primary text-sm font-semibold">Masuk Sekarang</span>
          </div>
        </Link>
      )}

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
            <Moon className="text-primary size-4.5" />
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
                  <span className="bg-destructive absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                  <span className="bg-destructive relative inline-flex size-1.5 rounded-full"></span>
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
