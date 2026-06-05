'use client'

import { ChevronRight, FileText, HelpCircle, LogOut, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useUnreviewedOrders } from '@/hooks/use-unreviewed-orders'
import { formatRupiah } from '@/lib/utils'
import { useAuthStore } from '@/store/useAuthStore'

export function ProfileContainer() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const { orders: unratedOrders, isLoading } = useUnreviewedOrders()

  if (!user) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-muted-foreground text-sm font-medium">Anda belum login.</p>
      </div>
    )
  }

  const menuItems = [
    {
      id: 'faq',
      icon: HelpCircle,
      label: 'Bantuan (FAQ)',
      onClick: () => {
        router.push('/faq')
      },
    },
    {
      id: 'terms',
      icon: FileText,
      label: 'Ketentuan Layanan',
      onClick: () => {
        router.push('/terms')
      },
    },
    {
      id: 'logout',
      icon: LogOut,
      label: 'Keluar',
      isDestructive: true,
      onClick: () => {
        logout()
        toast.success('Berhasil keluar.')
      },
    },
  ]

  return (
    <div className="animate-fade-in flex min-h-full flex-col">
      {/* Cover */}
      <div className="from-primary/30 via-primary/10 relative h-36 rounded-b-3xl bg-linear-to-b to-transparent" />

      {/* Profile Header */}
      <div className="relative -mt-20 flex flex-col items-center px-4">
        <Avatar className="border-background size-24 border-4 shadow-md">
          <AvatarImage
            src={
              user.avatar ||
              `https://api.dicebear.com/10.x/adventurer/svg?seed=${encodeURIComponent(user.name)}`
            }
            alt={user.name}
            className="object-cover"
          />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="mt-3 flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm font-medium">
            <span>NIM: {user.nim}</span>
            <span className="bg-muted-foreground/50 size-1 rounded-full" />
            <span>Semester {user.semester}</span>
          </div>
        </div>
      </div>

      {/* Unreviewed Restaurants */}
      <div className="mx-4 mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-foreground text-sm font-semibold">Belum Direview</h3>
          {!isLoading && unratedOrders.length > 0 && (
            <span className="text-muted-foreground text-xs font-medium">
              {unratedOrders.length} restoran
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="no-scrollbar flex gap-3 overflow-x-auto">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-40 shrink-0 rounded-2xl" />
            ))}
          </div>
        ) : unratedOrders.length > 0 ? (
          <div className="no-scrollbar flex gap-3 overflow-x-auto">
            {unratedOrders.map((order) => (
              <Link
                key={order.id}
                href={`/rate/${order.id}`}
                className="border-muted/30 bg-card/50 hover:border-primary/20 group flex w-40 shrink-0 flex-col overflow-hidden rounded-2xl border shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="relative h-24 w-full overflow-hidden">
                  <Image
                    src={order.restaurant_image || '/placeholder.svg'}
                    alt={order.restaurant_name}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-0.5 p-2.5">
                  <span className="line-clamp-1 text-xs font-semibold">
                    {order.restaurant_name}
                  </span>
                  <span className="text-muted-foreground text-[10px] font-medium">
                    {order.items.length} item &middot; {formatRupiah(order.total_amount)}
                  </span>
                  <div className="text-muted-foreground/60 mt-0.5 flex items-center gap-1 text-[10px]">
                    <Star className="size-3 text-amber-500" />
                    <span>Beri rating</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-muted/20 flex items-center gap-2 rounded-2xl px-4 py-3">
            <Star className="text-muted-foreground/40 size-4" />
            <span className="text-muted-foreground/60 text-xs font-medium">
              Semua pesanan sudah direview!
            </span>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="mt-8 px-4">
        <h3 className="text-foreground/60 mb-3 px-1 text-[11px] font-semibold">Pengaturan</h3>

        <div className="bg-muted/40 overflow-hidden rounded-2xl">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isLast = index === menuItems.length - 1

            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 ${
                  isLast ? '' : 'border-muted/50 border-b'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`size-5 ${item.isDestructive ? 'text-destructive' : 'text-primary'}`}
                  />
                  <span
                    className={`text-sm font-semibold ${
                      item.isDestructive ? 'text-destructive' : 'text-foreground'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {!item.isDestructive && (
                  <ChevronRight className="text-muted-foreground/30 size-4" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* App version */}
      <p className="text-muted-foreground/40 mx-auto mt-8 text-[11px] font-medium">
        Kantin Kita v1.0.0
      </p>
    </div>
  )
}
