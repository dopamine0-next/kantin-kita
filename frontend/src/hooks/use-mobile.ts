import { useSyncExternalStore } from 'react'

const MOBILE_BREAKPOINT = 768

function getMobileSnapshot() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < MOBILE_BREAKPOINT
}

function subscribeToMobileChange(callback: () => void) {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

export function useIsMobile() {
  return useSyncExternalStore(subscribeToMobileChange, getMobileSnapshot, () => false)
}
