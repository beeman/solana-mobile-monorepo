import { env } from '@solana-mobile-monorepo/env/web'
import { createAuthClient } from 'better-auth/react'
import { siwsClient } from 'better-auth-solana/client'

export const authClient = createAuthClient({
  baseURL: env.VITE_SERVER_URL,
  plugins: [siwsClient()],
})

export type MaybeAuthSession = ReturnType<typeof authClient.useSession>['data']
export type AuthSession = NonNullable<MaybeAuthSession>
