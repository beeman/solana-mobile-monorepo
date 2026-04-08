import { useMutation } from '@tanstack/react-query'

import { orpc } from '@/lib/orpc'

import { useTodoListInvalidation } from './use-todo-list-invalidation'

export function useTodoCreate() {
  const invalidateTodoList = useTodoListInvalidation()

  return useMutation(
    orpc.todo.create.mutationOptions({
      onSuccess: () => {
        void invalidateTodoList()
      },
    }),
  )
}
