import { useQuery } from '@tanstack/react-query'

import { orpc } from '@/lib/orpc'

export function useTodoListQuery({ enabled = true }: { enabled?: boolean }) {
  return useQuery({
    ...orpc.todo.getAll.queryOptions(),
    enabled,
  })
}
