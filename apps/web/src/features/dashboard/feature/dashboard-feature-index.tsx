import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { AuthFeatureAuthenticated } from '@/features/auth/feature/auth-feature-authenticated'
import { orpc } from '@/lib/orpc'

const dashboardRoute = getRouteApi('/dashboard')

export function DashboardFeatureIndex() {
  const { session } = dashboardRoute.useRouteContext()
  const meQuery = useQuery(orpc.me.queryOptions())

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto max-w-3xl space-y-6 px-4 py-8">
      <AuthFeatureAuthenticated session={session} />
      <section className="rounded-lg border p-4">
        <h1 className="mb-2 font-semibold text-2xl">Dashboard</h1>
        <p className="mb-4 text-muted-foreground">
          Welcome {session.user.name}
        </p>
        <pre className="overflow-x-auto text-sm">
          {JSON.stringify(meQuery.data, null, 2)}
        </pre>
      </section>
    </div>
  )
}
