import { BottomNav } from '@/components/homepage/bottom-nav'
import { ProfileContainer } from '@/components/profile/profile-container'

export default function ProfilePage() {
  return (
    <div className="bg-background border-muted/50 relative mx-auto flex min-h-screen w-full max-w-md flex-col border-x">
      <div className="no-scrollbar flex-1 overflow-y-auto pb-24">
        <ProfileContainer />
      </div>
      <BottomNav />
    </div>
  )
}
