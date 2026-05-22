import { create } from "zustand"

export interface UserProfile {
  name: string
  avatar: string
  saldo: number
  location: "Blok A" | "Blok B"
}

export const MOCK_USERS: UserProfile[] = [
  {
    name: "Marwah Hamzah",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    saldo: 150000,
    location: "Blok A",
  },
  {
    name: "Budi Santoso",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    saldo: 75000,
    location: "Blok B",
  },
  {
    name: "Siti Rahma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    saldo: 320000,
    location: "Blok A",
  },
]

interface AuthStore {
  user: UserProfile | null
  login: (profile: UserProfile) => void
  logout: () => void
  updateLocation: (location: "Blok A" | "Blok B") => void
  deductSaldo: (amount: number) => boolean
}

export const useAuthStore = create<AuthStore>((set) => ({
  // Default to first mock user for a premium out-of-the-box experience
  user: MOCK_USERS[0],

  login: (profile) => set({ user: profile }),

  logout: () => set({ user: null }),

  updateLocation: (location) =>
    set((state) => ({
      user: state.user ? { ...state.user, location } : null,
    })),

  deductSaldo: (amount) => {
    let success = false
    set((state) => {
      if (state.user && state.user.saldo >= amount) {
        success = true
        return {
          user: {
            ...state.user,
            saldo: state.user.saldo - amount,
          },
        }
      }
      return {}
    })
    return success
  },
}))
