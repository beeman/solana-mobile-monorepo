import { createFileRoute, ErrorComponent } from '@tanstack/react-router'
import {
  type RequireAuthContext,
  requireAuthBeforeLoad,
  requireAuthLoader,
} from '@/features/auth/data-access/require-auth'
import { TodoFeatureEntry } from '@/features/todo/feature/todo-feature-entry'

export const Route = createFileRoute('/todos')({
  beforeLoad: requireAuthBeforeLoad,
  component: TodoFeatureEntry,
  errorComponent: ({ error }) => {
    console.error('[todos] Route error:', error)
    return <ErrorComponent error={error} />
  },
  loader: async ({ context }: { context: RequireAuthContext }) => {
    requireAuthLoader({ context })
  },
})
