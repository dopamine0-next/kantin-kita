import type { UserProfile } from '@/store/useAuthStore'

import type { UserBackend } from './auth.types'

export function mapUserBackendToProfile(user: UserBackend): UserProfile {
  return {
    id: user.id,
    name: user.name,
    nim: user.nim,
    avatar: user.avatarUrl ?? '',
    location: user.locationName ?? '',
    locationId: user.locationId?.toString() ?? '',
    semester: user.semester ?? 0,
    role: user.role,
  }
}
