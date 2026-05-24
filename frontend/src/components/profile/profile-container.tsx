'use client'

import { ChevronRight, FileText, HelpCircle, Key, LogOut } from 'lucide-react'

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
      <div className="mb-6">
        <h1 className="text-xl font-extrabold tracking-tight">Profil Saya</h1>
      </div>

      {/* User Info Header */}
      <Card className="bg-primary/5 mb-6 rounded-2xl border-none shadow-sm">
        <CardContent className="flex items-center gap-4 p-5">
          <Avatar className="border-primary/20 size-16 border-2">
            <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
            <AvatarFallback className="text-lg font-bold">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-foreground text-lg font-bold tracking-tight">{user.name}</h2>
            <div className="text-muted-foreground mt-0.5 flex flex-col gap-0.5 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-16">NIM</span>: {user.nim}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-16">Semester</span>: {user.semester}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

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
