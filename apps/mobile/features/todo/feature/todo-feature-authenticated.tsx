import { Chip } from 'heroui-native'
import { ShellUiPageHeader } from '@/features/shell/ui/shell-ui-page-header'
import { ShellUiScrollView } from '@/features/shell/ui/shell-ui-scroll-view'
import { useTodoCreate } from '@/features/todo/data-access/use-todo-create'
import { useTodoDelete } from '@/features/todo/data-access/use-todo-delete'
import { useTodoListQuery } from '@/features/todo/data-access/use-todo-list-query'
import { useTodoToggle } from '@/features/todo/data-access/use-todo-toggle'
import { TodoUiCreateForm } from '@/features/todo/ui/todo-ui-create-form'
import { TodoUiList } from '@/features/todo/ui/todo-ui-list'

export function TodoFeatureAuthenticated() {
  const createTodoMutation = useTodoCreate()
  const deleteTodoMutation = useTodoDelete()
  const toggleTodoMutation = useTodoToggle()
  const listQuery = useTodoListQuery({ enabled: true })

  const completedCount =
    listQuery.data?.filter((todo) => todo.completed).length || 0
  const totalCount = listQuery.data?.length || 0

  function handleCreateTodo(text: string, onSuccess: () => void): void {
    createTodoMutation.mutate({ text }, { onSuccess })
  }

  function handleDeleteTodo(id: number) {
    deleteTodoMutation.mutate({ id })
  }

  function handleToggleTodo(id: number, completed: boolean) {
    toggleTodoMutation.mutate({ id, completed: !completed })
  }

  return (
    <ShellUiScrollView className="p-4">
      <ShellUiPageHeader
        description={
          <Chip variant="secondary" color="accent" size="sm">
            <Chip.Label>
              Todos{' '}
              {totalCount > 0 ? `${completedCount}/${totalCount}` : 'none'}
            </Chip.Label>
          </Chip>
        }
        icon="checkbox-outline"
        title="Todos"
      />

      <TodoUiCreateForm
        isPending={createTodoMutation.isPending}
        onCreate={handleCreateTodo}
      />

      <TodoUiList
        isLoading={listQuery.isLoading}
        onDeleteTodo={handleDeleteTodo}
        onToggleTodo={handleToggleTodo}
        todos={listQuery.data}
      />
    </ShellUiScrollView>
  )
}
