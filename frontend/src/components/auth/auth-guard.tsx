'use client'

import { useEffect, useSyncExternalStore } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { useAuthStore } from '@/store/useAuthStore'

const subscribeHydration = (onStoreChange: () => void) => {
  const unsub = useAuthStore.persist?.onFinishHydration?.(onStoreChange)
  return () => {
    if (typeof unsub === 'function') unsub()
  }
}

const getHydrated = () => useAuthStore.persist?.hasHydrated?.() ?? false

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token)
  const pathname = usePathname()
  const router = useRouter()
  const hydrated = useSyncExternalStore(subscribeHydration, getHydrated, getHydrated)

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
