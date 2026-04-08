import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export function TodoUiListItem({
  onDeleteTodo,
  onToggleTodo,
  todo,
}: {
  onDeleteTodo: (id: number) => void
  onToggleTodo: (id: number, completed: boolean) => void
  todo: {
    completed: boolean
    id: number
    text: string
  }
}) {
  return (
    <li className="flex items-center justify-between rounded-md border p-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={todo.completed}
          id={`todo-${todo.id}`}
          onCheckedChange={() => onToggleTodo(todo.id, todo.completed)}
        />
        <label
          className={todo.completed ? 'line-through' : undefined}
          htmlFor={`todo-${todo.id}`}
        >
          {todo.text}
        </label>
      </div>
      <Button
        aria-label="Delete todo"
        onClick={() => onDeleteTodo(todo.id)}
        size="icon"
        variant="ghost"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  )
}
