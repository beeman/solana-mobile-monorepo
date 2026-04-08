import { useQuery } from '@tanstack/react-query'
import { AuthUiConnectionStatus } from '@/features/auth/ui/auth-ui-connection-status'
import { orpc } from '@/lib/orpc'

export function HomeFeatureIndex() {
  const healthCheck = useQuery(orpc.healthCheck.queryOptions())

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <pre className="overflow-x-auto font-mono text-sm">
            Solana Mobile Monorepo
          </pre>
        </section>
        <AuthUiConnectionStatus
          isConnected={healthCheck.data === 'OK'}
          isLoading={healthCheck.isLoading}
        />
      </div>
    </div>
  )
}
