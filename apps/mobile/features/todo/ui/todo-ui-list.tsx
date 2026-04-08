import { Ionicons } from '@expo/vector-icons'
import { Spinner, Surface, useThemeColor } from 'heroui-native'
import { Text, View } from 'react-native'

import { TodoUiListItem } from '@/features/todo/ui/todo-ui-list-item'

type Todo = {
  completed: boolean
  id: number
  text: string
}

type TodoUiListProps = {
  isLoading: boolean
  onDeleteTodo: (id: number) => void
  onToggleTodo: (id: number, completed: boolean) => void
  todos?: Todo[]
}

export function TodoUiList({
  isLoading,
  onDeleteTodo,
  onToggleTodo,
  todos = [],
}: TodoUiListProps) {
  const mutedColor = useThemeColor('muted')

  if (isLoading) {
    return (
      <View className="items-center justify-center py-12">
        <Spinner size="lg" />
        <Text className="mt-3 text-muted text-sm">Loading tasks...</Text>
      </View>
    )
  }

  if (todos.length === 0) {
    return (
      <Surface
        variant="default"
        className="items-center justify-center rounded-lg py-10"
      >
        <Ionicons name="checkbox-outline" size={40} color={mutedColor} />
        <Text className="mt-3 font-medium text-foreground">No tasks yet</Text>
        <Text className="mt-1 text-muted text-xs">
          Add your first task to get started
        </Text>
      </Surface>
    )
  }

  return (
    <View className="gap-2">
      {todos.map((todo) => (
        <TodoUiListItem
          key={todo.id}
          onDeleteTodo={onDeleteTodo}
          onToggleTodo={onToggleTodo}
          todo={todo}
        />
      ))}
    </View>
  )
}
