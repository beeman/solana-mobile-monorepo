import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useTodoCreate } from '../data-access/use-todo-create'
import { useTodoDelete } from '../data-access/use-todo-delete'
import { useTodoListQuery } from '../data-access/use-todo-list-query'
import { useTodoToggle } from '../data-access/use-todo-toggle'
import { TodoUiCreateForm } from '../ui/todo-ui-create-form'
import { TodoUiList } from '../ui/todo-ui-list'

export function TodoFeatureAuthenticated() {
  const createTodo = useTodoCreate()
  const deleteTodo = useTodoDelete()
  const toggleTodo = useTodoToggle()
  const listQuery = useTodoListQuery({ enabled: true })

  const completedCount =
    listQuery.data?.filter((todo) => todo.completed).length || 0
  const totalCount = listQuery.data?.length || 0

  async function handleCreateTodo(text: string) {
    await createTodo.mutateAsync({ text })
  }

  function handleDeleteTodo(id: number) {
    deleteTodo.mutate({ id })
  }

  function handleToggleTodo(id: number, completed: boolean) {
    toggleTodo.mutate({ completed: !completed, id })
  }

  return (
    <div className="mx-auto w-full max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription>
            Manage your tasks efficiently. Completed {completedCount}/
            {totalCount}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TodoUiCreateForm
            isPending={createTodo.isPending}
            onCreate={handleCreateTodo}
          />
          <TodoUiList
            isLoading={listQuery.isLoading}
            onDeleteTodo={handleDeleteTodo}
            onToggleTodo={handleToggleTodo}
            todos={listQuery.data}
          />
        </CardContent>
      </Card>
    </div>
  )
}
