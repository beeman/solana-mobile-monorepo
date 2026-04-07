import { useQuery } from '@tanstack/react-query'

import { orpc } from '@/lib/orpc'

type Options = {
  enabled: boolean
}

export function useTodoListQuery({ enabled }: Options) {
  return useQuery({
    ...orpc.todo.getAll.queryOptions(),
    enabled,
  })
}
