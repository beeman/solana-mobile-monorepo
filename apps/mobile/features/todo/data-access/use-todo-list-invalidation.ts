import { useQueryClient } from '@tanstack/react-query'

import { orpc } from '@/lib/orpc'

export function useTodoListInvalidation() {
  const queryClient = useQueryClient()

  return () => {
    return queryClient.invalidateQueries({
      queryKey: orpc.todo.getAll.queryOptions().queryKey,
    })
  }
}
