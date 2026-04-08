import { createFileRoute, ErrorComponent } from '@tanstack/react-router'

import {
  type RequireAuthContext,
  requireAuthBeforeLoad,
  requireAuthLoader,
} from '@/features/auth/data-access/require-auth'
import { DashboardFeatureIndex } from '@/features/dashboard/feature/dashboard-feature-index'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: requireAuthBeforeLoad,
  component: DashboardFeatureIndex,
  errorComponent: ({ error }) => {
    console.error('[dashboard] Route error:', error)
    return <ErrorComponent error={error} />
  },
  loader: async ({ context }: { context: RequireAuthContext }) => {
    requireAuthLoader({ context })
  },
})
