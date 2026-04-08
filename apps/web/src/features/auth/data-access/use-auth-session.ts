import { authClient } from '@/lib/auth-client'

export function useAuthSession() {
  return authClient.useSession()
}
