import { useMutation } from '@tanstack/react-query'

import { orpc } from '@/lib/orpc'
import { useTodoListInvalidation } from './use-todo-list-invalidation'

export function useTodoDelete() {
  const invalidateTodoList = useTodoListInvalidation()

  return useMutation(
    orpc.todo.delete.mutationOptions({
      onSuccess: invalidateTodoList,
    }),
  )
}
