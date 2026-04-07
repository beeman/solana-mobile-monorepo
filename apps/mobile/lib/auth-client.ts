import { expoClient } from '@better-auth/expo/client'
import { createAuthClient } from 'better-auth/react'
import { siwsClient } from 'better-auth-solana/client'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'

import { apiUrl } from '@/lib/api-url'

export const authClient = createAuthClient({
  baseURL: apiUrl,
  plugins: [
    expoClient({
      scheme: Constants.expoConfig?.scheme as string,
      storagePrefix: Constants.expoConfig?.scheme as string,
      storage: SecureStore,
    }),
    siwsClient(),
  ],
})

export type MaybeAuthSession = ReturnType<typeof authClient.useSession>['data']
export type AuthSession = NonNullable<MaybeAuthSession>
