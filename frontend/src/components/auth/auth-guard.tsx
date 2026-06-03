'use client'

import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { useAuthStore } from '@/store/useAuthStore'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token)
  const pathname = usePathname()
  const router = useRouter()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (useAuthStore.persist?.hasHydrated?.()) {
      setHydrated(true)
      return
    }
    const unsub = useAuthStore.persist?.onFinishHydration?.(() => setHydrated(true))
    if (!useAuthStore.persist) setHydrated(true)
    return () => unsub?.()
  }, [])

  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/register')

  useEffect(() => {
    if (hydrated && !token && !isAuthPage) {
      router.replace('/login')
    }
  }, [hydrated, token, isAuthPage, router])

  if (!hydrated) return null
  if (!token && !isAuthPage) return null

  return <>{children}</>
}
