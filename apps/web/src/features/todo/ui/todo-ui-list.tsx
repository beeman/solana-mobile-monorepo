import { TodoUiListItem } from './todo-ui-list-item'
import { TodoUiLoading } from './todo-ui-loading'

export function TodoUiList({
  isLoading,
  onDeleteTodo,
  onToggleTodo,
  todos,
}: {
  isLoading: boolean
  onDeleteTodo: (id: number) => void
  onToggleTodo: (id: number, completed: boolean) => void
  todos:
    | Array<{
        completed: boolean
        id: number
        text: string
      }>
    | undefined
}) {
  if (isLoading) {
    return <TodoUiLoading message="Loading todos..." />
  }

  if (!todos?.length) {
    return <p className="py-4 text-center">No todos yet. Add one above!</p>
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoUiListItem
          key={todo.id}
          onDeleteTodo={onDeleteTodo}
          onToggleTodo={onToggleTodo}
          todo={todo}
        />
      ))}
    </ul>
  )
}
