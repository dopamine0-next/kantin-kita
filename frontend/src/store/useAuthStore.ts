import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserProfile {
  id: string
  name: string
  avatar: string
  location: string
  locationId: string
  nim: string
  semester: number
  role: string
}

interface AuthStore {
  user: UserProfile | null
  token: string | null
  login: (user: UserProfile, token: string) => void
  logout: () => void
  updateLocation: (location: string, locationId: string) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user, token) => set({ user, token }),

      logout: () => set({ user: null, token: null }),

      updateLocation: (location, locationId) =>
        set((state) => ({
          user: state.user ? { ...state.user, location, locationId } : null,
        })),
    }),
    { name: 'kantin-kita-auth' }
  )
)
