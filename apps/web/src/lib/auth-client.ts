import { solanaAuthClient } from '@solana-mobile-monorepo/better-auth-solana/client'
import { env } from '@solana-mobile-monorepo/env/web'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: env.VITE_SERVER_URL,
  plugins: [solanaAuthClient()],
})

export type MaybeAuthSession = ReturnType<typeof authClient.useSession>['data']
export type AuthSession = NonNullable<MaybeAuthSession>
