import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import type { AuthSession } from '@/lib/auth-client'

import { useAuthSignOut } from '../data-access/use-auth-sign-out'
import { AuthUiSession } from '../ui/auth-ui-session'

export function AuthFeatureAuthenticated({
  session,
}: {
  session: AuthSession
}) {
  const navigate = useNavigate()
  const { isPending, signOut } = useAuthSignOut()

  async function handleSignOut() {
    try {
      await signOut()
      toast.success('Signed out successfully')
      await navigate({
        to: '/',
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Sign out failed')
    }
  }

  return (
    <AuthUiSession
      isPending={isPending}
      onSignOut={handleSignOut}
      session={session}
    />
  )
}
