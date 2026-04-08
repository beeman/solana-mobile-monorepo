import { QueryClientProvider } from '@tanstack/react-query'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import Loader from './components/loader'
import { SolanaProvider } from './features/solana/data-access/solana-provider'
import { orpc, queryClient } from './lib/orpc'
import { routeTree } from './routeTree.gen'

export const getRouter = () => {
  return createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: { orpc, queryClient },
    defaultPendingComponent: () => <Loader />,
    defaultNotFoundComponent: () => <div>Not Found</div>,
    Wrap: ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <SolanaProvider>{children}</SolanaProvider>
      </QueryClientProvider>
    ),
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
