import { UserProfile, MOCK_USERS } from '@/store/useAuthStore'

export interface LoginResponse {
  user: UserProfile
  token: string
}

export const AuthService = {
  login: async (identifier: string, password: string): Promise<LoginResponse> => {
    // Simulate network delay "tebak api"
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = MOCK_USERS.find(
      (u) => u.nim === identifier || u.name.toLowerCase().includes(identifier.toLowerCase())
    )

    if (foundUser && password === 'password123') {
      return {
        user: foundUser,
        token: 'mock-jwt-token-' + Math.random().toString(36).substring(7),
      }
    }

    throw new Error('Akses ditolak. NIM atau Password salah.')
  },

  register: async (data: any): Promise<LoginResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Mock register logic
    const newUser: UserProfile = {
      name: data.name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        data.name
      )}&background=random&color=fff`,
      location: 'Kantin Pusat',
      locationId: 'l1',
      nim: data.nim,
      semester: parseInt(data.semester) || 1,
    }

    return {
      user: newUser,
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(7),
    }
  },

  getMe: async (token: string): Promise<UserProfile> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return MOCK_USERS[0]
  },
}
