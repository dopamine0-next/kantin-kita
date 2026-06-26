'use client'

import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { useAuthStore } from '@/store/useAuthStore'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token)
  const pathname = usePathname()
  const router = useRouter()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const hasHydrated = useAuthStore.persist?.hasHydrated()

    if (hasHydrated) {
      setIsHydrated(true)
    } else {
      const unsub = useAuthStore.persist?.onFinishHydration(() => {
        setIsHydrated(true)
      })
      return () => unsub?.()
    }
  }, [])

  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register')

  useEffect(() => {
    if (!isHydrated) return

    if (!token && !isAuthPage) {
      router.replace('/login')
    }
  }, [isHydrated, token, isAuthPage, router])

  if (!isHydrated) {
    return null
  }

  if (!token && !isAuthPage) {
    return null
  }

  return <>{children}</>
}
