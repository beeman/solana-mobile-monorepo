import { useAuthSession } from '@/features/auth/data-access/use-auth-session'
import { TodoFeatureAuthenticated } from '@/features/todo/feature/todo-feature-authenticated'
import { TodoFeatureUnauthenticated } from '@/features/todo/feature/todo-feature-unauthenticated'
import { TodoUiLoading } from '@/features/todo/ui/todo-ui-loading'

export function TodoFeatureEntry() {
  const { data: session, isPending } = useAuthSession()

  if (isPending) {
    return <TodoUiLoading message="Checking session..." />
  }

  if (!session) {
    return <TodoFeatureUnauthenticated />
  }

  return <TodoFeatureAuthenticated />
}
