'use client'

import {
  Award,
  ChevronRight,
  Crown,
  FileText,
  HelpCircle,
  Key,
  LogOut,
  ReceiptText,
  Wallet,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { useAuthStore } from '@/store/useAuthStore'

export function ProfileContainer() {
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
      label: 'Pengeluaran',
      value: '350k',
      icon: Wallet,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'Pesanan',
      value: '24x',
      icon: ReceiptText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Poin Kantin',
      value: '150',
      icon: Award,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
  ]

  const menuItems = [
    {
      id: 'password',
      icon: Key,
      label: 'Ganti Password',
      onClick: () => {
        // Handle password change action
        console.log('Ganti password clicked')
      },
    },
    {
      id: 'faq',
      icon: HelpCircle,
      label: 'Bantuan (FAQ)',
      onClick: () => {
        // Handle faq action
        console.log('FAQ clicked')
      },
    },
    {
      id: 'terms',
      icon: FileText,
      label: 'Ketentuan Layanan',
      onClick: () => {
        // Handle terms action
        console.log('Terms clicked')
      },
    },
    {
      id: 'logout',
      icon: LogOut,
      label: 'Keluar',
      isDestructive: true,
      onClick: () => {
        logout()
      },
    },
  ]

  return (
    <div className="animate-fade-in flex min-h-full flex-col px-4 pt-4 pb-24">
      <div className="mb-2">
        <h1 className="text-xl font-extrabold tracking-tight">Profil Saya</h1>
      </div>

      {/* User Info Header (Redesigned) */}
      <div className="relative mb-6 flex flex-col items-center">
        {/* Background Decorative */}
        <div className="from-primary/20 via-primary/5 absolute top-4 right-0 left-0 h-24 rounded-3xl bg-gradient-to-tr to-transparent" />

        <div className="relative z-10 flex w-full flex-col items-center gap-3 pt-8">
          <Avatar className="border-background size-24 border-4 shadow-sm">
            <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-extrabold tracking-tight">{user.name}</h2>
            <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm font-medium">
              <span>NIM: {user.nim}</span>
              <span className="bg-muted-foreground/50 size-1 rounded-full" />
              <span>Semester {user.semester}</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-500">
              <Crown className="size-3.5" />
              Member Kantin Premium
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mb-8 grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-card border-muted/50 hover:bg-muted/50 flex flex-col items-center gap-2 rounded-2xl border p-3 shadow-sm transition-all"
          >
            <div
              className={`flex size-10 items-center justify-center rounded-full ${stat.bgColor} ${stat.color}`}
            >
              <stat.icon className="size-5" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-black">{stat.value}</span>
              <span className="text-muted-foreground text-[9px] font-bold tracking-wider uppercase">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Menu List */}
      <div className="mb-4">
        <h3 className="text-foreground mb-3 px-1 text-sm font-bold tracking-tight">Pengaturan</h3>
        <Card className="border-muted/50 overflow-hidden rounded-2xl shadow-sm">
          <div className="flex flex-col">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isLast = index === menuItems.length - 1

              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={`bg-card hover:bg-muted/50 active:bg-muted flex items-center justify-between p-4 transition-colors ${
                    isLast ? '' : 'border-muted/50 border-b'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-9 items-center justify-center rounded-full ${
                        item.isDestructive
                          ? 'bg-destructive/10 text-destructive'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <Icon className="size-4.5" />
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        item.isDestructive ? 'text-destructive' : 'text-foreground'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {!item.isDestructive && (
                    <ChevronRight className="text-muted-foreground/50 size-4" />
                  )}
                </button>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
