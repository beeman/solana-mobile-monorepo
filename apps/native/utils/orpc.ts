import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import type { AppRouterClient } from '@solana-mobile-monorepo/api/routers/index'
import { QueryCache, QueryClient } from '@tanstack/react-query'
import { Platform } from 'react-native'

import { authClient } from '@/lib/auth-client'
import { serverUrl } from '@/lib/server-url'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(error)
    },
  }),
})

export const link = new RPCLink({
  url: `${serverUrl}/rpc`,
  fetch:
    Platform.OS !== 'web'
      ? undefined
      : (url, options) =>
          fetch(url, {
            ...options,
            credentials: 'include',
          }),
  headers() {
    if (Platform.OS === 'web') {
      return {}
    }
    const headers = new Map<string, string>()
    const cookies = authClient.getCookie()
    if (cookies) {
      headers.set('Cookie', cookies)
    }
    return Object.fromEntries(headers)
  },
})

export const client: AppRouterClient = createORPCClient(link)

export const orpc = createTanstackQueryUtils(client)
