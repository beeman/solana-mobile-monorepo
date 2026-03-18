import { expoClient } from '@better-auth/expo/client'
import { solanaAuthClient } from '@solana-mobile-monorepo/better-auth-solana/client'
import { createAuthClient } from 'better-auth/react'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'

import { serverUrl } from '@/lib/server-url'

export const authClient = createAuthClient({
  baseURL: serverUrl,
  plugins: [
    expoClient({
      scheme: Constants.expoConfig?.scheme as string,
      storagePrefix: Constants.expoConfig?.scheme as string,
      storage: SecureStore,
    }),
    solanaAuthClient(),
  ],
})
