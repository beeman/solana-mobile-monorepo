import { useMutation } from '@tanstack/react-query'

import { orpc } from '@/lib/orpc'

import { useTodoListInvalidation } from './use-todo-list-invalidation'

export function useTodoToggle() {
  const invalidateTodoList = useTodoListInvalidation()

  return useMutation(
    orpc.todo.toggle.mutationOptions({
      onSuccess: () => {
        void invalidateTodoList()
      },
    }),
  )
}
