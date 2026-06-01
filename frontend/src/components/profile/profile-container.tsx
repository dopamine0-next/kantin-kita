'use client'

import {
  ChevronRight,
  FileText,
  HelpCircle,
  Key,
  LogOut,
  MapPin,
  ReceiptText,
  Sparkles,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/store/useAuthStore'

export function ProfileContainer() {
  const router = useRouter()
  const { user, logout } = useAuthStore()

  if (!user) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-muted-foreground text-sm font-medium">Anda belum login.</p>
      </div>
    )
  }

  const stats = [
    {
      label: 'Lokasi Aktif',
      value: user.location,
      icon: MapPin,
    },
    {
      label: 'Pesanan',
      value: '24x',
      icon: ReceiptText,
    },
    {
      label: 'Poin Kantin',
      value: '150',
      icon: Sparkles,
    },
  ]

  const menuItems = [
    {
      id: 'password',
      icon: Key,
      label: 'Ganti Password',
      onClick: () => {
        console.log('Ganti password clicked')
      },
    },
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
          <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="mt-3 flex flex-col items-center text-center">
          <h2 className="text-2xl font-extrabold tracking-tight">{user.name}</h2>
          <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm font-medium">
            <span>NIM: {user.nim}</span>
            <span className="bg-muted-foreground/50 size-1 rounded-full" />
            <span>Semester {user.semester}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-muted/40 mx-4 mt-6 flex items-stretch justify-between gap-0 rounded-2xl p-1">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1 rounded-xl py-3">
            <stat.icon className="text-primary size-5" />
            <span className="text-sm font-black">{stat.value}</span>
            <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="mt-8 px-4">
        <h3 className="text-foreground/60 mb-3 px-1 text-[11px] font-bold tracking-widest uppercase">
          Pengaturan
        </h3>

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
