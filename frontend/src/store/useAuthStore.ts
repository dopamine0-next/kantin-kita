import { create } from 'zustand'

export interface UserProfile {
  name: string
  avatar: string
  location: string
  locationId: string
  nim: string
  semester: number
}

export const MOCK_USERS: UserProfile[] = [
  {
    name: 'Marwah Hamzah',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    location: 'Kantin Pusat',
    locationId: 'l1',
    nim: '1234567890',
    semester: 5,
  },
  {
    name: 'Budi Santoso',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    location: 'Kantin Teknik',
    locationId: 'l2',
    nim: '1234567891',
    semester: 3,
  },
  {
    name: 'Siti Rahma',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    location: 'Kantin Pusat',
    locationId: 'l1',
    nim: '1234567892',
    semester: 7,
  },
]

interface AuthStore {
  user: UserProfile | null
  login: (profile: UserProfile) => void
  logout: () => void
  updateLocation: (location: string, locationId: string) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  // Default to first mock user for a premium out-of-the-box experience
  user: MOCK_USERS[0],

  login: (profile) => set({ user: profile }),

  logout: () => set({ user: null }),

  updateLocation: (location, locationId) =>
    set((state) => ({
      user: state.user ? { ...state.user, location, locationId } : null,
    })),
}))
